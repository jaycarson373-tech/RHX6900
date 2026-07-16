import { createServer } from "node:http";
import { config } from "./config.js";
import { runEpoch } from "./epoch.js";
import { msUntilNextEpoch } from "./time.js";

console.log(`${config.projectName} Robinhood Chain worker started`);
console.log("Rules: 15-minute cycle, one token per cycle, 80% spendable ETH, 2.5M minimum, >=4% excluded");
console.log(`Modes: BUY_ENABLED=${config.buyEnabled} AIRDROP_ENABLED=${config.airdropEnabled}`);

const port = Number(process.env.PORT ?? 0);
if (Number.isInteger(port) && port > 0) {
  createServer((_request, response) => {
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify({
      ok: true,
      chainId: config.chainId,
      epochMinutes: config.epochMinutes,
      swapBps: config.swapBalanceBps,
      holderCapPct: config.maxHolderPct,
      oneTokenPerCycle: true
    }));
  }).listen(port, "0.0.0.0");
}

async function loop() {
  await runEpoch();
  setTimeout(loop, msUntilNextEpoch() + 500);
}

void loop().catch((error) => {
  console.error("worker crashed", error);
  process.exit(1);
});

