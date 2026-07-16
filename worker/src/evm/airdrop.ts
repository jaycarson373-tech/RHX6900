import { formatUnits, parseEther } from "ethers";
import { provider, tokenContract, treasury } from "./chain.js";
import { config, type TreasuryAsset } from "./config.js";
import { getPayout, writePayout } from "./db.js";
import type { Holder } from "./holders.js";

export type Allocation = {
  wallet: string;
  amount: bigint;
};

export function computeAllocations(holders: Holder[], rewardRaw: bigint) {
  const weighted = holders
    .map((holder) => ({
      holder,
      weight: holder.rawBalance * BigInt(holder.multiplierBps ?? 10_000) / 10_000n
    }))
    .filter((item) => item.weight > 0n);
  const totalWeight = weighted.reduce((total, item) => total + item.weight, 0n);
  if (!totalWeight || !rewardRaw) return [];
  return weighted
    .map(({ holder, weight }) => ({ wallet: holder.wallet, amount: rewardRaw * weight / totalWeight }))
    .filter((allocation) => allocation.amount > 0n);
}

export async function distribute(epochId: string, asset: TreasuryAsset, allocations: Allocation[]) {
  const token = tokenContract(asset.address, true);
  const decimals = Number(await token.decimals());
  let settledRaw = 0n;
  let settledCount = 0;

  for (const allocation of allocations) {
    const displayAmount = formatUnits(allocation.amount, decimals);
    const existing = await getPayout(epochId, allocation.wallet, asset.symbol);
    if (existing?.status === "settled") {
      settledRaw += allocation.amount;
      settledCount += 1;
      continue;
    }

    if (existing?.status === "broadcast" && existing.tx_sig) {
      const receipt = await provider.getTransactionReceipt(existing.tx_sig);
      if (!receipt) throw new Error(`Payout still pending: ${existing.tx_sig}`);
      if (receipt.status === 1) {
        await writePayout(epochId, allocation.wallet, asset.symbol, allocation.amount, displayAmount, "settled", existing.tx_sig);
        settledRaw += allocation.amount;
        settledCount += 1;
        continue;
      }
    }

    if (!config.airdropEnabled) {
      await writePayout(epochId, allocation.wallet, asset.symbol, allocation.amount, displayAmount, "dry_run");
      continue;
    }

    await writePayout(epochId, allocation.wallet, asset.symbol, allocation.amount, displayAmount, "planned");
    let txHash = existing?.tx_sig ?? null;
    try {
      const gas = await token.transfer.estimateGas(allocation.wallet, allocation.amount);
      const feeData = await provider.getFeeData();
      const gasPrice = feeData.maxFeePerGas ?? feeData.gasPrice ?? 0n;
      const balance = await provider.getBalance(treasury.address);
      const required = parseEther(config.minEthReserve.toString()) + gas * gasPrice * 125n / 100n;
      if (balance <= required) throw new Error("Treasury reached its protected ETH gas reserve");

      const transaction = await token.transfer(allocation.wallet, allocation.amount, { gasLimit: gas * 125n / 100n });
      txHash = transaction.hash;
      await writePayout(
        epochId,
        allocation.wallet,
        asset.symbol,
        allocation.amount,
        displayAmount,
        "broadcast",
        transaction.hash
      );
      const receipt = await transaction.wait(1);
      if (!receipt || receipt.status !== 1) throw new Error(`Payout reverted: ${transaction.hash}`);
      await writePayout(
        epochId,
        allocation.wallet,
        asset.symbol,
        allocation.amount,
        displayAmount,
        "settled",
        transaction.hash
      );
      settledRaw += allocation.amount;
      settledCount += 1;
    } catch (error) {
      await writePayout(
        epochId,
        allocation.wallet,
        asset.symbol,
        allocation.amount,
        displayAmount,
        "failed",
        txHash,
        error instanceof Error ? error.message : String(error)
      );
      throw error;
    }
  }

  return { settledRaw, settledCount, settledUi: Number(formatUnits(settledRaw, decimals)) };
}
