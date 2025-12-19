
import React, { useState } from "react";
import { useAdminUsers } from "../../hooks/useAdminUsers";

const AdminUsers: React.FC = () => {
  const { users, loading } = useAdminUsers();
  const [search, setSearch] = useState("");
  const [kyc, setKyc] = useState("");
  const [risk, setRisk] = useState("");

  const filtered = users.filter(u =>
    (!search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())) &&
    (!kyc || u.kyc === kyc) &&
    (!risk || u.risk === risk)
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="bg-white p-4 rounded shadow mb-4 flex flex-wrap gap-4">
        <input className="border p-2 rounded" placeholder="Search by name, email, phone" value={search} onChange={e => setSearch(e.target.value)} />
        <select className="border p-2 rounded" value={kyc} onChange={e => setKyc(e.target.value)}>
          <option value="">KYC Status</option>
          <option value="Complete">Complete</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select className="border p-2 rounded" value={risk} onChange={e => setRisk(e.target.value)}>
          <option value="">Risk Score</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading users...</div>
      ) : (
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">KYC</th>
              <th className="p-2 text-left">Risk</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} className="border-b">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.kyc}</td>
                <td className="p-2">{u.risk}</td>
                <td className="p-2">{u.status}</td>
                <td className="p-2 space-x-2">
                  <button className="px-2 py-1 bg-blue-100 rounded">View</button>
                  {u.status === "Active" ? (
                    <button className="px-2 py-1 bg-yellow-100 rounded">Freeze</button>
                  ) : (
                    <button className="px-2 py-1 bg-green-100 rounded">Unfreeze</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;
