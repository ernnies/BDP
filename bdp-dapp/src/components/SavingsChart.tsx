'use client';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function SavingsChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Savings (cBTC)',
        data: [0.5, 0.7, 0.6, 0.8, 0.9, 1.0],
        backgroundColor: '#f6e05e',
      },
    ],
  };

  return (
    <div className="p-4 bg-secondary rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Savings History</h2>
      <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
}