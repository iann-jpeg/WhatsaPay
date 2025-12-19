import { useState, useEffect } from "react";

export interface AdminStats {
  totalUsers: number;
  kycComplete: number;
  usdtHot: number;
  usdtCold: number;
  kesLiquidity: number;
  pendingConversions: number;
  failedTx: number;
  systemHealth: string;
}

export function useAdminStats() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalUsers: 12500,
        kycComplete: 10200,
        usdtHot: 50000,
        usdtCold: 200000,
        kesLiquidity: 12000000,
        pendingConversions: 23,
        failedTx: 2,
        systemHealth: "All systems green"
      });
      setLoading(false);
    }, 500);
  }, []);

  return { stats, loading };
}
