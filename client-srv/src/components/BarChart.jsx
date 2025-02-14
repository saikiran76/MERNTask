import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data, options }) => (
  <div className='bg-white shadow-md rounded-lg p-5 border-[1.5px] w-[50%] h-[20rem]'>
  <Bar style={{width:"90%"}} data={data} options={options} />
  </div>
);

export default BarChart;
