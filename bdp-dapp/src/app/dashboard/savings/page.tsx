'use client';

import { useState } from 'react';
import { WalletConnect } from '@/components/WalletConnect';
import { SavingsChart } from '@/components/SavingsChart';

export default function Savings() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div>
      {isConnected ? (
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Savings</h1>
          <SavingsChart />
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg mb-4">Please connect your wallet to view savings.</p>
          <WalletConnect />
        </div>
      )}
    </div>
  );
}