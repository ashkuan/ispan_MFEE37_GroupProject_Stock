import React from 'react';
import Chart from 'react-apexcharts';

const ApexChart = () => {
  const chartOptions = {
    series: [70, 30],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['My First Dataset'],
      colors: ['#F17064', '#77BE6B'],
    },
  };




  return (
    <div>
      <Chart options={chartOptions.options} series={chartOptions.series} type="donut"  />
    </div>
  );
};

export default ApexChart;
