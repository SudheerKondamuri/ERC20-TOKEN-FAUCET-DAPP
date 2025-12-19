// src/utils/eval.ts
import {
  getBalance,
  canClaim,
  getRemainingAllowance,
  requestTokens,
} from "./contracts";
import { connectWallet } from "./wallet";

declare global {
  interface Window {
    __EVAL__: any;
  }
}

window.__EVAL__ = {
  connectWallet: async (): Promise<string> => {
    return await connectWallet();
  },

  requestTokens: async (): Promise<string> => {
    return await requestTokens();
  },

  getBalance: async (address: string): Promise<string> => {
    const bal = await getBalance(address);
    return bal.toString();
  },

  canClaim: async (address: string): Promise<boolean> => {
    return await canClaim(address);
  },

  getRemainingAllowance: async (address: string): Promise<string> => {
    return await getRemainingAllowance(address);
  },

  getContractAddresses: async () => {
    return {
      token: import.meta.env.VITE_TOKEN_ADDRESS,
      faucet: import.meta.env.VITE_FAUCET_ADDRESS,
    };
  },
};
