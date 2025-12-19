

import React from "react";
import { useAdminStats } from "../../hooks/useAdminStats";
import DashboardCard from "../../components/admin/DashboardCard";
import { icons } from "../../components/admin/icons";
import { useAdminChartData } from "../../hooks/useAdminChartData";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const AdminDashboard: React.FC = () => {
  const { stats, loading } = useAdminStats();
  const { userGrowth, liquidityTrend } = useAdminChartData();
  const [darkMode, setDarkMode] = React.useState(false);

  if (loading || !stats) {
    return <div className="text-center py-12 text-gray-500">Loading dashboard...</div>;
  }

  return (
    <div className={darkMode ? "dark bg-gray-900 min-h-screen text-gray-100" : "bg-gray-50 min-h-screen text-gray-900"}>
      <div className="flex flex-col gap-8 p-2 md:p-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
          <div>
            <h1 className="text-3xl font-extrabold mb-1">Welcome back, <span className="text-blue-700 dark:text-blue-300">Admin</span></h1>
            <div className="text-gray-500 dark:text-gray-400 text-sm">Executive Overview &mdash; {new Date().toLocaleDateString()}</div>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">Quick Action</button>
            <button className={darkMode ? "bg-gray-700 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-800 transition" : "bg-gray-200 px-4 py-2 rounded-lg shadow hover:bg-gray-300 transition"} onClick={() => setDarkMode(!darkMode)}>{darkMode ? "Light Mode" : "Dark Mode"}</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard icon={icons.users} label="Total Users" value={stats.totalUsers} color="blue" trend="+2.5% this week" />
          <DashboardCard icon={icons.kyc} label="KYC Complete" value={stats.kycComplete} color="green" trend="+1.2%" />
          <DashboardCard icon={icons.hotWallet} label="USDT Hot Wallet" value={stats.usdtHot + ' USDT'} color="orange" />
          <DashboardCard icon={icons.coldWallet} label="USDT Cold Wallet" value={stats.usdtCold + ' USDT'} color="blue" />
          <DashboardCard icon={icons.liquidity} label="KES Liquidity" value={stats.kesLiquidity.toLocaleString() + ' KES'} color="green" />
          <DashboardCard icon={icons.conversions} label="Pending Conversions" value={stats.pendingConversions} color="purple" />
          <DashboardCard icon={icons.failed} label="Failed Transactions" value={stats.failedTx} color="red" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="font-semibold mb-2">User Growth (7 days)</div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={userGrowth} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#2563eb" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="font-semibold mb-2">KES Liquidity Trend</div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={liquidityTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Line type="monotone" dataKey="kes" stroke="#16a34a" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex items-center gap-4 mt-6">
          <div className="flex items-center gap-2">
            {stats.systemHealth === 'All systems green' ? icons.ok : icons.alert}
            <span className={`font-semibold text-lg ${stats.systemHealth === 'All systems green' ? 'text-green-700 dark:text-green-400' : 'text-yellow-700 dark:text-yellow-400'}`}>System Health</span>
          </div>
          <span className="ml-4 text-lg">{stats.systemHealth}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
