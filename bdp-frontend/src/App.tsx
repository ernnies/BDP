import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import MarketPage from './pages/MarketPage';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if wallet is already connected on mount
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setIsAuthenticated(true);
            setWalletAddress(accounts[0]);
            setError(null);
          }
        } catch (err) {
          console.error('Error checking connection:', err);
        }
      }
    };
    checkConnection();
  }, []);

  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header
            setIsAuthenticated={setIsAuthenticated}
            isAuthenticated={isAuthenticated}
            walletAddress={walletAddress}
            setWalletAddress={setWalletAddress}
            error={error}
            setError={setError}
          />
          <main className="flex-1 p-6 overflow-auto">
            {isAuthenticated ? (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/markets" element={<MarketPage />} />
              </Routes>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-text-muted text-lg">
                  {error || 'Please connect your wallet to access the dashboard.'}
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;