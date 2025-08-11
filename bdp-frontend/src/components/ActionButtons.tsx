import { useState } from 'react';

const ActionButtons: React.FC = () => {
  const [action, setAction] = useState<string | null>(null);

  const handleAction = (actionType: string) => {
    setAction(actionType);
    console.log(`${actionType} action triggered`);
    // Reset after 2 seconds
    setTimeout(() => setAction(null), 2000);
  };

  return (
    <div className="bg-dark-card p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-lg font-semibold text-crypto-green mb-4">Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        <button
          className="px-4 py-2 bg-crypto-green text-dark-bg rounded-md hover:bg-opacity-90"
          onClick={() => handleAction('Deposit')}
        >
          Deposit
        </button>
        <button
          className="px-4 py-2 bg-crypto-purple text-white rounded-md hover:bg-opacity-90"
          onClick={() => handleAction('Withdraw')}
        >
          Withdraw
        </button>
        <button
          className="px-4 py-2 bg-crypto-green text-dark-bg rounded-md hover:bg-opacity-90"
          onClick={() => handleAction('Swap')}
        >
          Swap
        </button>
        <button
          className="px-4 py-2 bg-crypto-purple text-white rounded-md hover:bg-opacity-90"
          onClick={() => handleAction('Send')}
        >
          Send
        </button>
      </div>
      {action && <p className="mt-4 text-center text-text-muted">Processing {action}...</p>}
    </div>
  );
};

export default ActionButtons;