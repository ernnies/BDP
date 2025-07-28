const MarketData: React.FC = () => {
  // Placeholder data; replace with API calls to Citrea Testnet or market data provider
  const marketData = {
    price: 60000.25,
    volume: 1234.56,
    change: 2.34,
  };

  return (
    <div className="bg-dark-card p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Market Data</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-text-muted">Price (USD)</p>
          <p className="text-xl font-bold">${marketData.price.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-text-muted">24h Volume (cBTC)</p>
          <p className="text-xl font-bold">{marketData.volume.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-text-muted">24h Change</p>
          <p className={`text-xl font-bold ${marketData.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {marketData.change >= 0 ? '+' : ''}{marketData.change}%
          </p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-sm text-text-muted mb-2">Order Book (Hidden for Privacy)</h3>
        <p className="text-text-muted">Order book data is secured via Citrea's zero-knowledge technology.</p>
      </div>
    </div>
  );
};

export default MarketData;