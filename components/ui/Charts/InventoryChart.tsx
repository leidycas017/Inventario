import React from 'react';
import { Inventory, calculateBalance } from '@/types/inventory';
import { Line } from 'react-chartjs-2';
import { CategoryScale, Chart, ChartData, LineElement, LinearScale, PointElement, Title, Legend } from 'chart.js';

interface InventoryChartProps {
  inventories: Inventory[] | undefined;
}

const InventoryChart: React.FC<InventoryChartProps> = ({ inventories }) => {
  if (!inventories || inventories.length === 0) {
    return <div>No data available for the chart.</div>;
  }

  Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Legend);

  const balance = calculateBalance(inventories);
  const labels = balance.map(b => b.date);

  const data: ChartData<'line'> = {
    labels: labels,
    datasets: [
      {
        label: 'balance',
        data: balance.map(b => b.balance),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const finalBalance = balance[balance.length - 1].balance;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Saldo = ${finalBalance}`,
      },
    },
  };

  return <Line options={options} data={data} />;
};

export { InventoryChart };