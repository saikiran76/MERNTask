import React, { useState } from 'react';
import useFetchTrans from './hooks/useFetchTrans'; 
import Table from './components/Table';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import useFetchStat from './hooks/useFetchStat';

function App() {
  const { transactions, loading, error, setMonth, setPage, setSearchTerm, page } = useFetchTrans();
  const [selectedMonth, setSelectedMonth] = useState('January');
  const { data, error: statError } = useFetchStat(selectedMonth);

  const barData = data ? {
    labels: ['0-100', '101-200', '201-300', '301-400', '401-500', '501-600', '601-700', '701-800', '801-900', '901 above'],
    datasets: [
      {
        label: 'Statistics',
        data: [
          data.totalSaleAmount, 
          data.soldItems,
          data.notSoldItems
        ],
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  } : null;

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setMonth(e.target.value); 
    setPage(1); 
  };

  return (
    <div className="App m-3">
      <select className='m-3 border-gray-400 border-b-[1.5px] rounded p-3' onChange={handleMonthChange}>
        <option value="January">Jan</option>
        <option value="February">Feb</option>
        <option value="March">Mar</option>
        <option value="April">Apr</option>
        <option value="May">May</option>
        <option value="June">Jun</option>
        <option value="July">Jul</option>
        <option value="August">Aug</option>
        <option value="September">Sep</option>
        <option value="October">Oct</option>
        <option value="November">Nov</option>
        <option value="December">Dec</option>
      </select>
      {error && <div>Error: {error}</div>}
      <input
        type="text"
        className='border-gray-400 border-b-[1.5px] rounded p-3'
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search transactions..."
      />
      <button className='ml-3 px-3 py-1 bg-gray-300 rounded mr-2 cursor-pointer' onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
        Previous
      </button>
      <button className='ml-1 px-3 py-1 bg-gray-300 rounded mr-2 cursor-pointer' onClick={() => setPage((prev) => prev + 1)}>Next</button>

      {loading && <p>Loading transactions...</p>}
      <Table transactions={transactions} />
      <div className='flex flex-wrap mt-10 gap-5 justify-center'>
        <Statistics selectedMonth={selectedMonth} />
        {barData && (
          <BarChart
            data={barData}
            options={{ responsive: true }}
          />
        )}
        {statError && <div>Error: {statError.message}</div>}
      </div>
    </div>
  );
}

export default App;
