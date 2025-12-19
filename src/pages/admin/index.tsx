
import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import RequireAdminAuth from "../../components/admin/RequireAdminAuth";

const AdminLayout: React.FC = () => (
  <RequireAdminAuth>
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  </RequireAdminAuth>
);

export default AdminLayout;
