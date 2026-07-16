import { Interface, parseEther, type TransactionReceipt } from "ethers";
import { ERC20_ABI, provider, tokenContract, treasury } from "./chain.js";
import { config, type TreasuryAsset } from "./config.js";

const NATIVE_ETH = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

type SwapResponse = {
  dstAmount: string;
  tx: { from?: string; to: string; data: string; value: string; gas?: string; gasPrice?: string };
};

export async function swapBudget(recipientCount: number) {
  const [balance, feeData] = await Promise.all([provider.getBalance(treasury.address), provider.getFeeData()]);
  const gasPrice = feeData.maxFeePerGas ?? feeData.gasPrice ?? 0n;
  const payoutGasReserve = gasPrice * 80_000n * BigInt(recipientCount) * 125n / 100n;
  const fixedReserve = parseEther(config.minEthReserve.toString());
  const reserve = fixedReserve + payoutGasReserve;
  const spendable = balance > reserve ? balance - reserve : 0n;
  const amount = spendable * BigInt(config.swapBalanceBps) / 10_000n;
  return { balance, reserve, spendable, amount };
}

export async function buildSwap(asset: TreasuryAsset, amount: bigint) {
  const params = new URLSearchParams({
    src: NATIVE_ETH,
    dst: asset.address,
    amount: amount.toString(),
    from: treasury.address,
    origin: treasury.address,
    slippage: config.swapSlippagePct.toString(),
    includeGas: "true"
  });
  const response = await fetch(`https://api.1inch.com/swap/v6.1/${config.chainId}/swap?${params}`, {
    headers: { authorization: `Bearer ${config.oneInchApiKey}`, accept: "application/json" }
  });
  if (!response.ok) throw new Error(`1inch swap build ${response.status}: ${await response.text()}`);
  const swap = await response.json() as SwapResponse;
  if (swap.tx.from && swap.tx.from.toLowerCase() !== treasury.address.toLowerCase()) {
    throw new Error("1inch returned a transaction for a different sender");
  }
  if (BigInt(swap.tx.value) > amount) throw new Error("1inch transaction exceeds approved ETH budget");
  return swap;
}

export function receivedFromReceipt(asset: TreasuryAsset, receipt: TransactionReceipt) {
  const tokenInterface = new Interface(ERC20_ABI);
  return receipt.logs.reduce((total, log) => {
    if (log.address.toLowerCase() !== asset.address.toLowerCase()) return total;
    try {
      const parsed = tokenInterface.parseLog({ topics: [...log.topics], data: log.data });
      if (parsed?.name !== "Transfer" || String(parsed.args.to).toLowerCase() !== treasury.address.toLowerCase()) return total;
      return total + BigInt(parsed.args.value);
    } catch {
      return total;
    }
  }, 0n);
}

export async function executeSwap(asset: TreasuryAsset, amount: bigint, onBroadcast: (hash: string, quotedRaw: bigint) => Promise<void>) {
  const contract = tokenContract(asset.address);
  const before = await contract.balanceOf(treasury.address) as bigint;
  const swap = await buildSwap(asset, amount);

  if (!config.buyEnabled) {
    return { quotedRaw: BigInt(swap.dstAmount), receivedRaw: 0n, txHash: null as string | null, receipt: null };
  }

  const request = {
    to: swap.tx.to,
    data: swap.tx.data,
    value: BigInt(swap.tx.value),
    gasLimit: swap.tx.gas ? BigInt(swap.tx.gas) * 125n / 100n : undefined,
    gasPrice: swap.tx.gasPrice ? BigInt(swap.tx.gasPrice) : undefined
  };
  await provider.call({ ...request, from: treasury.address });
  const transaction = await treasury.sendTransaction(request);
  await onBroadcast(transaction.hash, BigInt(swap.dstAmount));
  const receipt = await transaction.wait(1);
  if (!receipt || receipt.status !== 1) throw new Error(`Swap reverted: ${transaction.hash}`);
  const after = await contract.balanceOf(treasury.address) as bigint;
  const receivedFromLogs = receivedFromReceipt(asset, receipt);
  return {
    quotedRaw: BigInt(swap.dstAmount),
    receivedRaw: after > before ? after - before : receivedFromLogs,
    txHash: transaction.hash,
    receipt
  };
}
