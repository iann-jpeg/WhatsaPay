import { useState } from "react";
import { findAdminByEmail, verifyPassword, verify2FA, AdminUser } from "../lib/auth";

export function useAdminAuth() {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"login" | "2fa" | "done">("login");
  const [pendingUser, setPendingUser] = useState<AdminUser | null>(null);

  function login(email: string, password: string) {
    const user = findAdminByEmail(email);
    if (!user) {
      setError("User not found");
      return false;
    }
    if (!verifyPassword(user.passwordHash, password)) {
      setError("Invalid password");
      return false;
    }
    setPendingUser(user);
    setStep("2fa");
    setError(null);
    return true;
  }

  function verify2fa(token: string) {
    if (!pendingUser) return false;
    if (!verify2FA(pendingUser.twoFASecret || "", token)) {
      setError("Invalid 2FA token");
      return false;
    }
    setAdmin(pendingUser);
    setPendingUser(null);
    setStep("done");
    setError(null);
    return true;
  }

  function logout() {
    setAdmin(null);
    setStep("login");
    setError(null);
  }

  return { admin, error, step, login, verify2fa, logout };
}
