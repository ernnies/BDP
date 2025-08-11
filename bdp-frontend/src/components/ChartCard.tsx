import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartCard: React.FC = () => {
  const [timeframe, setTimeframe] = useState('4h');
  const timeframes = ['4h', '1d', '1w', '1m', '6m'];

  // Generate simulated balance data based on timeframe
  const generateBalanceData = (timeframe: string) => {
    const dataPoints = timeframe === '4h' ? 4 : timeframe === '1d' ? 24 : timeframe === '1w' ? 168 : timeframe === '1m' ? 720 : 4320;
    const data = Array.from({ length: dataPoints }, (_, i) => {
      const base = 4000 + Math.sin(i * 0.1) * 100; // Simulated trend with oscillation
      return base + (Math.random() - 0.5) * 50; // Add some random noise
    });
    return data;
  };

  const [chartData, setChartData] = useState({
    labels: Array.from({ length: generateBalanceData(timeframe).length }, (_, i) =>
      timeframe === '4h' ? `Hour ${i}` : timeframe === '1d' ? `Hour ${i}` : `Day ${Math.floor(i / 24)}`
    ),
    datasets: [
      {
        label: 'Balance Trend (USD)',
        data: generateBalanceData(timeframe),
        borderColor: '#00FF00',
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  });

  const handleTimeframeChange = (tf: string) => {
    setTimeframe(tf);
    const newData = generateBalanceData(tf);
    const newLabels = Array.from({ length: newData.length }, (_, i) =>
      tf === '4h' ? `Hour ${i}` : tf === '1d' ? `Hour ${i}` : `Day ${Math.floor(i / 24)}`
    );
    setChartData({
      labels: newLabels,
      datasets: [
        {
          label: 'Balance Trend (USD)',
          data: newData,
          borderColor: '#00FF00',
          backgroundColor: 'rgba(0, 255, 0, 0.2)',
          tension: 0.4,
          fill: true,
        },
      ],
    });
    console.log(`Chart updated to ${tf} timeframe`);
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const, labels: { color: '#A0A0A0' } },
      title: { display: false },
    },
    scales: {
      x: { ticks: { color: '#A0A0A0' } },
      y: { ticks: { color: '#A0A0A0' }, beginAtZero: false },
    },
    maintainAspectRatio: false,
  };

  useEffect(() => {
    handleTimeframeChange(timeframe); // Initial data setup
  }, []);

  return (
    <div className="bg-dark-card p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-crypto-green">Balance Trend</h2>
        <div className="flex space-x-2">
          {timeframes.map((tf) => (
            <button
              key={tf}
              className={`px-2 py-1 rounded-md text-sm ${
                timeframe === tf ? 'bg-crypto-purple text-white' : 'text-text-muted hover:bg-dark-card'
              }`}
              onClick={() => handleTimeframeChange(tf)}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      <div className="h-48">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ChartCard;