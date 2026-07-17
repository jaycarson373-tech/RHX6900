import "dotenv/config";
import { getAddress, ZeroAddress } from "ethers";

export type TreasuryAsset = {
  symbol: string;
  address: string;
};

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

const buyEnabled = enabled("BUY_ENABLED");
const airdropEnabled = enabled("AIRDROP_ENABLED");

function pltrTokenAddress() {
  const value = process.env.PLTR_TOKEN_ADDRESS?.trim();
  if (value) return getAddress(value);
  if (buyEnabled || airdropEnabled) throw new Error("Missing required env PLTR_TOKEN_ADDRESS");
  return ZeroAddress;
}

export const config = {
  projectName: "PALANTINU",
  chainId: 4663 as const,
  rpcUrl: required("ROBINHOOD_RPC_URL"),
  privateKey: required("TREASURY_PRIVATE_KEY"),
  sourceToken: getAddress(required("SOURCE_TOKEN_ADDRESS")),
  sourceSymbol: "PALANTINU",
  assets: [{ symbol: "PLTR", address: pltrTokenAddress() }],
  oneInchApiKey: required("ONEINCH_API_KEY"),
  blockscoutApiUrl: (process.env.BLOCKSCOUT_API_URL ?? "https://robinhoodchain.blockscout.com/api/v2").replace(/\/$/, ""),
  supabaseUrl: required("SUPABASE_URL"),
  supabaseServiceRole: required("SUPABASE_SERVICE_ROLE"),

  buyEnabled,
  airdropEnabled,
  epochMinutes: 15 as const,
  swapBalanceBps: 8_000 as const,
  rewardTokensPerCycle: 1 as const,
  eligibilityMin: Math.max(1, numberEnv("ELIGIBILITY_MIN_TOKENS", 2_500_000)),
  maxHolderPct: 4 as const,
  maxWalletsPerEpoch: Math.max(1, Math.floor(numberEnv("MAX_WALLETS_PER_EPOCH", 200))),
  excludeWallets: addressList("EXCLUDE_WALLETS"),
  holderStreakBonusEnabled: enabled("HOLDER_STREAK_BONUS_ENABLED"),
  minEthReserve: Math.max(0.001, numberEnv("MIN_ETH_RESERVE", 0.02)),
  minSwapEth: Math.max(0, numberEnv("MIN_SWAP_ETH", 0.001)),
  swapSlippagePct: Math.max(0.1, Math.min(10, numberEnv("SWAP_SLIPPAGE_PCT", 3)))
};
