import { useState, useEffect } from 'react';

// Mock price data for currencies
const mockPrices = {
  BTC: '$60,000',
  ETH: '$3,200',
  USD: '$1.00',
};

const BalanceCard: React.FC = () => {
  const [balance, setBalance] = useState('$4,011.00');
  const [change, setChange] = useState('+4.5%');
  const [isDepositPopupOpen, setIsDepositPopupOpen] = useState(false);
  const [selectedDepositCurrency, setSelectedDepositCurrency] = useState('USD');
  const [depositAmount, setDepositAmount] = useState('');
  const [depositPrice, setDepositPrice] = useState(mockPrices.USD);

  const handleDeposit = () => {
    if (depositAmount && !isNaN(parseFloat(depositAmount))) {
      const amountInUSD = parseFloat(depositAmount) * (selectedDepositCurrency === 'BTC' ? 60000 : selectedDepositCurrency === 'ETH' ? 3200 : 1);
      const newBalance = parseFloat(balance.replace('$', '')) + amountInUSD;
      setBalance(`$${newBalance.toFixed(2)}`);
      setDepositAmount('');
      setIsDepositPopupOpen(false);
      console.log(`Deposited ${depositAmount} ${selectedDepositCurrency} ($${amountInUSD.toFixed(2)}), new balance: $${newBalance.toFixed(2)}`);
    }
  };

  const handleDepositCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currency = e.target.value;
    setSelectedDepositCurrency(currency);
    setDepositPrice(mockPrices[currency as keyof typeof mockPrices]);
  };

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
      <button
        className="w-full mt-4 py-2 bg-crypto-green text-dark-bg rounded-md hover:bg-opacity-90"
        onClick={() => setIsDepositPopupOpen(true)}
      >
        Deposit
      </button>

      {isDepositPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dark-card p-6 rounded-lg shadow-md w-96">
            <h3 className="text-lg font-semibold text-crypto-green mb-4">Deposit Funds</h3>
            <div className="mb-4">
              <label className="block text-sm text-text-muted mb-2">Select Currency</label>
              <select
                className="w-full p-2 bg-gray-800 rounded-md text-white"
                value={selectedDepositCurrency}
                onChange={handleDepositCurrencyChange}
              >
                <option value="USD">USD</option>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-text-muted mb-2">Current Price</label>
              <p className="p-2 bg-gray-800 rounded-md text-center">{depositPrice}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-text-muted mb-2">Amount</label>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full p-2 bg-gray-800 rounded-md text-white"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-crypto-purple text-white rounded-md hover:bg-opacity-90"
                onClick={() => setIsDepositPopupOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-crypto-green text-dark-bg rounded-md hover:bg-opacity-90"
                onClick={handleDeposit}
              >
                Confirm Deposit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BalanceCard;