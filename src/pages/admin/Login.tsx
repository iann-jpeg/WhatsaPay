import React, { useState } from "react";
import { useAdminAuth } from "../../hooks/useAdminAuth";

const AdminLogin: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const { step, login, verify2fa, error } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    login(email, password);
  }

  function handle2FA(e: React.FormEvent) {
    e.preventDefault();
    if (verify2fa(token)) onSuccess();
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form className="bg-white p-8 rounded shadow w-96" onSubmit={step === "login" ? handleLogin : handle2FA}>
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        {step === "login" && (
          <>
            <input
              className="border p-2 rounded w-full mb-4"
              placeholder="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              className="border p-2 rounded w-full mb-6"
              placeholder="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
          </>
        )}
        {step === "2fa" && (
          <>
            <input
              className="border p-2 rounded w-full mb-6"
              placeholder="2FA Token"
              value={token}
              onChange={e => setToken(e.target.value)}
              required
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Verify 2FA</button>
          </>
        )}
      </form>
    </div>
  );
};

export default AdminLogin;
