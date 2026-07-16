import { Contract, JsonRpcProvider, Wallet } from "ethers";
import { config } from "./config.js";

export const ERC20_ABI = [
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)"
];

export const provider = new JsonRpcProvider(config.rpcUrl, {
  chainId: config.chainId,
  name: "robinhood"
});

export const treasury = new Wallet(config.privateKey, provider);

export function tokenContract(address: string, signer = false) {
  return new Contract(address, ERC20_ABI, signer ? treasury : provider);
}

export async function assertRobinhoodChain() {
  const network = await provider.getNetwork();
  if (network.chainId !== BigInt(config.chainId)) {
    throw new Error(`Wrong RPC chain: expected ${config.chainId}, received ${network.chainId}`);
  }
}
