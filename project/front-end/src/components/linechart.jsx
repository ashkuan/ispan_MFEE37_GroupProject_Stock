import React from 'react';
import Chart from 'react-apexcharts';

function LineChart() {
  const options = {
    chart: {
      type: 'line',
      
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
      categories: [
        '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '10點',
        '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '11點',
        '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '12點',
        '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '1點',
        '5', '10', '15', '20', '25', '30',
      ],
    },
    fill: {
      type: 'solid', // Set to 'solid' for solid fill
      colors: ['#f17064'], // Fill color
      backgroundColor: 'rgba(241, 112, 100, 1)'
    },
    stroke: {
      colors: ['#f17064'], 
      width: 1,
    },
    yaxis: {
      min: 0,
    },
  };

  return (
    <div className="container-fluid mt-3 mb-3">
      <h2>大盤指數</h2>
      <Chart
        options={options}
        series={options.series}
        type="line"
        width={800}
        height={360}
      />
    </div>
  );
}

export default LineChart;
