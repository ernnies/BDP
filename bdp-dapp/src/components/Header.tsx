'use client';

import { useState } from 'react';
import { WalletConnect } from './WalletConnect';

export function Header() {
  return (
    <header className="bg-secondary p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">BDP</h1>
      <WalletConnect />
    </header>
  );
}