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
