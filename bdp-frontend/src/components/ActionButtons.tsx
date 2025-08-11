import { useState } from 'react';

// Mock price data for currencies
const mockPrices = {
  BTC: '$60,000',
  ETH: '$3,200',
  USD: '$1.00',
};

const ActionButtons: React.FC = () => {
  const [balance, setBalance] = useState('$4,011.00');
  const [isDepositPopupOpen, setIsDepositPopupOpen] = useState(false);
  const [isWithdrawPopupOpen, setIsWithdrawPopupOpen] = useState(false);
  const [isSwapPopupOpen, setIsSwapPopupOpen] = useState(false);
  const [isSendPopupOpen, setIsSendPopupOpen] = useState(false);
  const [selectedDepositCurrency, setSelectedDepositCurrency] = useState('USD');
  const [depositAmount, setDepositAmount] = useState('');
  const [depositPrice, setDepositPrice] = useState(mockPrices.USD);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedFromCurrency, setSelectedFromCurrency] = useState('USD');
  const [selectedToCurrency, setSelectedToCurrency] = useState('BTC');
  const [swapAmount, setSwapAmount] = useState('');
  const [fromPrice, setFromPrice] = useState(mockPrices.USD);
  const [toPrice, setToPrice] = useState(mockPrices.BTC);
  const [sendAmount, setSendAmount] = useState('');
  const [recipient, setRecipient] = useState('');

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

  const handleWithdraw = () => {
    if (withdrawAmount && !isNaN(parseFloat(withdrawAmount))) {
      const amountInUSD = parseFloat(withdrawAmount);
      const currentBalance = parseFloat(balance.replace('$', ''));
      if (amountInUSD <= currentBalance) {
        const newBalance = currentBalance - amountInUSD;
        setBalance(`$${newBalance.toFixed(2)}`);
        setWithdrawAmount('');
        setIsWithdrawPopupOpen(false);
        console.log(`Withdrawn $${withdrawAmount}, new balance: $${newBalance.toFixed(2)}`);
      } else {
        console.log('Insufficient balance');
      }
    }
  };

  const handleSwap = () => {
    if (swapAmount && !isNaN(parseFloat(swapAmount))) {
      const fromValue = parseFloat(swapAmount) * (selectedFromCurrency === 'BTC' ? 60000 : selectedFromCurrency === 'ETH' ? 3200 : 1);
      const toValue = fromValue / (selectedToCurrency === 'BTC' ? 60000 : selectedToCurrency === 'ETH' ? 3200 : 1);
      console.log(`Swapped ${swapAmount} ${selectedFromCurrency} to ${toValue.toFixed(8)} ${selectedToCurrency}`);
      setSwapAmount('');
      setIsSwapPopupOpen(false);
    }
  };

  const handleSend = () => {
    if (sendAmount && recipient && !isNaN(parseFloat(sendAmount))) {
      const amountInUSD = parseFloat(sendAmount);
      const currentBalance = parseFloat(balance.replace('$', ''));
      if (amountInUSD <= currentBalance) {
        const newBalance = currentBalance - amountInUSD;
        setBalance(`$${newBalance.toFixed(2)}`);
        setSendAmount('');
        setRecipient('');
        setIsSendPopupOpen(false);
        console.log(`Sent $${sendAmount} to ${recipient}, new balance: $${newBalance.toFixed(2)}`);
      } else {
        console.log('Insufficient balance');
      }
    }
  };

  const handleDepositCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currency = e.target.value;
    setSelectedDepositCurrency(currency);
    setDepositPrice(mockPrices[currency as keyof typeof mockPrices]);
  };

  const handleFromCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currency = e.target.value;
    setSelectedFromCurrency(currency);
    setFromPrice(mockPrices[currency as keyof typeof mockPrices]);
  };

  const handleToCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currency = e.target.value;
    setSelectedToCurrency(currency);
    setToPrice(mockPrices[currency as keyof typeof mockPrices]);
  };

  return (
    <div className="bg-dark-card p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-lg font-semibold text-crypto-green mb-4">Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        <button
          className="px-4 py-2 bg-crypto-green text-dark-bg rounded-md hover:bg-opacity-90"
          onClick={() => setIsDepositPopupOpen(true)}
        >
          Deposit
        </button>
        <button
          className="px-4 py-2 bg-crypto-purple text-white rounded-md hover:bg-opacity-90"
          onClick={() => setIsWithdrawPopupOpen(true)}
        >
          Withdraw
        </button>
        <button
          className="px-4 py-2 bg-crypto-green text-dark-bg rounded-md hover:bg-opacity-90"
          onClick={() => setIsSwapPopupOpen(true)}
        >
          Swap
        </button>
        <button
          className="px-4 py-2 bg-crypto-purple text-white rounded-md hover:bg-opacity-90"
          onClick={() => setIsSendPopupOpen(true)}
        >
          Send
        </button>
      </div>

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

      {isWithdrawPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dark-card p-6 rounded-lg shadow-md w-96">
            <h3 className="text-lg font-semibold text-crypto-purple mb-4">Withdraw Funds</h3>
            <div className="mb-4">
              <label className="block text-sm text-text-muted mb-2">Amount (USD)</label>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full p-2 bg-gray-800 rounded-md text-white"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-crypto-purple text-white rounded-md hover:bg-opacity-90"
                onClick={() => setIsWithdrawPopupOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-crypto-green text-dark-bg rounded-md hover:bg-opacity-90"
                onClick={handleWithdraw}
              >
                Confirm Withdraw
              </button>
            </div>
          </div>
        </div>
      )}

      {isSwapPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dark-card p-6 rounded-lg shadow-md w-96">
            <h3 className="text-lg font-semibold text-crypto-green mb-4">Swap Currency</h3>
            <div className="mb-4">
              <label className="block text-sm text-text-muted mb-2">From Currency</label>
              <select
                className="w-full p-2 bg-gray-800 rounded-md text-white mb-2"
                value={selectedFromCurrency}
                onChange={handleFromCurrencyChange}
              >
                <option value="USD">USD</option>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
              </select>
              <label className="block text-sm text-text-muted mb-2">Current Price</label>
              <p className="p-2 bg-gray-800 rounded-md text-center">{fromPrice}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-text-muted mb-2">To Currency</label>
              <select
                className="w-full p-2 bg-gray-800 rounded-md text-white mb-2"
                value={selectedToCurrency}
                onChange={handleToCurrencyChange}
              >
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
                <option value="USD">USD</option>
              </select>
              <label className="block text-sm text-text-muted mb-2">Current Price</label>
              <p className="p-2 bg-gray-800 rounded-md text-center">{toPrice}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-text-muted mb-2">Amount</label>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full p-2 bg-gray-800 rounded-md text-white"
                value={swapAmount}
                onChange={(e) => setSwapAmount(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-crypto-purple text-white rounded-md hover:bg-opacity-90"
                onClick={() => setIsSwapPopupOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-crypto-green text-dark-bg rounded-md hover:bg-opacity-90"
                onClick={handleSwap}
              >
                Confirm Swap
              </button>
            </div>
          </div>
        </div>
      )}

      {isSendPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dark-card p-6 rounded-lg shadow-md w-96">
            <h3 className="text-lg font-semibold text-crypto-purple mb-4">Send Funds</h3>
            <div className="mb-4">
              <label className="block text-sm text-text-muted mb-2">Amount (USD)</label>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full p-2 bg-gray-800 rounded-md text-white"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-text-muted mb-2">Recipient Address</label>
              <input
                type="text"
                placeholder="Enter recipient address"
                className="w-full p-2 bg-gray-800 rounded-md text-white"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-crypto-purple text-white rounded-md hover:bg-opacity-90"
                onClick={() => setIsSendPopupOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-crypto-green text-dark-bg rounded-md hover:bg-opacity-90"
                onClick={handleSend}
              >
                Confirm Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;