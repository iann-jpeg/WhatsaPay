import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Send from "./pages/Send";
import Deposit from "./pages/Deposit";
import History from "./pages/History";
import Claim from "./pages/Claim";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AdminLayout from "./pages/admin/index";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminWallets from "./pages/admin/Wallets";
import AdminConversions from "./pages/admin/Conversions";
import AdminCompliance from "./pages/admin/Compliance";
import AdminFinance from "./pages/admin/Finance";
import AdminLogs from "./pages/admin/Logs";
import AdminSettings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<Send />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/history" element={<History />} />
          <Route path="/claim/:id?" element={<Claim />} />
          <Route path="/profile" element={<Profile />} />
          {/* Admin Section */}
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="wallets" element={<AdminWallets />} />
            <Route path="conversions" element={<AdminConversions />} />
            <Route path="payouts" element={<div>Payouts module coming soon</div>} />
            <Route path="compliance" element={<AdminCompliance />} />
            <Route path="finance" element={<AdminFinance />} />
            <Route path="logs" element={<AdminLogs />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
