import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const AreaChart = () => {
  
  const [chartData, setChartData] = useState();

  useEffect(() => {
    axios.get('http://localhost:9453/stock-index')
      .then(response => {
        console.log(response.data);
        setChartData(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  if (!chartData || !chartData.series) {
    return null;
  }

  const options = {
    chart: {
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    series: [
      {
        data: chartData.series,
      },
    ],
    xaxis: {
      labels: {
        show: true,
      },
      categories: chartData.categories,
    },
    fill: {
      colors: ['#f17064'],
    },
    stroke: {
      curve: 'smooth',
      colors: ['#f17064'],
      width: 2,
    },
    yaxis: {
      labels: {
        show: true,
      },
      min: 0,
    },
    dataLabels: {
      enabled: false, 
    },
  };

  return (
    <div className="container-fluid mt-3 mb-3">
      <h2>大盤指數</h2>
      <Chart options={options} series={chartData.series} type="area" width={800} height={360} />
    </div>
  );
};

export default AreaChart;
