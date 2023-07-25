import React from 'react';
import Chart from 'react-apexcharts';
const ApexChart = (lineChart) => {

  // console.log('圓餅圖渲染',lineChart)
  // console.log(lineChart.lineChart[0])
  // console.log(lineChart.lineChart[lineChart.lineChart.length - 1])
  const firstprice =parseFloat(lineChart.lineChart[0])
  const lastprice =parseFloat(lineChart.lineChart[lineChart.lineChart.length - 1])
  const grow =parseFloat((((lastprice - firstprice) / firstprice) * 100).toFixed(2))
  // console.log(grow)
  // console.log(firstprice,lastprice)
  const label = grow > 0 ? `漲:${grow}%` : `跌:${Math.abs(grow)}%`;
  // const opit = 1-grow
  const color = grow > 0 ? "#F17064" : "#77BE6B"

  const chartOptions = {
    series: [Math.abs(grow)],
    options: {
      chart: {
        type: 'donut',
      },
      labels: [
          
          label 
        ],
      colors: [color],
      stroke: {
        width: 4, // 設置線條寬度為 4
      },
      dataLabels: {
        style: {
          fontSize: '0px', // 設置 label 字的大小為 16px
        },
      },
    },
  };




  return (
    <div className='d-flex'>
      <div className='textbox text-center'>加權指數</div>
      <Chart options={chartOptions.options} series={chartOptions.series} type="donut"  />
    </div>
  );
};

export default ApexChart;
