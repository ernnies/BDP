'use client';

import { useState, useEffect } from 'react';
import { getWallet, citreaConfig } from '@/lib/citrea';
import { ethers } from 'ethers';
import { WalletState } from '@/lib/types';

export function WalletConnect() {
  const [wallet, setWallet] = useState<WalletState>({ address: null, isConnected: false });

  const connectWallet = async () => {
    try {
      const signer = await getWallet();
      const address = await signer.getAddress();
      setWallet({ address, isConnected: true });
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  const disconnectWallet = () => {
    setWallet({ address: null, isConnected: false });
  };

  useEffect(() => {
    const checkNetwork = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const { chainId } = await provider.getNetwork();
        if (Number(chainId) !== citreaConfig.chainId) {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: `0x${citreaConfig.chainId.toString(16)}` }],
            });
          } catch (error) {
            console.error('Failed to switch network:', error);
          }
        }
      }
    };
    checkNetwork();
  }, []);

  return (
    <button
      onClick={wallet.isConnected ? disconnectWallet : connectWallet}
      className="bg-accent text-primary px-4 py-2 rounded hover:bg-yellow-400 transition"
    >
      {wallet.isConnected ? `Disconnect (${wallet.address?.slice(0, 6)}...${wallet.address?.slice(-4)})` : 'Connect Wallet'}
    </button>
  );
}