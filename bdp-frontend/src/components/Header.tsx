import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  return (
    <header className="bg-dark-card p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold text-crypto-green">BDP: Bitcoin Discreet Platform</h1>
      <div className="flex items-center space-x-4">
        <BellIcon className="h-6 w-6 text-text-muted cursor-pointer" />
        <div className="flex items-center space-x-2">
          <UserCircleIcon className="h-6 w-6 text-crypto-purple" />
          <span className="text-sm text-text-muted">User123</span>
        </div>
      </div>
    </header>
  );
};

export default Header;