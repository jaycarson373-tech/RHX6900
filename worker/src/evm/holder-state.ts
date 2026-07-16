import { config } from "./config.js";
import { supabase } from "./db.js";
import type { Holder } from "./holders.js";

type HolderState = {
  wallet: string;
  source_balance_raw: string | null;
  highest_source_balance_raw: string | null;
  eligible_since: string | null;
  current_streak_epochs: number | null;
  permanently_ineligible: boolean | null;
};

const DAY_MS = 86_400_000;
const LADDER = [
  { days: 180, bps: 100_000 },
  { days: 90, bps: 50_000 },
  { days: 30, bps: 30_000 },
  { days: 7, bps: 20_000 },
  { days: 1, bps: 15_000 }
];

function raw(value: unknown) {
  try { return BigInt(String(value ?? "0")); } catch { return 0n; }
}

export function holdMultiplierBps(eligibleSince: string | null | undefined, nowMs: number) {
  if (!config.holderStreakBonusEnabled) return 10_000;
  const started = eligibleSince ? Date.parse(eligibleSince) : nowMs;
  const days = Number.isFinite(started) ? Math.max(0, Math.floor((nowMs - started) / DAY_MS)) : 0;
  return LADDER.find((item) => days >= item.days)?.bps ?? 10_000;
}

export async function applyHolderState(epochId: string, eligibleHolders: Holder[], currentHolders: Holder[]) {
  const { data, error } = await supabase
    .from("holder_states")
    .select("wallet,source_balance_raw,highest_source_balance_raw,eligible_since,current_streak_epochs,permanently_ineligible")
    .limit(10_000);
  if (error) throw new Error(`holder states: ${JSON.stringify(error)}`);

  const now = new Date().toISOString();
  const nowMs = Date.parse(now);
  const states = (data ?? []) as HolderState[];
  const stateByWallet = new Map(states.map((state) => [state.wallet.toLowerCase(), state]));
  const currentByWallet = new Map(currentHolders.map((holder) => [holder.wallet.toLowerCase(), holder]));
  const updates: Record<string, unknown>[] = [];
  const output: Holder[] = [];

  for (const state of states) {
    const current = currentByWallet.get(state.wallet.toLowerCase());
    if (current) continue;
    updates.push({
      wallet: state.wallet,
      source_balance: "0",
      source_balance_raw: "0",
      highest_source_balance_raw: state.highest_source_balance_raw ?? "0",
      eligible_since: null,
      last_seen_at: now,
      last_epoch_id: epochId,
      current_streak_epochs: 0,
      current_multiplier_bps: 10_000,
      updated_at: now
    });
  }

  for (const holder of currentHolders.filter((item) => item.holderPct >= config.maxHolderPct)) {
    updates.push({
      wallet: holder.wallet,
      source_balance: holder.uiBalance.toString(),
      source_balance_raw: holder.rawBalance.toString(),
      highest_source_balance_raw: holder.rawBalance.toString(),
      eligible_since: null,
      last_seen_at: now,
      last_epoch_id: epochId,
      current_streak_epochs: 0,
      current_multiplier_bps: 10_000,
      permanently_ineligible: false,
      ineligible_reason: "holder_pct_at_or_above_4",
      ineligible_at: now,
      updated_at: now
    });
  }

  for (const holder of eligibleHolders) {
    const existing = stateByWallet.get(holder.wallet.toLowerCase());
    const sold = Boolean(existing && raw(existing.source_balance_raw) > holder.rawBalance);
    const eligibleSince = sold ? now : existing?.eligible_since ?? now;
    const multiplierBps = holdMultiplierBps(eligibleSince, nowMs);
    const highest = raw(existing?.highest_source_balance_raw) > holder.rawBalance
      ? raw(existing?.highest_source_balance_raw)
      : holder.rawBalance;

    updates.push({
      wallet: holder.wallet,
      source_balance: holder.uiBalance.toString(),
      source_balance_raw: holder.rawBalance.toString(),
      highest_source_balance_raw: highest.toString(),
      eligible_since: eligibleSince,
      last_seen_at: now,
      last_epoch_id: epochId,
      current_streak_epochs: sold ? 1 : (existing?.current_streak_epochs ?? 0) + 1,
      current_multiplier_bps: multiplierBps,
      permanently_ineligible: false,
      ineligible_reason: null,
      ineligible_at: null,
      updated_at: now
    });
    output.push({ ...holder, multiplierBps, eligibleSince });
  }

  if (updates.length) {
    const { error: upsertError } = await supabase.from("holder_states").upsert(updates, { onConflict: "wallet" });
    if (upsertError) throw new Error(`upsert holder states: ${JSON.stringify(upsertError)}`);
  }
  return output;
}
