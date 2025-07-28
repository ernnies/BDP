import TradingDashboard from '../components/TradingDashboard';
import OrderForm from '../components/OrderForm';

const Home: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-crypto-green mb-6">Bitcoin Trading Dashboard</h2>
      <TradingDashboard />
      <OrderForm />
    </div>
  );
};

export default Home;