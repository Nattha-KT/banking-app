'use client';

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({ accounts }: DoughnutChartProps) {
  //   const accountNames = accounts.map((a) => a.name);
  //   const balances = accounts.map((a) => a.currentBalance);
  console.log(accounts);

  const data = {
    datasets: [
      {
        label: 'Banks',
        data: [1250, 2312, 5421],
        backgroundColor: [
          ' rgb(153 246 228)',
          'rgb(94 234 212)',
          ' rgb(20 184 166)',
        ],
        hoverOffset: 4,
      },
    ],
    labels: ['Bank 1', 'Bank 2', 'Bank 3'],
  };

  return (
    <Doughnut
      data={data}
      options={{
        cutout: '60%',
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
}
