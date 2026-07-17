import { createHash } from "node:crypto";
import { formatUnits, getAddress } from "ethers";
import { treasury } from "./chain.js";
import { config } from "./config.js";

export type Holder = {
  wallet: string;
  rawBalance: bigint;
  uiBalance: number;
  holderPct: number;
  multiplierBps?: number;
  streakEpochs?: number;
  eligibleSince?: string | null;
};

type HolderItem = {
  address: { hash: string };
  value: string;
};

type HolderPage = {
  items: HolderItem[];
  next_page_params: Record<string, string | number> | null;
};

type TokenMetadata = {
  decimals: string;
  total_supply: string;
};

function holderPercent(rawBalance: bigint, rawSupply: bigint) {
  return rawSupply > 0n ? Number((rawBalance * 1_000_000n) / rawSupply) / 10_000 : 0;
}

async function blockscoutJson<T>(path: string): Promise<T> {
  const response = await fetch(`${config.blockscoutApiUrl}${path}`, {
    headers: { accept: "application/json", "user-agent": "PALANTINU-Airdrop/1.0" }
  });
  if (!response.ok) throw new Error(`Blockscout ${response.status}: ${await response.text()}`);
  return response.json() as Promise<T>;
}

export async function snapshotHolders() {
  const metadata = await blockscoutJson<TokenMetadata>(`/tokens/${config.sourceToken}`);
  const decimals = Number(metadata.decimals);
  const rawSupply = BigInt(metadata.total_supply);
  const minimumRaw = BigInt(config.eligibilityMin) * 10n ** BigInt(decimals);
  const candidates: Holder[] = [];
  let pageParams: Record<string, string | number> | null = null;

  for (let pageNumber = 0; pageNumber < 250; pageNumber += 1) {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(pageParams ?? {})) query.set(key, String(value));
    const page = await blockscoutJson<HolderPage>(
      `/tokens/${config.sourceToken}/holders${query.size ? `?${query}` : ""}`
    );

    let reachedMinimum = false;
    for (const item of page.items) {
      const rawBalance = BigInt(item.value);
      if (rawBalance < minimumRaw) {
        reachedMinimum = true;
        break;
      }
      candidates.push({
        wallet: getAddress(item.address.hash),
        rawBalance,
        uiBalance: Number(formatUnits(rawBalance, decimals)),
        holderPct: holderPercent(rawBalance, rawSupply)
      });
    }

    if (reachedMinimum || !page.next_page_params) break;
    pageParams = page.next_page_params;
  }

  const configuredExclusions = new Set([
    treasury.address.toLowerCase(),
    "0x0000000000000000000000000000000000000000",
    "0x000000000000000000000000000000000000dead",
    ...config.excludeWallets.map((wallet) => wallet.toLowerCase())
  ]);
  const exclusions: (Holder & { reason: string })[] = [];
  const eligible = candidates.filter((holder) => {
    if (configuredExclusions.has(holder.wallet.toLowerCase())) {
      exclusions.push({ ...holder, reason: "configured_or_system_wallet" });
      return false;
    }
    if (holder.holderPct >= config.maxHolderPct) {
      exclusions.push({ ...holder, reason: "holder_pct_at_or_above_4" });
      return false;
    }
    return true;
  });

  return { candidates, eligible, exclusions, decimals, rawSupply };
}

export function selectRecipients(epochId: string, holders: Holder[]) {
  return holders
    .map((holder) => ({
      holder,
      score: createHash("sha256").update(`${epochId}:${holder.wallet}:${holder.rawBalance}`).digest("hex")
    }))
    .sort((a, b) => a.score.localeCompare(b.score) || a.holder.wallet.localeCompare(b.holder.wallet))
    .slice(0, config.maxWalletsPerEpoch)
    .map(({ holder }) => holder);
}
