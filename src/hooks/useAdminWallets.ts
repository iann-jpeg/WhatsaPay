import { useState, useEffect } from "react";

export interface AdminWallet {
  type: "Hot" | "Cold";
  address: string;
  balance: number;
}

export function useAdminWallets() {
  const [wallets, setWallets] = useState<AdminWallet[]>([]);
  const [kesLiquidity, setKesLiquidity] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setWallets([
        { type: "Hot", address: "TXXXXXX...", balance: 50000 },
        { type: "Cold", address: "TYYYYYY...", balance: 200000 }
      ]);
      setKesLiquidity(12000000);
      setLoading(false);
    }, 500);
  }, []);

  return { wallets, kesLiquidity, loading };
}
