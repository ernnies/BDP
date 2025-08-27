'use client';

import Link from 'next/link';
import { HomeIcon, ChartBarIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';

export function Sidebar() {
  return (
    <aside className="w-64 bg-secondary h-screen p-4">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className="flex items-center p-2 hover:bg-accent hover:text-primary rounded">
              <HomeIcon className="w-6 h-6 mr-2" /> Dashboard
            </Link>
          </li>
          <li>
            <Link href="/dashboard/expenses" className="flex items-center p-2 hover:bg-accent hover:text-primary rounded">
              <ChartBarIcon className="w-6 h-6 mr-2" /> Track Expenses
            </Link>
          </li>
          <li>
            <Link href="/dashboard/savings" className="flex items-center p-2 hover:bg-accent hover:text-primary rounded">
              <CurrencyDollarIcon className="w-6 h-6 mr-2" /> Savings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}