import { runEpoch } from "./epoch.js";
import { config } from "./config.js";
import { msUntilNextEpoch } from "./time.js";
import { createServer } from "node:http";

console.log(`${config.projectName} worker started. Schedule: every ${config.epochMinutes} minutes.`);
console.log(
  `Mode: REWARD_MODE=${config.rewardMode}. Gates: CLAIM_ENABLED=${config.claimEnabled}, BUY_ENABLED=${config.buyEnabled}, AIRDROP_ENABLED=${config.airdropEnabled}`
);
console.log(
  `Reward split: ${config.swapBalanceBps / 100}% claimed SOL can buy the active ${config.rewardSymbol} reward coin; ${config.sideWalletBps / 100}% routes to side wallet.`
);
console.log(`Source token mint: ${config.sourceTokenMint.toBase58()}`);
console.log(`Active reward mint: ${config.rewardTokenMint.toBase58()} (${config.rewardSymbol})`);
console.log(`Eligibility gate: holder must hold ${config.eligibilityMin.toLocaleString()} ${config.sourceSymbol} tokens`);

async function loop() {
  await runEpoch();
  const waitMs = msUntilNextEpoch(new Date()) + 500;
  setTimeout(loop, waitMs);
}

function startHealthServer() {
  const port = process.env.PORT ? Number(process.env.PORT) : 0;
  if (!Number.isInteger(port) || port <= 0) return;

  createServer((request, response) => {
    response.writeHead(200, { "content-type": "application/json" });
    response.end(
      JSON.stringify({
        ok: true,
        service: config.projectName,
        rewardSymbol: config.rewardSymbol,
        path: request.url ?? "/"
      })
    );
  }).listen(port, "0.0.0.0", () => {
    console.log(`Health server listening on 0.0.0.0:${port}`);
  });
}

function scheduleFirstRun() {
  console.log("First epoch run starting immediately.");
  loop().catch((error) => {
    console.error("worker crashed", error);
    process.exit(1);
  });
}

startHealthServer();
scheduleFirstRun();
