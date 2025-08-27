'use client';

import { useState, useEffect } from 'react';
import { WalletConnect } from '@/components/WalletConnect';
import { ExpenseChart } from '@/components/ExpenseChart';
import { SavingsChart } from '@/components/SavingsChart';
import { getSyncStatus, getLatestBlock } from '@/lib/citrea';
import { SyncStatus, Block } from '@/lib/types';

export default function Dashboard() {
  const [isConnected, setIsConnected] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus | null>(null);
  const [latestBlock, setLatestBlock] = useState<Block | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const status = await getSyncStatus();
        const block = await getLatestBlock();
        setSyncStatus(status);
        setLatestBlock(block);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {isConnected ? (
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="grid grid-cols-2 gap-6">
            <ExpenseChart />
            <SavingsChart />
          </div>
          <div className="bg-secondary p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Citrea Network Status</h2>
            <p>L1 Status: {syncStatus?.l1Status.Synced ? `Synced at ${syncStatus.l1Status.Synced}` : 'Syncing...'}</p>
            <p>L2 Status: {syncStatus?.l2Status.Synced ? `Synced at ${syncStatus.l2Status.Synced}` : 'Syncing...'}</p>
            <p>Latest Block: {latestBlock?.header.height || 'Loading...'}</p>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg mb-4">Please connect your wallet to access the dashboard.</p>
          <WalletConnect />
        </div>
      )}
    </div>
  );
}