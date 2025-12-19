
import React, { useState } from "react";
import { useAdminCompliance } from "../../hooks/useAdminCompliance";

const AdminCompliance: React.FC = () => {
  const { kycQueue, amlFlags, loading } = useAdminCompliance();
  const [actionStatus, setActionStatus] = useState<string | null>(null);

  function handleApprove(id: string) {
    setActionStatus(`KYC ${id} approved (simulated)`);
  }
  function handleReject(id: string) {
    setActionStatus(`KYC ${id} rejected (simulated)`);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Compliance & Risk (AML/KYC)</h1>
      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="font-semibold mb-2">KYC Review Queue</h2>
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading KYC queue...</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">User</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Documents</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {kycQueue.map(item => (
                <tr key={item.id}>
                  <td className="p-2">{item.user}</td>
                  <td className="p-2">{item.status}</td>
                  <td className="p-2">{item.documents.join(", ")}</td>
                  <td className="p-2 space-x-2">
                    {item.status === "Pending" && (
                      <>
                        <button className="px-2 py-1 bg-green-100 rounded" onClick={() => handleApprove(item.id)}>Approve</button>
                        <button className="px-2 py-1 bg-red-100 rounded" onClick={() => handleReject(item.id)}>Reject</button>
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
        <h2 className="font-semibold mb-2">AML Monitoring</h2>
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading AML flags...</div>
        ) : (
          <ul className="list-disc pl-6">
            {amlFlags.map(flag => (
              <li key={flag.user}>{flag.user}: {flag.flag}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminCompliance;
