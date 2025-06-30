import React from "react";

function Header({ account, connectWallet }) {
  return (
    <header className="p-4 bg-blue-900">
      <h1 className="text-2xl font-bold">BDP: Bitcoin Discreet Platform</h1>
      <button
        onClick={connectWallet}
        className="mt-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
      >
        {account ? `Connected: ${account.slice(0, 6)}...` : "Connect Wallet"}
      </button>
    </header>
  );
}

export default Header;