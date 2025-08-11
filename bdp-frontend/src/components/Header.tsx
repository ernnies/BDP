import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { ethers } from 'ethers';

interface HeaderProps {
  setIsAuthenticated: (value: boolean) => void;
  isAuthenticated: boolean;
  walletAddress: string | null;
  setWalletAddress: (value: string | null) => void;
  error: string | null;
  setError: (value: string | null) => void;
}

const Header: React.FC<HeaderProps> = ({
  setIsAuthenticated,
  isAuthenticated,
  walletAddress,
  setWalletAddress,
  error,
  setError,
}) => {
  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xf35a' }], // Chain ID 62298 in hex
        });
      } catch (switchError) {
        if ((switchError as any).code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0xf35a',
                  chainName: 'Citrea Devnet',
                  rpcUrls: ['https://rpc.devnet.citrea.xyz'],
                  nativeCurrency: {
                    name: 'cBTC',
                    symbol: 'cBTC',
                    decimals: 18,
                  },
                  blockExplorerUrls: ['https://explorer.devnet.citrea.xyz'],
                },
              ],
            });
          } catch (addError) {
            console.error('Failed to add Citrea Devnet:', addError);
            setError('Failed to add Citrea Devnet. Please try again.');
            return;
          }
        } else {
          console.error('Failed to switch network:', switchError);
          setError('Failed to switch to Citrea Devnet. Please try again.');
          return;
        }
      }

      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        if (network.chainId !== BigInt(62298)) {
          setError('Please ensure you are connected to Citrea Devnet (Chain ID 62298).');
          return;
        }
        setIsAuthenticated(true);
        setWalletAddress(accounts[0]);
        setError(null);
        console.log('Connected to Citrea Devnet with address:', accounts[0]);
      } catch (err) {
        console.error('Connection failed:', err);
        setError('Wallet connection declined or failed. Please try again.');
        setIsAuthenticated(false);
        setWalletAddress(null);
      }
    } else {
      setError('Please install MetaMask or an EVM-compatible wallet.');
    }
  };

  return (
    <header className="bg-dark-card p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold text-crypto-green">BDP: Bitcoin Wallet</h1>
      <div className="flex items-center space-x-4">
        <BellIcon className="h-6 w-6 text-text-muted cursor-pointer" />
        <div className="flex items-center space-x-2">
          <UserCircleIcon
            className="h-6 w-6 text-crypto-purple cursor-pointer"
            onClick={handleConnectWallet}
          />
          {isAuthenticated && walletAddress ? (
            <span className="text-sm text-crypto-green">
              {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
            </span>
          ) : (
            <span
              className="text-sm text-text-muted cursor-pointer hover:text-crypto-purple"
              onClick={handleConnectWallet}
            >
              Connect Wallet
            </span>
          )}
          {error && <span className="text-sm text-crypto-purple">{error}</span>}
        </div>
      </div>
    </header>
  );
};

export default Header;