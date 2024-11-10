'use client';

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export interface BarChartProps {
  accounts: Account[];
}

export default function BarChart({ accounts }: BarChartProps) {
  const currentMonth = new Date().getMonth();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Generate last 4 months
  const last4Months = Array.from(
    { length: 4 },
    (_, i) => months[(currentMonth - 3 + i + 12) % 12],
  );

  // Randomize balances for 4 months (for each account)
  const balancesData = accounts.map((account) => ({
    label: account.name,
    data: Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * account.currentBalance),
    ),
    backgroundColor: ['rgb(165 243 252)', '#87eee9', ' rgb(94 234 212)'],
    borderColor: ['rgb(165 243 252)', '#9ee4e4', 'rgb(153 246 228)'],
    borderWidth: 1,
  }));

  const data = {
    labels: last4Months,
    datasets: balancesData,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Bank balances by last 4 months',
      },
    },
  };

  return (
    <Bar
      className="hidden max-h-[290px] w-[90%] xl:block"
      options={options}
      data={data}
    />
  );
}
