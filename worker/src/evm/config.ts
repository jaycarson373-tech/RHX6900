import "dotenv/config";
import { getAddress } from "ethers";

export type TreasuryAsset = {
  symbol: string;
  address: string;
};

const DEFAULT_ASSETS: TreasuryAsset[] = [
  ["WISHBONE", "0x77581054581B9c525E7dd7a0155DE43867532d03"],
  ["TENDIES", "0x45242320DBB855EeA8Fd36804C6487E10E97FCF9"],
  ["CASHCAT", "0x020bfC650A365f8BB26819deAAbF3E21291018b4"],
  ["HOODRAT", "0x8e62F281f282686fCa6dCB39288069a93fC23F1c"],
  ["JUGGERNAUT", "0xD7321801CAae694090694Ff55A9323139F043B88"],
  ["HAN", "0x3746a5ebCA295Dee695dd1bcba50A8626Df3099C"],
  ["VEX", "0x8Ff92566f2e81BDd68EDfAa8cde73942A723796b"],
  ["WOOD", "0xF8BC08092C06dB6148114DCf82AF881F1085f92b"],
  ["ARROW", "0xf2915d1e3C1B0c769d0c756Ec43F1c1f6c99cD03"],
  ["WALLET", "0x0339f5459FC690aC85F1782e15782A151b4A9E1b"]
].map(([symbol, address]) => ({ symbol, address: getAddress(address) }));

function required(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required env ${name}`);
  return value;
}

function enabled(name: string) {
  return ["1", "true", "yes", "on"].includes((process.env[name] ?? "false").toLowerCase());
}

function numberEnv(name: string, fallback: number) {
  const raw = process.env[name];
  if (!raw) return fallback;
  const value = Number(raw);
  if (!Number.isFinite(value)) throw new Error(`Invalid number env ${name}=${raw}`);
  return value;
}

function addressList(name: string) {
  return (process.env[name] ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
    .map(getAddress);
}

function treasuryAssets() {
  const raw = process.env.TREASURY_ASSETS_JSON;
  if (!raw) return DEFAULT_ASSETS;
  const parsed = JSON.parse(raw) as TreasuryAsset[];
  if (parsed.length !== 10) throw new Error("TREASURY_ASSETS_JSON must contain exactly 10 assets");
  return parsed.map((asset) => ({ symbol: asset.symbol.toUpperCase(), address: getAddress(asset.address) }));
}

export const config = {
  projectName: "RHX6900",
  chainId: 4663 as const,
  rpcUrl: required("ROBINHOOD_RPC_URL"),
  privateKey: required("TREASURY_PRIVATE_KEY"),
  sourceToken: getAddress(required("SOURCE_TOKEN_ADDRESS")),
  sourceSymbol: "RHX6900",
  assets: treasuryAssets(),
  oneInchApiKey: required("ONEINCH_API_KEY"),
  blockscoutApiUrl: (process.env.BLOCKSCOUT_API_URL ?? "https://robinhoodchain.blockscout.com/api/v2").replace(/\/$/, ""),
  supabaseUrl: required("SUPABASE_URL"),
  supabaseServiceRole: required("SUPABASE_SERVICE_ROLE"),

  buyEnabled: enabled("BUY_ENABLED"),
  airdropEnabled: enabled("AIRDROP_ENABLED"),
  epochMinutes: 15 as const,
  swapBalanceBps: 8_000 as const,
  rewardTokensPerCycle: 1 as const,
  eligibilityMin: 2_500_000 as const,
  maxHolderPct: 4 as const,
  maxWalletsPerEpoch: Math.max(1, Math.floor(numberEnv("MAX_WALLETS_PER_EPOCH", 200))),
  excludeWallets: addressList("EXCLUDE_WALLETS"),
  holderStreakBonusEnabled: enabled("HOLDER_STREAK_BONUS_ENABLED"),
  minEthReserve: Math.max(0.001, numberEnv("MIN_ETH_RESERVE", 0.02)),
  minSwapEth: Math.max(0, numberEnv("MIN_SWAP_ETH", 0.001)),
  swapSlippagePct: Math.max(0.1, Math.min(10, numberEnv("SWAP_SLIPPAGE_PCT", 3)))
};

