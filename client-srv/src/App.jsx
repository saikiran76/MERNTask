import React, {useState} from 'react';
import useFetchTrans from './hooks/useFetchTrans'; // Adjust the import path as necessary
import Table from './components/Table'
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import useFetchStat from './hooks/useFetchStat';

function App() {
  const { transactions, loading, error, setMonth, setPage, setSearchTerm, page } = useFetchTrans();
  const [selectedMonth, setSelectedMonth] = useState('January');
  const { data } = useFetchStat(selectedMonth);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };


  return (
    <div className="App m-3">
      <select className='m-3 border-gray-400 border-b-[1.5px] rounded p-3' onChange={(e) => {
        handleMonthChange(e)
      }}>
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
      {error && <div>Error: {error.message}</div>}
      <input
        type="text"
        className='border-gray-400 border-b-[1.5px] rounded p-3'
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search transactions..."
      />
      <button className=' ml-3 px-3 py-1 bg-gray-300 rounded mr-2 cursor-pointer' onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
        Previous
      </button>
      <button className='ml-1 px-3 py-1 bg-gray-300 rounded mr-2 cursor-pointer' onClick={() => setPage((prev) => prev + 1)}>Next</button>

      {loading && <p>Loading transactions...</p>}
      {error && <p>Error: {error}</p>}
      <Table transactions={transactions}/>
      <div className='flex gap-3 flex-wrap'>
        <Statistics/>
        {data && (
        <BarChart
          data={{
            labels: data.labels,
            datasets: [
              {
                label: 'Statistics',
                data: data.values,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
              },
            ],
          }}
          options={{ responsive: true }}
        />
      )}
      </div>
    </div>
  );
}

export default App;