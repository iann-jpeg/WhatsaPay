import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { WalletCard } from "@/components/wallet/WalletCard";
import { QuickActions } from "@/components/wallet/QuickActions";
import { TransactionList } from "@/components/transactions/TransactionList";
import { mockTransactions } from "@/data/mockData";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <Header />
      
      <main className="container py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-2"
        >
          <h1 className="text-2xl font-bold text-foreground">Welcome back, Alex!</h1>
          <p className="text-muted-foreground">Here's your wallet overview</p>
        </motion.div>

        <WalletCard 
          balance={1250.00} 
          currency="USDC" 
          localBalance={161250} 
          localCurrency="KES" 
        />

        <QuickActions />

        <TransactionList 
          transactions={mockTransactions} 
          showViewAll={true}
          limit={4}
        />
      </main>

      <BottomNav />
    </div>
  );
}
