import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import OrderForm from "./OrderForm";
import OrderList from "./OrderList";
import BDP_ABI from "./BDP.json"; // ABI from Hardhat compilation

const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS";

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const init = async () => {
      const ethProvider = await detectEthereumProvider();
      if (ethProvider) {
        const web3Provider = new ethers.providers.Web3Provider(ethProvider);
        setProvider(web3Provider);
        const signer = web3Provider.getSigner();
        setSigner(signer);
        const accounts = await web3Provider.listAccounts();
        if (accounts.length > 0) setAccount(accounts[0]);

        const contract = new ethers.Contract(CONTRACT_ADDRESS, BDP_ABI, signer);
        setContract(contract);

        ethProvider.on("accountsChanged", (accounts) => {
          setAccount(accounts[0]);
        });
      }
    };
    init();
  }, []);

  const connectWallet = async () => {
    if (provider) {
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="p-4 bg-blue-900">
        <h1 className="text-2xl font-bold">BDP: Bitcoin Discreet Platform</h1>
        <button
          onClick={connectWallet}
          className="mt-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          {account ? `Connected: ${account.slice(0, 6)}...` : "Connect Wallet"}
        </button>
      </header>
      <main className="p-4 max-w-4xl mx-auto">
        {contract && (
          <>
            <OrderForm contract={contract} signer={signer} />
            <OrderList contract={contract} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;