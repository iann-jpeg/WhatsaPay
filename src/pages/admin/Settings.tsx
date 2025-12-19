
import React from "react";
import { useAdminAlerts } from "../../hooks/useAdminAlerts";

const AdminSettings: React.FC = () => {
  const { alerts, loading, acknowledgeAlert, resolveAlert } = useAdminAlerts();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Settings & Alerts</h1>
      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="font-semibold mb-2">Notification Settings</h2>
        <form className="flex flex-col gap-2 max-w-md">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-blue-600" />
            Email alerts for large transactions
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-blue-600" />
            SMS alerts for failed payouts
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-blue-600" />
            Dashboard alerts for liquidity shortages
          </label>
        </form>
      </div>
      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="font-semibold mb-2">Admin Alerts</h2>
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading alerts...</div>
        ) : alerts.length === 0 ? (
          <div className="text-center py-4 text-gray-400">No alerts</div>
        ) : (
          <ul className="divide-y">
            {alerts.map(alert => (
              <li key={alert.id} className="py-2 flex items-center justify-between">
                <div>
                  <span className="font-semibold">[{alert.type}]</span> {alert.message}
                  <span className="ml-2 text-xs text-gray-500">({alert.status})</span>
                </div>
                <div className="space-x-2">
                  {alert.status === "New" && <button className="px-2 py-1 bg-yellow-100 rounded" onClick={() => acknowledgeAlert(alert.id)}>Acknowledge</button>}
                  {alert.status !== "Resolved" && <button className="px-2 py-1 bg-green-100 rounded" onClick={() => resolveAlert(alert.id)}>Resolve</button>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Security Settings</h2>
        <ul className="list-disc pl-6">
          <li>2FA: Enabled</li>
          <li>IP Allowlisting: Enabled</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSettings;
