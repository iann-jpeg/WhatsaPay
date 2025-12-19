
import React from "react";
import { useAdminFinance } from "../../hooks/useAdminFinance";

const AdminFinance: React.FC = () => {
  const { stats, loading } = useAdminFinance();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Financial & Accounting</h1>
      {loading || !stats ? (
        <div className="text-center py-8 text-gray-500">Loading finance data...</div>
      ) : (
        <>
          <div className="bg-white p-4 rounded shadow mb-4">
            <h2 className="font-semibold mb-2">Platform Revenue</h2>
            <div className="text-xl font-bold mb-2">KES {stats.revenue.toLocaleString()}</div>
            <div className="text-gray-500">Last 30 days</div>
          </div>
          <div className="bg-white p-4 rounded shadow mb-4">
            <h2 className="font-semibold mb-2">Fee Breakdown</h2>
            <ul className="list-disc pl-6">
              {stats.feeBreakdown.map(f => (
                <li key={f.type}>{f.type}: {f.value}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">Daily Reconciliation</h2>
            <ul className="list-disc pl-6">
              {stats.reconciliation.map(r => (
                <li key={r.date}>{r.date}: {r.status}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminFinance;
