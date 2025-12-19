import { useState, useEffect } from "react";

export interface AdminFinanceStats {
  revenue: number;
  feeBreakdown: { type: string; value: string }[];
  reconciliation: { date: string; status: string }[];
}

export function useAdminFinance() {
  const [stats, setStats] = useState<AdminFinanceStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        revenue: 1200000,
        feeBreakdown: [
          { type: "Conversion Fee", value: "1.5%" },
          { type: "Payout Fee", value: "0.5%" }
        ],
        reconciliation: [
          { date: "2025-12-18", status: "OK" },
          { date: "2025-12-17", status: "Discrepancy - Investigate" }
        ]
      });
      setLoading(false);
    }, 500);
  }, []);

  return { stats, loading };
}
