import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MessageCircle, Copy, Check, ArrowRight, Users } from "lucide-react";
import { mockContacts } from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function Send() {
  const [step, setStep] = useState<"select" | "amount" | "confirm" | "success">("select");
  const [selectedContact, setSelectedContact] = useState<typeof mockContacts[0] | null>(null);
  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = mockContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://whatspay.app/claim/abc123`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendWhatsApp = () => {
    const message = encodeURIComponent(
      `Hey! I'm sending you $${amount} via WhatsPay. Click to claim: https://whatspay.app/claim/abc123`
    );
    window.open(`https://wa.me/${selectedContact?.phone.replace(/\s/g, "")}?text=${message}`, "_blank");
    setStep("success");
  };

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <Header />

      <main className="container py-6 max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {step === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-2xl font-bold text-foreground">Send Stablecoins</h1>
                <p className="text-muted-foreground">Choose a contact or enter a number</p>
              </div>

              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search contacts or enter phone..."
                  className="pl-12 h-12 rounded-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Card variant="default">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Recent Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {filteredContacts.map((contact) => (
                    <motion.div
                      key={contact.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedContact(contact);
                        setStep("amount");
                      }}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary cursor-pointer transition-colors"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-primary text-primary-foreground font-semibold">
                        {contact.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.phone}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === "amount" && selectedContact && (
            <motion.div
              key="amount"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full gradient-primary text-primary-foreground text-2xl font-bold">
                    {selectedContact.avatar}
                  </div>
                </div>
                <h1 className="text-xl font-bold text-foreground">Send to {selectedContact.name}</h1>
                <p className="text-muted-foreground">{selectedContact.phone}</p>
              </div>

              <Card variant="wallet" className="p-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Enter Amount</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-4xl font-bold text-foreground">$</span>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="text-4xl font-bold text-center border-0 bg-transparent w-40 focus-visible:ring-0 p-0"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    ≈ KES {(parseFloat(amount || "0") * 129).toLocaleString()}
                  </p>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-secondary">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Network Fee</span>
                    <span className="text-foreground">$0.10</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-semibold text-foreground">
                      ${(parseFloat(amount || "0") + 0.10).toFixed(2)}
                    </span>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-4 gap-3">
                {[25, 50, 100, 200].map((preset) => (
                  <Button
                    key={preset}
                    variant="outline"
                    onClick={() => setAmount(preset.toString())}
                    className={cn(
                      "h-12",
                      amount === preset.toString() && "border-primary bg-primary/10"
                    )}
                  >
                    ${preset}
                  </Button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("select")} className="flex-1">
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

          {step === "confirm" && selectedContact && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground">Confirm Transfer</h1>
                <p className="text-muted-foreground">Send via WhatsApp</p>
              </div>

              <Card variant="wallet" className="p-6 text-center">
                <p className="text-5xl font-bold text-foreground mb-2">${amount}</p>
                <p className="text-muted-foreground">to {selectedContact.name}</p>
              </Card>

              <Card variant="default" className="p-4">
                <p className="text-sm text-muted-foreground mb-3">Share Link</p>
                <div className="flex gap-2">
                  <Input
                    readOnly
                    value="https://whatspay.app/claim/abc123"
                    className="text-sm bg-secondary"
                  />
                  <Button variant="outline" size="icon" onClick={handleCopyLink}>
                    {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </Card>

              <Button variant="whatsapp" size="lg" className="w-full" onClick={handleSendWhatsApp}>
                <MessageCircle className="h-5 w-5" />
                Send via WhatsApp
              </Button>

              <Button variant="outline" onClick={() => setStep("amount")} className="w-full">
                Back
              </Button>
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
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-success/10">
                  <Check className="h-12 w-12 text-success" />
                </div>
              </motion.div>

              <div>
                <h1 className="text-2xl font-bold text-foreground">Transfer Initiated!</h1>
                <p className="text-muted-foreground mt-2">
                  {selectedContact?.name} will receive a WhatsApp message with the claim link.
                </p>
              </div>

              <Card variant="default" className="p-4 text-left">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-medium">${amount} USDC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Recipient</span>
                    <span className="font-medium">{selectedContact?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="text-warning font-medium">Pending Claim</span>
                  </div>
                </div>
              </Card>

              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={() => {
                  setStep("select");
                  setAmount("");
                  setSelectedContact(null);
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
