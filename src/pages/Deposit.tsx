import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, CreditCard, Building2, ArrowRight, Check, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockExchangeRates } from "@/data/mockData";

const paymentMethods = [
  { id: "mpesa", name: "M-Pesa", icon: Smartphone, description: "Instant mobile money" },
  { id: "card", name: "Card", icon: CreditCard, description: "Visa, Mastercard" },
  { id: "bank", name: "Bank Transfer", icon: Building2, description: "Direct bank deposit" },
];

const currencies = [
  { code: "KES", name: "Kenyan Shilling", flag: "🇰🇪" },
  { code: "NGN", name: "Nigerian Naira", flag: "🇳🇬" },
  { code: "UGX", name: "Ugandan Shilling", flag: "🇺🇬" },
];

export default function Deposit() {
  const [step, setStep] = useState<"method" | "amount" | "confirm" | "success">("method");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [amount, setAmount] = useState("");

  const exchangeRate = mockExchangeRates[selectedCurrency.code as keyof typeof mockExchangeRates] || 129;
  const stablecoinAmount = parseFloat(amount || "0") / exchangeRate;

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <Header />

      <main className="container py-6 max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {step === "method" && (
            <motion.div
              key="method"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-2xl font-bold text-foreground">Add Money</h1>
                <p className="text-muted-foreground">Choose how to deposit funds</p>
              </div>

              <Card variant="default">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <motion.div
                        key={method.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedMethod(method.id);
                          setStep("amount");
                        }}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                          selectedMethod === method.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30"
                        )}
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{method.name}</p>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === "amount" && (
            <motion.div
              key="amount"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-2xl font-bold text-foreground">Enter Amount</h1>
                <p className="text-muted-foreground">
                  Depositing via {paymentMethods.find((m) => m.id === selectedMethod)?.name}
                </p>
              </div>

              <Card variant="wallet" className="p-6">
                <div className="flex gap-3 mb-4">
                  {currencies.map((currency) => (
                    <Button
                      key={currency.code}
                      variant={selectedCurrency.code === currency.code ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCurrency(currency)}
                      className="flex-1"
                    >
                      {currency.flag} {currency.code}
                    </Button>
                  ))}
                </div>

                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground mb-2">You deposit</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold text-foreground">{selectedCurrency.code}</span>
                    <Input
                      type="number"
                      placeholder="0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="text-3xl font-bold text-center border-0 bg-transparent w-32 focus-visible:ring-0 p-0"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-muted-foreground my-4">
                  <RefreshCw className="h-4 w-4" />
                  <span className="text-sm">1 USDC = {exchangeRate} {selectedCurrency.code}</span>
                </div>

                <div className="text-center p-4 rounded-xl bg-success/10 border border-success/20">
                  <p className="text-sm text-muted-foreground mb-1">You receive</p>
                  <p className="text-2xl font-bold text-success">
                    {stablecoinAmount.toFixed(2)} USDC
                  </p>
                </div>
              </Card>

              <div className="grid grid-cols-4 gap-3">
                {[1000, 5000, 10000, 20000].map((preset) => (
                  <Button
                    key={preset}
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(preset.toString())}
                    className={cn(
                      amount === preset.toString() && "border-primary bg-primary/10"
                    )}
                  >
                    {(preset / 1000).toFixed(0)}K
                  </Button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("method")} className="flex-1">
                  Back
                </Button>
                <Button
                  variant="hero"
                  onClick={() => setStep("confirm")}
                  disabled={!amount || parseFloat(amount) <= 0}
                  className="flex-1"
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {step === "confirm" && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground">Confirm Deposit</h1>
                <p className="text-muted-foreground">Review your transaction</p>
              </div>

              <Card variant="wallet" className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-muted-foreground">Deposit Amount</span>
                    <span className="font-semibold text-foreground">
                      {selectedCurrency.code} {parseFloat(amount).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-muted-foreground">Exchange Rate</span>
                    <span className="font-medium text-foreground">
                      1 USDC = {exchangeRate} {selectedCurrency.code}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span className="font-medium text-foreground">0.5%</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-muted-foreground">You Receive</span>
                    <span className="text-xl font-bold text-success">
                      {(stablecoinAmount * 0.995).toFixed(2)} USDC
                    </span>
                  </div>
                </div>
              </Card>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("amount")} className="flex-1">
                  Back
                </Button>
                <Button variant="hero" onClick={() => setStep("success")} className="flex-1">
                  Confirm Deposit
                </Button>
              </div>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="flex justify-center"
              >
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-success/10 animate-pulse-glow">
                  <Check className="h-12 w-12 text-success" />
                </div>
              </motion.div>

              <div>
                <h1 className="text-2xl font-bold text-foreground">Deposit Successful!</h1>
                <p className="text-muted-foreground mt-2">
                  Your stablecoins have been added to your wallet.
                </p>
              </div>

              <Card variant="default" className="p-4 text-left">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Deposited</span>
                    <span className="font-medium">{selectedCurrency.code} {parseFloat(amount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Received</span>
                    <span className="font-medium text-success">{(stablecoinAmount * 0.995).toFixed(2)} USDC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transaction ID</span>
                    <span className="font-medium font-mono">WP-2024-ABC123</span>
                  </div>
                </div>
              </Card>

              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={() => {
                  setStep("method");
                  setAmount("");
                  setSelectedMethod(null);
                }}
              >
                Done
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BottomNav />
    </div>
  );
}
