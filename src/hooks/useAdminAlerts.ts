import { useState, useEffect } from "react";

export interface AdminAlert {
  id: string;
  type: string;
  message: string;
  status: "New" | "Acknowledged" | "Resolved";
}

export function useAdminAlerts() {
  const [alerts, setAlerts] = useState<AdminAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAlerts([
        { id: "1", type: "Large Transaction", message: "User Jane Doe sent 10,000 USDT", status: "New" },
        { id: "2", type: "Liquidity Shortage", message: "Hot wallet below threshold", status: "New" }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  function acknowledgeAlert(id: string) {
    setAlerts(alerts => alerts.map(a => a.id === id ? { ...a, status: "Acknowledged" } : a));
  }
  function resolveAlert(id: string) {
    setAlerts(alerts => alerts.map(a => a.id === id ? { ...a, status: "Resolved" } : a));
  }

  return { alerts, loading, acknowledgeAlert, resolveAlert };
}
