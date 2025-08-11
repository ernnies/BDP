import { useState, useEffect } from 'react';

const BalanceCard: React.FC = () => {
  const [balance] = useState('$4,011.00');
  const [change] = useState('+4.5%');

  useEffect(() => {
    const interval = setInterval(() => console.log('Balance updated'), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-dark-card p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-lg font-semibold text-crypto-green mb-4">My Balance</h2>
      <div className="text-center">
        <p className="text-3xl font-bold">{balance}</p>
        <p className="text-sm text-crypto-purple">{change}</p>
      </div>
    </div>
  );
};

export default BalanceCard;