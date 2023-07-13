import React from 'react';
import Chart from 'react-apexcharts';

const AreaChart = () => {
  const options = {
    chart: {
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    series: [
      {
        data: [
          12, 19, 16, 14, 13, 17, 24, 28, 29, 30, 34, 28,
          35, 34, 24, 32, 45, 40, 34, 27, 45, 47, 49, 52,
          51, 51, 50, 49, 49, 47, 47, 46, 44, 44, 44, 46,
          46, 47, 48, 46, 52, 52, 53, 54, 54, 56, 56, 58,
          51, 52, 52, 54, 54, 58,
        ],
      },
    ],
    xaxis: {
      labels: {
        show: true,
      },
      categories: [
        '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '10點',
        '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '11點',
        '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '12點',
        '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '1點',
        '5', '10', '15', '20', '25', '30',
      ],
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
      <Chart options={options} series={options.series} type="area" width={800} height={360} />
    </div>
  );
};

export default AreaChart;
