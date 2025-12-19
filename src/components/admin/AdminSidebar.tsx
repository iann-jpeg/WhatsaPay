import React from "react";
import { NavLink } from "react-router-dom";

const menu = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "Users", path: "/admin/users" },
  { label: "Wallets", path: "/admin/wallets" },
  { label: "Conversions", path: "/admin/conversions" },
  { label: "Payouts", path: "/admin/payouts" },
  { label: "Compliance", path: "/admin/compliance" },
  { label: "Finance", path: "/admin/finance" },
  { label: "Logs", path: "/admin/logs" },
  { label: "Settings", path: "/admin/settings" },
];

const AdminSidebar: React.FC = () => (
  <aside className="w-64 bg-white border-r flex flex-col">
    <div className="h-16 flex items-center justify-center font-bold text-lg border-b">Admin</div>
    <nav className="flex-1 p-4 space-y-2">
      {menu.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `block px-4 py-2 rounded hover:bg-gray-100 ${isActive ? "bg-gray-200 font-semibold" : ""}`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default AdminSidebar;
