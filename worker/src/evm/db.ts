import { createClient } from "@supabase/supabase-js";
import { config } from "./config.js";

export const supabase = createClient(config.supabaseUrl, config.supabaseServiceRole, {
  auth: { persistSession: false }
});

function check(error: unknown, label: string) {
  if (error) throw new Error(`${label}: ${JSON.stringify(error)}`);
}

export async function getEpoch(epochId: string) {
  const { data, error } = await supabase.from("epochs").select("*").eq("epoch_id", epochId).maybeSingle();
  check(error, "get epoch");
  return data;
}

export async function startEpoch(epochId: string, asset: { symbol: string; address: string }) {
  const { error } = await supabase.from("epochs").upsert({
    epoch_id: epochId,
    status: "running",
    reward_asset: asset.symbol,
    reward_contract: asset.address,
    swap_bps: config.swapBalanceBps,
    holder_cap_pct: config.maxHolderPct,
    started_at: new Date().toISOString(),
    completed_at: null,
    error: null
  });
  check(error, "start epoch");
}

export async function finishEpoch(epochId: string, fields: Record<string, unknown>) {
  const { error } = await supabase
    .from("epochs")
    .update({ ...fields, status: fields.status ?? "completed", completed_at: new Date().toISOString() })
    .eq("epoch_id", epochId);
  check(error, "finish epoch");
}

export async function failEpoch(epochId: string, failure: unknown) {
  const { error } = await supabase
    .from("epochs")
    .update({
      status: "failed",
      error: failure instanceof Error ? failure.message : String(failure),
      completed_at: new Date().toISOString()
    })
    .eq("epoch_id", epochId);
  check(error, "fail epoch");
}

export async function persistSnapshot(
  epochId: string,
  holders: { wallet: string; uiBalance: number; rawBalance: bigint; holderPct: number }[]
) {
  if (!holders.length) return;
  const { error } = await supabase.from("snapshots").upsert(
    holders.map((holder) => ({
      epoch_id: epochId,
      wallet: holder.wallet,
      source_balance: holder.uiBalance.toString(),
      source_balance_raw: holder.rawBalance.toString(),
      holder_pct: holder.holderPct.toString()
    })),
    { onConflict: "epoch_id,wallet" }
  );
  check(error, "persist snapshot");
}

export async function persistExclusions(
  epochId: string,
  rows: { wallet: string; rawBalance: bigint; uiBalance: number; holderPct: number; reason: string }[]
) {
  if (!rows.length) return;
  const { error } = await supabase.from("eligibility_exclusions").upsert(
    rows.map((row) => ({
      epoch_id: epochId,
      wallet: row.wallet,
      source_balance: row.uiBalance.toString(),
      source_balance_raw: row.rawBalance.toString(),
      holder_pct: row.holderPct.toString(),
      reason: row.reason
    })),
    { onConflict: "epoch_id,wallet" }
  );
  check(error, "persist exclusions");
}

export async function recordBuy(epochId: string, values: Record<string, unknown>) {
  const { error } = await supabase.from("buys").upsert({ epoch_id: epochId, ...values });
  check(error, "record buy");
}

export async function getBuy(epochId: string) {
  const { data, error } = await supabase.from("buys").select("*").eq("epoch_id", epochId).maybeSingle();
  check(error, "get buy");
  return data as null | {
    status: string;
    tx_sig: string | null;
    reward_received_raw: string;
  };
}

export type PayoutRow = {
  status: "planned" | "broadcast" | "settled" | "failed" | "dry_run";
  tx_sig: string | null;
};

export async function getPayout(epochId: string, wallet: string, rewardAsset: string) {
  const { data, error } = await supabase
    .from("payouts")
    .select("status,tx_sig")
    .eq("epoch_id", epochId)
    .eq("wallet", wallet)
    .eq("reward_asset", rewardAsset)
    .maybeSingle();
  check(error, "get payout");
  return data as PayoutRow | null;
}

export async function writePayout(
  epochId: string,
  wallet: string,
  rewardAsset: string,
  rewardAmountRaw: bigint,
  rewardAmount: string,
  status: PayoutRow["status"],
  txSig: string | null = null,
  errorMessage: string | null = null
) {
  const { error } = await supabase.from("payouts").upsert({
    epoch_id: epochId,
    wallet,
    reward_asset: rewardAsset,
    reward_amount_raw: rewardAmountRaw.toString(),
    reward_amount: rewardAmount,
    normal_reward_amount_raw: rewardAmountRaw.toString(),
    normal_reward_amount: rewardAmount,
    idempotency_key: `${epochId}:${wallet.toLowerCase()}:${rewardAsset}`,
    status,
    tx_sig: txSig,
    error: errorMessage,
    updated_at: new Date().toISOString()
  }, { onConflict: "idempotency_key" });
  check(error, "write payout");
}
