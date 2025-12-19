// src/utils/wallet.ts
export async function connectWallet(): Promise<string> {
  if (!(window as any).ethereum) {
    throw new Error("No wallet found");
  }

  const accounts: string[] = await (window as any).ethereum.request({
    method: "eth_requestAccounts",
  });

  if (!accounts || accounts.length === 0) {
    throw new Error("No accounts returned");
  }

  return accounts[0];
}

export function listenWalletChanges(
  onAccountChange: (addr: string | null) => void,
  onChainChange: () => void
): void {
  const eth = (window as any).ethereum;
  if (!eth) return;

  eth.on("accountsChanged", (accounts: string[]) => {
    onAccountChange(accounts[0] ?? null);
  });

  eth.on("chainChanged", () => {
    onChainChange();
  });
}

export async function ensureSepolia() {
  const eth = (window as any).ethereum;
  if (!eth) return;

  const chainId = await eth.request({ method: 'eth_chainId' });
  
  if (chainId !== '0xaa36a7') {
    try {
      await eth.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }],
      });
    } catch (err: any) {
      // If the network is not added to MetaMask, add it
      if (err.code === 4902) {
        await eth.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0xaa36a7',
            chainName: 'Sepolia Test Network',
            nativeCurrency: { name: 'Sepolia ETH', symbol: 'ETH', decimals: 18 },
            rpcUrls: ['https://rpc.sepolia.org'],
            blockExplorerUrls: ['https://sepolia.etherscan.io'],
          }],
        });
      }
    }
  }
}