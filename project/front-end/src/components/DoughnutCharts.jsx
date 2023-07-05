import React from 'react';
import Chart from 'react-apexcharts';

const ApexChart = () => {
  const chartOptions = {
    series: [70, 30],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['漲:45%','跌:45%'],
      colors: ['#F17064', '#77BE6B'],
      stroke: {
        width: 4, // 設置線條寬度為 4
      },
    },
  };




  return (
    <div>
      <Chart options={chartOptions.options} series={chartOptions.series} type="donut"  />
    </div>
  );
};

export default ApexChart;
