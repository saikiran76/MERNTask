import React, { useEffect, useState } from 'react';
import useFetchStat from '../hooks/useFetchStat';
import MonthDropdown from './MonthDropdown';

const Statistics = ({ selectedMonth }) => {
  const { data, loading, error } = useFetchStat(selectedMonth);

  return (
    <div className="statistics m-3 p-7 shadow-md border-gray-400 border-b-[1.5px] rounded">
      <MonthDropdown selectedMonth={selectedMonth} onChange={(month) => setSelectedMonth(month)} />
      {loading && <p>Loading statistics...</p>}
      {error && <p>Error loading statistics: {error.message}</p>}
      {data && (
        <div>
          <p className='mt-1 flex justify-between'>Total Sale Amount:    <span className='font-semibold ml-5'>{data.totalSaleAmount}</span></p>
          <p className='mt-1 flex justify-between'>Total Sold Items:     <span className='font-semibold ml-5'>{data.soldItems}</span></p>
          <p className='mt-1 flex justify-between'>Total Not Sold Items: <span className='font-semibold ml-5'>{data.notSoldItems}</span></p>
        </div>
      )}
    </div>
  );
};

export default Statistics;
