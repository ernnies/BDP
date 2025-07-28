import { NavLink } from 'react-router-dom';
import { WalletIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-dark-bg h-screen p-4 flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-crypto-green">BDP</h2>
      </div>
      <nav className="flex-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center p-2 mb-2 rounded-md ${isActive ? 'bg-crypto-green text-dark-bg' : 'text-text-muted hover:bg-dark-card'}`
          }
        >
          <WalletIcon className="h-5 w-5 mr-2" />
          Wallet
        </NavLink>
        <NavLink
          to="/markets"
          className={({ isActive }) =>
            `flex items-center p-2 mb-2 rounded-md ${isActive ? 'bg-crypto-green text-dark-bg' : 'text-text-muted hover:bg-dark-card'}`
          }
        >
          <ChartBarIcon className="h-5 w-5 mr-2" />
          Markets
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;