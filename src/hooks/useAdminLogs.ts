import { useState, useEffect } from "react";

export interface AdminLog {
  timestamp: string;
  admin: string;
  action: string;
  target: string;
  ip: string;
}

export interface WalletLog {
  date: string;
  detail: string;
}

export function useAdminLogs() {
  const [adminLogs, setAdminLogs] = useState<AdminLog[]>([]);
  const [walletLogs, setWalletLogs] = useState<WalletLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAdminLogs([
        { timestamp: "2025-12-19 10:00", admin: "superadmin", action: "Freeze Account", target: "Jane Doe", ip: "192.168.1.10" }
      ]);
      setWalletLogs([
        { date: "2025-12-19", detail: "1,000 USDT moved from Hot to Cold" }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return { adminLogs, walletLogs, loading };
}
