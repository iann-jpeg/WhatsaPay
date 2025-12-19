import { User, ShieldCheck, Wallet, TrendingUp, AlertCircle, CheckCircle, XCircle, Banknote, Activity } from "lucide-react";

export const icons = {
  users: <User className="w-6 h-6" />,
  kyc: <ShieldCheck className="w-6 h-6" />,
  hotWallet: <Wallet className="w-6 h-6 text-orange-500" />,
  coldWallet: <Wallet className="w-6 h-6 text-blue-500" />,
  liquidity: <Banknote className="w-6 h-6 text-green-500" />,
  conversions: <TrendingUp className="w-6 h-6 text-purple-500" />,
  failed: <XCircle className="w-6 h-6 text-red-500" />,
  health: <Activity className="w-6 h-6 text-green-600" />,
  alert: <AlertCircle className="w-6 h-6 text-yellow-500" />,
  ok: <CheckCircle className="w-6 h-6 text-green-500" />,
};
