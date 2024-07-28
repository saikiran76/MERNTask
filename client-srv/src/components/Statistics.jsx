import React, { useState } from 'react';
import useFetchStat from '../hooks/useFetchStat';
import MonthDropdown from './MonthDropdown';

const Statistics = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const { data, loading, error } = useFetchStat('http://localhost:4000/api/statistics', { month: selectedMonth });

  return (
    <div className="statistics m-3 p-3 border-gray-400 border-b-[1.5px] rounded">
      <MonthDropdown selectedMonth={selectedMonth} onChange={setSelectedMonth} />
      {loading && <p>Loading statistics...</p>}
      {error && <p>Error loading statistics: {error}</p>}
      {data && (
        <div>
          <p>Total Sale Amount: ${data.totalSaleAmount}</p>
          <p>Total Sold Items: {data.soldItems}</p>
          <p>Totala Not Sold Items: {data.notSoldItems}</p>
        </div>
      )}
    </div>
  );
};

export default Statistics;
