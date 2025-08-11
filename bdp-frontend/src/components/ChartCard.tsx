import { useState } from 'react';

const ChartCard: React.FC = () => {
  const [timeframe, setTimeframe] = useState('4h');
  const timeframes = ['4h', '1d', '1w', '1m', '6m'];

  const handleTimeframeChange = (tf: string) => {
    setTimeframe(tf);
    console.log(`Chart updated to ${tf} timeframe`);
  };

  return (
    <div className="bg-dark-card p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-crypto-green">Balance Trend</h2>
        <div className="flex space-x-2">
          {timeframes.map((tf) => (
            <button
              key={tf}
              className={`px-2 py-1 rounded-md text-sm ${
                timeframe === tf ? 'bg-crypto-purple text-white' : 'text-text-muted hover:bg-dark-card'
              }`}
              onClick={() => handleTimeframeChange(tf)}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      <div className="h-48 bg-gray-800 rounded-md flex items-center justify-center">
        <p className="text-text-muted">Mock Chart for {timeframe}</p>
      </div>
    </div>
  );
};

export default ChartCard;