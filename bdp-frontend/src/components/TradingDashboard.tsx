import BalanceCard from './BalanceCard';
import ChartCard from './ChartCard';
import PortfolioCard from './PortfolioCard';

const TradingDashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <BalanceCard />
        <ChartCard />
      </div>
      <div>
        <PortfolioCard />
      </div>
    </div>
  );
};

export default TradingDashboard;