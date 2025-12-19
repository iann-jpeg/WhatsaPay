import { useState, useEffect } from "react";

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  kyc: "Complete" | "Pending" | "Rejected";
  risk: "Low" | "Medium" | "High";
  status: "Active" | "Frozen";
}

export function useAdminUsers() {
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers([
        { id: "1", name: "Jane Doe", email: "jane@example.com", kyc: "Complete", risk: "Low", status: "Active" },
        { id: "2", name: "John Smith", email: "john@example.com", kyc: "Pending", risk: "Medium", status: "Active" },
        { id: "3", name: "Alice Kimani", email: "alice@example.com", kyc: "Rejected", risk: "High", status: "Frozen" },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return { users, loading };
}
