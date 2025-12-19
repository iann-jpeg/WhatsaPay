import React from "react";

interface DashboardCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color?: string;
  trend?: string;
  sublabel?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, label, value, color = "blue", trend, sublabel }) => (
  <div className={`bg-gradient-to-br from-white to-${color}-50 shadow-lg rounded-xl p-6 flex items-center gap-4 hover:shadow-2xl transition group`}>
    <div className={`bg-${color}-100 p-3 rounded-full group-hover:scale-110 transition-transform`}>{icon}</div>
    <div>
      <div className="text-gray-500 text-sm">{label}</div>
      <div className="text-3xl font-extrabold text-gray-900 animate-count">{value}</div>
      {trend && <div className="text-xs text-green-600 mt-1">{trend}</div>}
      {sublabel && <div className="text-xs text-gray-400 mt-1">{sublabel}</div>}
    </div>
  </div>
);

export default DashboardCard;
