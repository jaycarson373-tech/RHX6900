import { formatEther, formatUnits, parseEther } from "ethers";
import { computeAllocations, distribute } from "./airdrop.js";
import { assertRobinhoodChain, tokenContract } from "./chain.js";
import { config } from "./config.js";
import {
  failEpoch,
  finishEpoch,
  getBuy,
  getEpoch,
  persistExclusions,
  persistSnapshot,
  recordBuy,
  startEpoch
} from "./db.js";
import { applyHolderState } from "./holder-state.js";
import { selectRecipients, snapshotHolders } from "./holders.js";
import { buildSwap, executeSwap, receivedFromReceipt, swapBudget } from "./swap.js";
import { assetForEpoch, epochIdFor } from "./time.js";

let running = false;

export async function runEpoch(date = new Date()) {
  if (running) return;
  running = true;
  const epochId = epochIdFor(date);
  const asset = assetForEpoch(date);

  try {
    await assertRobinhoodChain();
    const existing = await getEpoch(epochId);
    if (existing?.status === "completed" || existing?.status === "skipped") return;
    await startEpoch(epochId, asset);

    const snapshot = await snapshotHolders();
    const withState = await applyHolderState(epochId, snapshot.eligible, snapshot.candidates);
    const recipients = selectRecipients(epochId, withState);
    await Promise.all([
      persistSnapshot(epochId, recipients),
      persistExclusions(epochId, snapshot.exclusions)
    ]);

    console.log(
      `[${epochId}] ${recipients.length} recipients; excluded ${snapshot.exclusions.length} wallets including every holder at or above 4%`
    );
    if (!recipients.length) {
      await finishEpoch(epochId, { status: "skipped", eligible_count: 0, reward_bought: "0", reward_distributed: "0" });
      return;
    }

    const budget = await swapBudget(recipients.length);
    const minimumSwap = parseEther(config.minSwapEth.toString());
    console.log(
      `[${epochId}] ${asset.symbol}: balance=${formatEther(budget.balance)} ETH reserve=${formatEther(budget.reserve)} ETH swap=${formatEther(budget.amount)} ETH (80% of spendable)`
    );
    if (budget.amount < minimumSwap) {
      await recordBuy(epochId, {
        reward_asset: asset.symbol,
        reward_contract: asset.address,
        base_spent_lamports: "0",
        reward_received_raw: "0",
        reward_received: "0",
        status: "skipped"
      });
      await finishEpoch(epochId, {
        status: "skipped",
        eligible_count: recipients.length,
        reward_bought: "0",
        reward_distributed: "0"
      });
      return;
    }

    if (!config.buyEnabled) {
      const quote = await buildSwap(asset, budget.amount);
      const decimals = Number(await tokenContract(asset.address).decimals());
      await recordBuy(epochId, {
        reward_asset: asset.symbol,
        reward_contract: asset.address,
        base_spent_lamports: budget.amount.toString(),
        reward_received_raw: quote.dstAmount,
        reward_received: formatUnits(quote.dstAmount, decimals),
        status: "dry_run",
        tx_sig: null
      });
      await finishEpoch(epochId, {
        status: "skipped",
        eligible_count: recipients.length,
        reward_bought: formatUnits(quote.dstAmount, decimals),
        reward_distributed: "0"
      });
      return;
    }

    const decimals = Number(await tokenContract(asset.address).decimals());
    const priorBuy = await getBuy(epochId);
    let purchase: { receivedRaw: bigint; txHash: string | null };

    if (priorBuy?.status === "settled") {
      purchase = { receivedRaw: BigInt(priorBuy.reward_received_raw), txHash: priorBuy.tx_sig };
    } else if (priorBuy?.status === "broadcast" && priorBuy.tx_sig) {
      const receipt = await tokenContract(asset.address).runner?.provider?.getTransactionReceipt(priorBuy.tx_sig);
      if (!receipt) throw new Error(`Swap still pending: ${priorBuy.tx_sig}`);
      if (receipt.status !== 1) throw new Error(`Swap reverted: ${priorBuy.tx_sig}`);
      purchase = { receivedRaw: receivedFromReceipt(asset, receipt), txHash: priorBuy.tx_sig };
    } else {
      purchase = await executeSwap(asset, budget.amount, async (txHash, quotedRaw) => {
        await recordBuy(epochId, {
          reward_asset: asset.symbol,
          reward_contract: asset.address,
          base_spent_lamports: budget.amount.toString(),
          reward_received_raw: quotedRaw.toString(),
          reward_received: formatUnits(quotedRaw, decimals),
          status: "broadcast",
          tx_sig: txHash
        });
      });
    }
    await recordBuy(epochId, {
      reward_asset: asset.symbol,
      reward_contract: asset.address,
      base_spent_lamports: budget.amount.toString(),
      reward_received_raw: purchase.receivedRaw.toString(),
      reward_received: formatUnits(purchase.receivedRaw, decimals),
      status: "settled",
      tx_sig: purchase.txHash
    });

    const allocations = computeAllocations(recipients, purchase.receivedRaw);
    const result = await distribute(epochId, asset, allocations);
    await finishEpoch(epochId, {
      eligible_count: recipients.length,
      reward_bought: formatUnits(purchase.receivedRaw, decimals),
      reward_distributed: result.settledUi.toString(),
      distribution_count: result.settledCount
    });
  } catch (error) {
    await failEpoch(epochId, error).catch((dbError) => console.error("failed to record epoch failure", dbError));
    console.error(`[${epochId}] failed`, error);
  } finally {
    running = false;
  }
}
