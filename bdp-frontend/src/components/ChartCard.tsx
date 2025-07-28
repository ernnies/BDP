import { useState, useEffect } from 'react';
// Mock Redstone integration
const mockRedstoneAssets = { btc: 60000, stakingToken: 50 };

const ChartCard: React.FC = () => {
  const [timeframe, setTimeframe] = useState('4 hours');
  const timeframes = ['4 hours', 'Day', 'Week', 'Month', '6 Month'];

  useEffect(() => {
    // Mock Redstone price feed update
    const interval = setInterval(() => console.log('Redstone updated assets:', mockRedstoneAssets), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-dark-card p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-crypto-green">Balance (BNN)</h2>
        <div className="flex space-x-2">
          {timeframes.map((tf) => (
            <button
              key={tf}
              className={`px-2 py-1 rounded-md text-sm ${
                timeframe === tf ? 'bg-crypto-purple text-white' : 'text-text-muted hover:bg-dark-card'
              }`}
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      <div className="h-48 bg-gray-800 rounded-md flex items-center justify-center">
        <p className="text-text-muted">Mock Chart (Static Data)</p>
      </div>
    </div>
  );
};

export default ChartCard;