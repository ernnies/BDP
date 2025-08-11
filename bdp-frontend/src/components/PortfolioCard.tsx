import { useState } from 'react';

const PortfolioCard: React.FC = () => {
  const [portfolio] = useState([
    { name: 'BNN', amount: '$2,233', change: '-2%' },
    { name: 'BTC', amount: '$12,332', change: '+1%' },
    { name: 'USD', amount: '$78.1', change: '+0.5%' },
  ]);

  const handleRefresh = () => {
    console.log('Portfolio refreshed');
  };

  return (
    <div className="bg-dark-card p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-crypto-green">Portfolio</h2>
        <button
          className="px-4 py-2 bg-crypto-purple text-white rounded-md hover:bg-opacity-90"
          onClick={handleRefresh}
        >
          Refresh
        </button>
      </div>
      <div className="space-y-4">
        {portfolio.map((item) => (
          <div key={item.name} className="flex justify-between items-center">
            <span className="text-sm text-text-muted">{item.name}</span>
            <span className="text-sm font-bold">{item.amount}</span>
            <span
              className={`text-sm ${item.change.startsWith('+') ? 'text-crypto-green' : 'text-crypto-purple'}`}
            >
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioCard;