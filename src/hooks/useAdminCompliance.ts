import { useState, useEffect } from "react";

export interface AdminKYCItem {
  id: string;
  user: string;
  status: "Pending" | "Approved" | "Rejected";
  documents: string[];
}

export interface AdminAMLItem {
  user: string;
  flag: string;
}

export function useAdminCompliance() {
  const [kycQueue, setKycQueue] = useState<AdminKYCItem[]>([]);
  const [amlFlags, setAmlFlags] = useState<AdminAMLItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setKycQueue([
        { id: "1", user: "Jane Doe", status: "Pending", documents: ["ID", "Selfie"] },
        { id: "2", user: "John Smith", status: "Pending", documents: ["ID"] }
      ]);
      setAmlFlags([
        { user: "Jane Doe", flag: "No suspicious activity" },
        { user: "John Smith", flag: "Flagged - High velocity" }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return { kycQueue, amlFlags, loading };
}
