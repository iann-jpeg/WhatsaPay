
import React, { useState } from "react";
import { useAdminConversions } from "../../hooks/useAdminConversions";

const AdminConversions: React.FC = () => {
  const { conversions, loading } = useAdminConversions();
  const [actionStatus, setActionStatus] = useState<string | null>(null);

  function handleApprove(id: string) {
    setActionStatus(`Conversion ${id} approved (simulated)`);
  }
  function handleReject(id: string) {
    setActionStatus(`Conversion ${id} rejected (simulated)`);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Conversion & Payout Management</h1>
      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="font-semibold mb-2">USDT → KES Conversion Queue</h2>
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading conversions...</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">User</th>
                <th className="p-2 text-left">USDT</th>
                <th className="p-2 text-left">KES</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {conversions.map(c => (
                <tr key={c.id}>
                  <td className="p-2">{c.user}</td>
                  <td className="p-2">{c.usdt}</td>
                  <td className="p-2">{c.kes.toLocaleString()}</td>
                  <td className="p-2">{c.status}</td>
                  <td className="p-2 space-x-2">
                    {c.status === "Pending" && (
                      <>
                        <button className="px-2 py-1 bg-green-100 rounded" onClick={() => handleApprove(c.id)}>Approve</button>
                        <button className="px-2 py-1 bg-red-100 rounded" onClick={() => handleReject(c.id)}>Reject</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {actionStatus && <div className="mt-2 text-green-600">{actionStatus}</div>}
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">M-PESA Payout Status</h2>
        <ul className="list-disc pl-6">
          <li>Jane Doe: Success</li>
          <li>John Smith: Failed - Retry</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminConversions;
