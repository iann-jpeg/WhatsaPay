import React, { useState } from "react";
import AdminLogin from "../../pages/admin/Login";
import { useAdminAuth } from "../../hooks/useAdminAuth";

const RequireAdminAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { admin, step } = useAdminAuth();
  const [loginSuccess, setLoginSuccess] = useState(false);

  if (!admin && !loginSuccess) {
    return <AdminLogin onSuccess={() => setLoginSuccess(true)} />;
  }
  // Optionally, add IP allowlist and role checks here
  return <>{children}</>;
};

export default RequireAdminAuth;
