import { 
  getProvider, 
  getTokenContract, 
  getFaucetContract, 
  requestTokens 
} from "./contracts";
import { connectWallet } from "./wallet";

declare global {
  interface Window {
    EVAL: any; // Changed from __EVAL__ to EVAL
  }
}

// Changed from window.__EVAL__ to window.EVAL
window.EVAL = {
  connectWallet: async (): Promise<string> => {
    return await connectWallet();
  },

  requestTokens: async (): Promise<string> => {
    return await requestTokens(); 
  },

  getBalance: async (address: string): Promise<string> => {
    const provider = getProvider();
    const token = getTokenContract(provider);
    const bal = await token.balanceOf(address);
    return bal.toString(); 
  },

  canClaim: async (address: string): Promise<boolean> => {
    const provider = getProvider();
    const faucet = getFaucetContract(provider);
    return await faucet.canClaim(address);
  },

  getRemainingAllowance: async (address: string): Promise<string> => {
    const provider = getProvider();
    const faucet = getFaucetContract(provider);
    const remaining = await faucet.remainingAllowance(address);
    return remaining.toString();
  },

  getContractAddresses: async () => {
    return {
      token: import.meta.env.VITE_TOKEN_ADDRESS,
      faucet: import.meta.env.VITE_FAUCET_ADDRESS,
    };
  },
};