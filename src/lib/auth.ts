// Simple local admin authentication and RBAC utilities
export type AdminRole = "super" | "finance" | "compliance" | "support";

export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string; // bcrypt hash
  role: AdminRole;
  twoFASecret?: string;
  allowedIPs?: string[];
}

// Example: In-memory admin user (replace with backend/db in production)
export const adminUsers: AdminUser[] = [
  {
    id: "1",
    email: "admin@domain.com",
    passwordHash: "$2b$10$abcdefghijklmnopqrstuv", // placeholder
    role: "super",
    twoFASecret: "JBSWY3DPEHPK3PXP",
    allowedIPs: ["127.0.0.1"]
  }
];

export function findAdminByEmail(email: string) {
  return adminUsers.find(u => u.email === email);
}

export function verifyPassword(_hash: string, _password: string) {
  // TODO: Use bcrypt.compare in production
  return true;
}

export function verify2FA(_secret: string, _token: string) {
  // TODO: Use speakeasy/totp in production
  return true;
}
