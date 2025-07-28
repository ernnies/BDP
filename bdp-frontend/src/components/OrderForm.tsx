import { useState } from 'react';

const OrderForm: React.FC = () => {
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order submitted:', { orderType, amount, price });
  };

  return (
    <div className="bg-dark-card p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-lg font-semibold text-crypto-green mb-4">Place Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm text-text-muted mb-1">Order Type</label>
          <div className="flex space-x-2">
            <button
              type="button"
              className={`flex-1 py-2 rounded-md ${
                orderType === 'buy' ? 'bg-crypto-green text-dark-bg' : 'bg-gray-700 text-text-muted'
              }`}
              onClick={() => setOrderType('buy')}
            >
              Buy
            </button>
            <button
              type="button"
              className={`flex-1 py-2 rounded-md ${
                orderType === 'sell' ? 'bg-crypto-purple text-dark-bg' : 'bg-gray-700 text-text-muted'
              }`}
              onClick={() => setOrderType('sell')}
            >
              Sell
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm text-text-muted mb-1">Amount (cBTC)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded-md text-white"
            placeholder="0.0"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-text-muted mb-1">Price (USD)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded-md text-white"
            placeholder="0.0"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-crypto-green text-dark-bg rounded-md hover:bg-opacity-90"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default OrderForm;