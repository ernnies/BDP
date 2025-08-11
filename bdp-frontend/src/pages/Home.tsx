import BalanceCard from '../components/BalanceCard';
import ChartCard from '../components/ChartCard';
import PortfolioCard from '../components/PortfolioCard';
import ActionButtons from '../components/ActionButtons';

const Home: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-crypto-green mb-6">Bitcoin Wallet Dashboard</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BalanceCard />
          <ChartCard />
        </div>
        <div>
          <PortfolioCard />
        </div>
      </div>
      <ActionButtons />
    </div>
  );
};

export default Home;