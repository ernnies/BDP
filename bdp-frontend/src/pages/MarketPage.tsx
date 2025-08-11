import { useState } from 'react';

// Mock data for 40 currencies with additional details
const mockCurrencies = [
  { name: 'Bitcoin (BTC)', price: '$60,000', change: '+2.5%', volume: '$1.2B', marketCap: '$1.18T' },
  { name: 'Ethereum (ETH)', price: '$3,200', change: '-1.2%', volume: '$450M', marketCap: '$385B' },
  { name: 'Binance Coin (BNB)', price: '$580', change: '+0.8%', volume: '$120M', marketCap: '$90B' },
  { name: 'XRP (XRP)', price: '$0.60', change: '+1.5%', volume: '$80M', marketCap: '$28B' },
  { name: 'Cardano (ADA)', price: '$0.45', change: '-0.3%', volume: '$30M', marketCap: '$16B' },
  { name: 'Solana (SOL)', price: '$150', change: '+3.1%', volume: '$200M', marketCap: '$70B' },
  { name: 'Polkadot (DOT)', price: '$6.50', change: '-0.9%', volume: '$25M', marketCap: '$9B' },
  { name: 'Avalanche (AVAX)', price: '$25', change: '+1.8%', volume: '$40M', marketCap: '$10B' },
  { name: 'Polygon (MATIC)', price: '$0.90', change: '+0.5%', volume: '$35M', marketCap: '$8B' },
  { name: 'Cosmos (ATOM)', price: '$8.20', change: '-1.0%', volume: '$20M', marketCap: '$3B' },
  { name: 'Algorand (ALGO)', price: '$0.18', change: '+0.7%', volume: '$15M', marketCap: '$1.5B' },
  { name: 'Chainlink (LINK)', price: '$14.50', change: '+2.0%', volume: '$30M', marketCap: '$7B' },
  { name: 'Uniswap (UNI)', price: '$7.80', change: '-0.4%', volume: '$18M', marketCap: '$5B' },
  { name: 'Aave (AAVE)', price: '$90', change: '+1.3%', volume: '$12M', marketCap: '$1.3B' },
  { name: 'Maker (MKR)', price: '$2,500', change: '-0.6%', volume: '$10M', marketCap: '$2.3B' },
  { name: 'Tezos (XTZ)', price: '$1.20', change: '+0.9%', volume: '$8M', marketCap: '$1.1B' },
  { name: 'VeChain (VET)', price: '$0.03', change: '-1.5%', volume: '$5M', marketCap: '$2B' },
  { name: 'Stellar (XLM)', price: '$0.12', change: '+0.2%', volume: '$7M', marketCap: '$3B' },
  { name: 'Hedera (HBAR)', price: '$0.08', change: '+1.1%', volume: '$6M', marketCap: '$2.5B' },
  { name: 'Elrond (EGLD)', price: '$40', change: '-0.8%', volume: '$9M', marketCap: '$1B' },
  { name: 'Fantom (FTM)', price: '$0.35', change: '+2.3%', volume: '$15M', marketCap: '$1.2B' },
  { name: 'Harmony (ONE)', price: '$0.02', change: '-1.0%', volume: '$4M', marketCap: '$300M' },
  { name: 'Flow (FLOW)', price: '$0.70', change: '+0.6%', volume: '$5M', marketCap: '$1B' },
  { name: 'Internet Computer (ICP)', price: '$10', change: '-0.5%', volume: '$8M', marketCap: '$4B' },
  { name: 'Filecoin (FIL)', price: '$5.50', change: '+1.4%', volume: '$12M', marketCap: '$10B' },
  { name: 'Theta (THETA)', price: '$1.10', change: '-0.7%', volume: '$6M', marketCap: '$1.1B' },
  { name: 'Holo (HOT)', price: '$0.002', change: '+0.3%', volume: '$3M', marketCap: '$400M' },
  { name: 'Celo (CELO)', price: '$0.75', change: '+1.2%', volume: '$5M', marketCap: '$700M' },
  { name: 'Near (NEAR)', price: '$3.80', change: '-0.9%', volume: '$7M', marketCap: '$4B' },
  { name: 'Arweave (AR)', price: '$12', change: '+2.0%', volume: '$10M', marketCap: '$800M' },
  { name: 'Kava (KAVA)', price: '$2.10', change: '-0.4%', volume: '$4M', marketCap: '$500M' },
  { name: 'Osmosis (OSMO)', price: '$0.90', change: '+0.8%', volume: '$6M', marketCap: '$600M' },
  { name: 'Terra (LUNA)', price: '$0.50', change: '-1.3%', volume: '$5M', marketCap: '$400M' },
  { name: 'Aptos (APT)', price: '$7.20', change: '+1.6%', volume: '$8M', marketCap: '$3B' },
  { name: 'Sui (SUI)', price: '$0.85', change: '+0.5%', volume: '$6M', marketCap: '$2B' },
  { name: 'Optimism (OP)', price: '$1.90', change: '-0.2%', volume: '$7M', marketCap: '$800M' },
  { name: 'Arbitrum (ARB)', price: '$0.70', change: '+1.0%', volume: '$5M', marketCap: '$2.5B' },
  { name: 'Cronos (CRO)', price: '$0.09', change: '-0.6%', volume: '$4M', marketCap: '$2.3B' },
  { name: 'Moonbeam (GLMR)', price: '$0.30', change: '+0.7%', volume: '$3M', marketCap: '$300M' },
  { name: 'Zcash (ZEC)', price: '$30', change: '-1.1%', volume: '$6M', marketCap: '$600M' },
];

const MarketPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'change' | 'volume' | 'marketCap'>('name');

  const filteredCurrencies = mockCurrencies
    .filter((currency) =>
      currency.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price') return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
      if (sortBy === 'change') {
        const changeA = parseFloat(a.change.replace('%', ''));
        const changeB = parseFloat(b.change.replace('%', ''));
        return changeB - changeA;
      }
      if (sortBy === 'volume') return parseFloat(b.volume.replace('$', '').replace('B', '000000000').replace('M', '000000')) - parseFloat(a.volume.replace('$', '').replace('B', '000000000').replace('M', '000000'));
      if (sortBy === 'marketCap') return parseFloat(b.marketCap.replace('$', '').replace('T', '000000000000').replace('B', '000000000')) - parseFloat(a.marketCap.replace('$', '').replace('T', '000000000000').replace('B', '000000000'));
      return a.name.localeCompare(b.name);
    });

  return (
    <div>
      <h2 className="text-2xl font-bold text-crypto-green mb-6">Markets</h2>
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search currencies..."
          className="w-full p-2 bg-gray-800 rounded-md text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 bg-gray-800 rounded-md text-white"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'change' | 'volume' | 'marketCap')}
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="change">Sort by Change</option>
          <option value="volume">Sort by Volume</option>
          <option value="marketCap">Sort by Market Cap</option>
        </select>
      </div>
      <div className="bg-dark-card p-4 rounded-lg shadow-md overflow-auto max-h-[70vh]">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-2 text-text-muted">Currency</th>
              <th className="p-2 text-text-muted">Price</th>
              <th className="p-2 text-text-muted">Change</th>
              <th className="p-2 text-text-muted">24h Volume</th>
              <th className="p-2 text-text-muted">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {filteredCurrencies.map((currency, index) => (
              <tr key={index} className="border-b border-gray-700 hover:bg-dark-card">
                <td className="p-2">{currency.name}</td>
                <td className="p-2">{currency.price}</td>
                <td className={`p-2 ${currency.change.startsWith('+') ? 'text-crypto-green' : 'text-crypto-purple'}`}>
                  {currency.change}
                </td>
                <td className="p-2">{currency.volume}</td>
                <td className="p-2">{currency.marketCap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketPage;