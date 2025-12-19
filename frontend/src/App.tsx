// src/App.tsx
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/wallet";
import {
  getBalance,
  canClaim,
  getRemainingAllowance,
  requestTokens,
} from "./utils/contracts";

const App = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [eligible, setEligible] = useState<boolean>(false);
  const [remaining, setRemaining] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function connect() {
    try {
      const addr = await connectWallet();
      setAddress(addr);
    } catch (e: any) {
      setError(e.message);
    }
  }

  async function refresh(addr: string) {
    setBalance(await getBalance(addr));
    setEligible(await canClaim(addr));
    setRemaining(await getRemainingAllowance(addr));
  }

  async function claim() {
    setLoading(true);
    try {
      await requestTokens();
      await refresh(address!);
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (address) refresh(address);
  }, [address]);

  return (
    <div style={{ padding: 20 }}>
      <h2>ERC20 Faucet</h2>

      {!address && <button onClick={connect}>Connect Wallet</button>}

      {address && (
        <>
          <p>Address: {address}</p>
          <p>Balance: {balance}</p>
          <p>Remaining Allowance: {remaining}</p>
          <p>Status: {eligible ? "Can Claim" : "Not Eligible"}</p>

          <button disabled={!eligible || loading} onClick={claim}>
            {loading ? "Claiming..." : "Request Tokens"}
          </button>
        </>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default App;
