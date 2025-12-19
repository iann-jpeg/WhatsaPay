
import React, { useState } from "react";
import { useAdminWallets } from "../../hooks/useAdminWallets";

const AdminWallets: React.FC = () => {
  const { wallets, kesLiquidity, loading } = useAdminWallets();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [txStatus, setTxStatus] = useState<string | null>(null);

  function handleTransfer(e: React.FormEvent) {
    e.preventDefault();
    setTxStatus("Transfer submitted (simulated)");
    setRecipient("");
    setAmount("");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Wallet & Funds Management</h1>
      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading wallets...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {wallets.map(w => (
              <div key={w.type} className="bg-white p-4 rounded shadow">
                <div className="text-gray-500">{w.type} Wallet Balance</div>
                <div className="text-xl font-bold">{w.balance.toLocaleString()} USDT</div>
                <div className="text-xs text-gray-400 mt-1">{w.address}</div>
              </div>
            ))}
            <div className="bg-white p-4 rounded shadow">
              <div className="text-gray-500">KES Liquidity</div>
              <div className="text-xl font-bold">{kesLiquidity.toLocaleString()} KES</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow mb-4">
            <h2 className="font-semibold mb-2">Wallet Addresses</h2>
            <ul className="list-disc pl-6">
              {wallets.map(w => (
                <li key={w.type}>{w.type} Wallet: {w.address}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">Manual USDT Transfer</h2>
            <form className="flex flex-col gap-2" onSubmit={handleTransfer}>
              <input className="border p-2 rounded" placeholder="Recipient Address" value={recipient} onChange={e => setRecipient(e.target.value)} required />
              <input className="border p-2 rounded" placeholder="Amount (USDT)" type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
              <button className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
            </form>
            {txStatus && <div className="mt-2 text-green-600">{txStatus}</div>}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminWallets;
