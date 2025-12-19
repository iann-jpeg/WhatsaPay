import { useState, useEffect } from "react";

export interface AdminConversion {
  id: string;
  user: string;
  usdt: number;
  kes: number;
  status: "Pending" | "Approved" | "Rejected";
}

export function useAdminConversions() {
  const [conversions, setConversions] = useState<AdminConversion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setConversions([
        { id: "1", user: "Jane Doe", usdt: 100, kes: 14000, status: "Pending" },
        { id: "2", user: "John Smith", usdt: 50, kes: 7000, status: "Approved" },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return { conversions, loading };
}
