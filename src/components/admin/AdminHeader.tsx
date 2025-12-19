import React from "react";

const AdminHeader: React.FC = () => (
  <header className="h-16 bg-white border-b flex items-center px-6 justify-between">
    <div className="font-semibold text-xl">Admin Dashboard</div>
    <div className="flex items-center space-x-4">
      {/* Placeholder for admin user info, notifications, etc. */}
      <span className="text-gray-600">admin@domain.com</span>
      <button className="px-3 py-1 bg-gray-200 rounded">Logout</button>
    </div>
  </header>
);

export default AdminHeader;
