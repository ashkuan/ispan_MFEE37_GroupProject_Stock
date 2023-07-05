import React from 'react';
import Chart from 'react-apexcharts';

const SemiChart = () => {
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
          30, 19, 16,40,25,23,60,26,12
        ],
      },
    ],
    xaxis: {
      labels: {
        show: true,
      },
      categories: [
        '10', '20', '30','10','20','30','10','20','30'
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
      <h3 className='text-center'>半導體</h3>
      <Chart options={options}
        series={options.series}
        type="area" 
        width={350} 
        height={250} />
    </div>
  );
};

export default SemiChart;
