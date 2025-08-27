'use client';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function ExpenseChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Expenses (cBTC)',
        data: [0.1, 0.15, 0.08, 0.2, 0.12, 0.18],
        borderColor: '#f6e05e',
        backgroundColor: 'rgba(246, 224, 94, 0.2)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-4 bg-secondary rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Expense History</h2>
      <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
}