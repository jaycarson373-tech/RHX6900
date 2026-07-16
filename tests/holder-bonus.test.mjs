import assert from "node:assert/strict";
import test from "node:test";

process.env.HELIUS_RPC_URL ??= "https://example.invalid";
process.env.SOURCE_TOKEN_MINT ??= "So11111111111111111111111111111111111111112";
process.env.ACTIVE_REWARD_TOKEN_MINT ??= "So11111111111111111111111111111111111111112";
process.env.TREASURY_WALLET_SECRET ??= JSON.stringify(Array(64).fill(1));
process.env.SUPABASE_URL ??= "https://example.supabase.co";
process.env.SUPABASE_SERVICE_ROLE ??= "test-service-role";
process.env.HOLDER_STREAK_BONUS_ENABLED = "true";

const { config } = await import(`../worker/dist/config.js?test=${process.pid}-${Date.now()}`);
const { holdMultiplierBps } = await import(`../worker/dist/holder-state.js?test=${process.pid}-${Date.now()}`);

const DAY_MS = 24 * 60 * 60 * 1000;

function daysAgo(nowMs, days) {
  return new Date(nowMs - days * DAY_MS).toISOString();
}

test("defaults the active reward symbol to Tendies", () => {
  assert.equal(config.rewardSymbol, "TENDIES");
  assert.equal(config.eligibilityMin, 2_500_000);
  assert.equal(config.rewardTokensPerCycle, 1);
});

test("uses the RHX holder streak bonus ladder", () => {
  const nowMs = Date.parse("2026-07-16T00:00:00.000Z");

  assert.equal(holdMultiplierBps(daysAgo(nowMs, 0), nowMs), 10_000);
  assert.equal(holdMultiplierBps(daysAgo(nowMs, 1), nowMs), 15_000);
  assert.equal(holdMultiplierBps(daysAgo(nowMs, 6), nowMs), 15_000);
  assert.equal(holdMultiplierBps(daysAgo(nowMs, 7), nowMs), 20_000);
  assert.equal(holdMultiplierBps(daysAgo(nowMs, 29), nowMs), 20_000);
  assert.equal(holdMultiplierBps(daysAgo(nowMs, 30), nowMs), 30_000);
  assert.equal(holdMultiplierBps(daysAgo(nowMs, 89), nowMs), 30_000);
  assert.equal(holdMultiplierBps(daysAgo(nowMs, 90), nowMs), 50_000);
  assert.equal(holdMultiplierBps(daysAgo(nowMs, 179), nowMs), 50_000);
  assert.equal(holdMultiplierBps(daysAgo(nowMs, 180), nowMs), 100_000);
});
