import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  User, 
  Shield, 
  CreditCard, 
  Bell, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: User, label: "Personal Information", path: "/profile/personal" },
  { icon: Shield, label: "Security & PIN", path: "/profile/security", badge: "Enabled" },
  { icon: CreditCard, label: "Payment Methods", path: "/profile/payments" },
  { icon: Bell, label: "Notifications", path: "/profile/notifications" },
  { icon: HelpCircle, label: "Help & Support", path: "/profile/support" },
];

export default function Profile() {
  const kycStatus = "verified"; // verified, pending, unverified

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <Header />

      <main className="container py-6 max-w-lg mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-full gradient-primary text-primary-foreground text-3xl font-bold">
                AK
              </div>
              <div className={cn(
                "absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-background",
                kycStatus === "verified" ? "bg-success" : kycStatus === "pending" ? "bg-warning" : "bg-muted"
              )}>
                {kycStatus === "verified" ? (
                  <CheckCircle2 className="h-4 w-4 text-success-foreground" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-warning-foreground" />
                )}
              </div>
            </div>
          </div>
          <h1 className="text-xl font-bold text-foreground">Alex Kamau</h1>
          <p className="text-muted-foreground">+254 712 345 678</p>
          <div className={cn(
            "inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full text-xs font-medium",
            kycStatus === "verified" 
              ? "bg-success/10 text-success" 
              : kycStatus === "pending"
              ? "bg-warning/10 text-warning"
              : "bg-muted text-muted-foreground"
          )}>
            {kycStatus === "verified" ? (
              <>
                <CheckCircle2 className="h-3 w-3" />
                KYC Verified
              </>
            ) : kycStatus === "pending" ? (
              <>
                <AlertCircle className="h-3 w-3" />
                KYC Pending
              </>
            ) : (
              <>
                <AlertCircle className="h-3 w-3" />
                Complete KYC
              </>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card variant="default">
            <CardContent className="p-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-secondary cursor-pointer transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                      <Icon className="h-5 w-5 text-foreground" />
                    </div>
                    <span className="flex-1 font-medium text-foreground">{item.label}</span>
                    {item.badge && (
                      <span className="text-xs px-2 py-1 rounded-full bg-success/10 text-success">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card variant="default">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Account Limits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Daily Send Limit</span>
                    <span className="font-medium text-foreground">$500 / $1,000</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full w-1/2 gradient-primary rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Monthly Deposit</span>
                    <span className="font-medium text-foreground">$2,500 / $10,000</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full w-1/4 gradient-primary rounded-full" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button variant="outline" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </motion.div>

        <p className="text-center text-xs text-muted-foreground">
          WhatsPay v1.0.0 • Terms • Privacy
        </p>
      </main>

      <BottomNav />
    </div>
  );
}
