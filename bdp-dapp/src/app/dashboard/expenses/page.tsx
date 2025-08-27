'use client';

import { useState } from 'react';
import { WalletConnect } from '@/components/WalletConnect';
import { ExpenseChart } from '@/components/ExpenseChart';

export default function Expenses() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div>
      {isConnected ? (
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Track Expenses</h1>
          <ExpenseChart />
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg mb-4">Please connect your wallet to track expenses.</p>
          <WalletConnect />
        </div>
      )}
    </div>
  );
}