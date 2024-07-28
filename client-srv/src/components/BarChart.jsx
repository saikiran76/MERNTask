import React, { useEffect, useRef} from 'react';
import { Bar } from 'react-chartjs-2';
// import useFetchStat from '../hooks/useFetchStat';
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

const BarChart = ({ data, options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    chartRef.current = new ChartJS(document.getElementById('chart-canvas'), {
      type: 'bar',
      data,
      options,
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, options]);

  return <canvas id="chart-canvas"></canvas>;
};

export default BarChart;
