import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

process.env.ROBINHOOD_RPC_URL ??= "https://example.invalid";
process.env.TREASURY_PRIVATE_KEY ??= `0x${"11".repeat(32)}`;
process.env.SOURCE_TOKEN_ADDRESS ??= "0x1111111111111111111111111111111111111111";
process.env.PLTR_TOKEN_ADDRESS ??= "0x2222222222222222222222222222222222222222";
process.env.ONEINCH_API_KEY ??= "test-key";
process.env.SUPABASE_URL ??= "https://example.supabase.co";
process.env.SUPABASE_SERVICE_ROLE ??= "test-service-role";
process.env.HOLDER_STREAK_BONUS_ENABLED = "true";

const { config } = await import(`../worker/dist/evm/config.js?test=${process.pid}-${Date.now()}`);
const { holdMultiplierBps } = await import(`../worker/dist/evm/holder-state.js?test=${process.pid}-${Date.now()}`);

const DAY_MS = 24 * 60 * 60 * 1000;

function daysAgo(nowMs, days) {
  return new Date(nowMs - days * DAY_MS).toISOString();
}

test("configures one PLTR reward every 15 minutes", () => {
  assert.equal(config.projectName, "PALANTINU");
  assert.equal(config.sourceSymbol, "PALANTINU");
  assert.equal(config.assets.length, 1);
  assert.equal(config.assets[0].symbol, "PLTR");
  assert.equal(config.epochMinutes, 15);
  assert.equal(config.rewardTokensPerCycle, 1);
  assert.equal(config.buyEnabled, false);
  assert.equal(config.airdropEnabled, false);
});

test("locks the Robinhood Chain execution rules", async () => {
  const [evmConfig, scheduler, snapshot, swap] = await Promise.all([
    readFile(new URL("../worker/src/evm/config.ts", import.meta.url), "utf8"),
    readFile(new URL("../worker/src/evm/scheduler.ts", import.meta.url), "utf8"),
    readFile(new URL("../worker/src/evm/holders.ts", import.meta.url), "utf8"),
    readFile(new URL("../worker/src/evm/swap.ts", import.meta.url), "utf8"),
  ]);

  assert.match(evmConfig, /chainId: 4663/);
  assert.match(evmConfig, /epochMinutes: 15/);
  assert.match(evmConfig, /swapBalanceBps: 8_000/);
  assert.match(evmConfig, /PLTR_TOKEN_ADDRESS/);
  assert.match(evmConfig, /symbol: "PLTR"/);
  assert.match(evmConfig, /maxHolderPct: 4/);
  assert.match(snapshot, /holder\.holderPct >= config\.maxHolderPct/);
  assert.match(swap, /config\.swapBalanceBps/);
  assert.match(scheduler, /one token per cycle/i);
});

test("uses the PALANTINU holder streak bonus ladder", () => {
  const nowMs = Date.parse("2026-07-17T00:00:00.000Z");

  assert.equal(holdMultiplierBps(daysAgo(nowMs, 0), nowMs), 10_000);
  assert.equal(holdMultiplierBps(daysAgo(nowMs, 1), nowMs), 15_000);
  assert.equal(holdMultiplierBps(daysAgo(nowMs, 7), nowMs), 20_000);
  assert.equal(holdMultiplierBps(daysAgo(nowMs, 30), nowMs), 30_000);
  assert.equal(holdMultiplierBps(daysAgo(nowMs, 90), nowMs), 50_000);
  assert.equal(holdMultiplierBps(daysAgo(nowMs, 180), nowMs), 100_000);
});
