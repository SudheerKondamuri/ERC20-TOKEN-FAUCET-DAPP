// src/utils/contracts.ts
import { ethers } from "ethers";
import TokenABI from "../../abis/Token.json";
import FaucetABI from "../../abis/TokenFaucet.json";

const RPC_URL = import.meta.env.VITE_RPC_URL as string;
const TOKEN_ADDRESS = import.meta.env.VITE_TOKEN_ADDRESS as string;
const FAUCET_ADDRESS = import.meta.env.VITE_FAUCET_ADDRESS as string;

export function getProvider(): ethers.JsonRpcProvider {
  return new ethers.JsonRpcProvider(RPC_URL);
}

export async function getSigner(): Promise<ethers.Signer> {
  if (!(window as any).ethereum) {
    throw new Error("Wallet not available");
  }
  const provider = new ethers.BrowserProvider((window as any).ethereum);
  return provider.getSigner();
}

export function getTokenContract(
  providerOrSigner: ethers.Provider | ethers.Signer
): ethers.Contract {
  return new ethers.Contract(TOKEN_ADDRESS, TokenABI.abi, providerOrSigner);
}

export function getFaucetContract(
  providerOrSigner: ethers.Provider | ethers.Signer
): ethers.Contract {
  return new ethers.Contract(FAUCET_ADDRESS, FaucetABI.abi, providerOrSigner);
}

export async function getBalance(address: string): Promise<string> {
  const token = getTokenContract(getProvider());
  const bal = await token.balanceOf(address);
  return bal.toString();
}

export async function canClaim(address: string): Promise<boolean> {
  const faucet = getFaucetContract(getProvider());
  return await faucet.canClaim(address);
}

export async function getRemainingAllowance(address: string): Promise<string> {
  const faucet = getFaucetContract(getProvider());
  const remaining = await faucet.remainingAllowance(address);
  return remaining.toString();
}

export async function requestTokens(): Promise<string> {
  const signer = await getSigner();
  const faucet = getFaucetContract(signer);
  const tx = await faucet.requestTokens();
  const receipt = await tx.wait();
  return receipt.hash;
}
