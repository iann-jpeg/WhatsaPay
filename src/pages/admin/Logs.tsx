
import React from "react";
import { useAdminLogs } from "../../hooks/useAdminLogs";

const AdminLogs: React.FC = () => {
  const { adminLogs, walletLogs, loading } = useAdminLogs();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">System Logs & Audit Trail</h1>
      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="font-semibold mb-2">Admin Actions</h2>
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading logs...</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Timestamp</th>
                <th className="p-2 text-left">Admin</th>
                <th className="p-2 text-left">Action</th>
                <th className="p-2 text-left">Target</th>
                <th className="p-2 text-left">IP</th>
              </tr>
            </thead>
            <tbody>
              {adminLogs.map((log, i) => (
                <tr key={i}>
                  <td className="p-2">{log.timestamp}</td>
                  <td className="p-2">{log.admin}</td>
                  <td className="p-2">{log.action}</td>
                  <td className="p-2">{log.target}</td>
                  <td className="p-2">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Wallet Movement Logs</h2>
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading wallet logs...</div>
        ) : (
          <ul className="list-disc pl-6">
            {walletLogs.map((log, i) => (
              <li key={i}>{log.date}: {log.detail}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminLogs;
