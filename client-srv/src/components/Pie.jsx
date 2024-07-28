import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import MonthDropdown from './MonthDropdown';
import useFetchStat from './hooks/useFetchStat'; // Adjust the path as necessary

const Pie = ({ title }) => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const { data, error, loading } = useFetchStat('/api/pie-stats', { month: selectedMonth });

  const chartData = data ? {
    labels: data.map(item => item.category),
    datasets: [
      {
        data: data.map(item => item.count),
        backgroundColor: [
          '#6B120A', '#856562', '#1073E6', '#7BB896', '#F7A668',
          '#EB5D50', '#E7E9ED', '#9C9191', '#CAB8FF', '#FFC400'
        ],
      },
    ],
  } : { labels: [], datasets: [{ data: [] }] }; // Initialize to avoid undefined error

  return (
    <div className="flex flex-col items-center w-full md:w-1/5 p-2">
      <h3 className="text-sm font-bold mb-4 mt-3">{title}</h3>
      <MonthDropdown selectedMonth={selectedMonth} onChange={setSelectedMonth} />
      {loading && <p>Loading...</p>}
      {error && <p>Error loading data</p>}
      {!loading && !error && (
        <div className="relative w-[10rem] h-48">
          <Doughnut data={chartData} />
        </div>
      )}
    </div>
  );
};

export default Pie;
