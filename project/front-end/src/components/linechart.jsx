import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import"../styles/linechart.css"

const AreaChart = ({onChartDataChange}) => {
  const [perRange, setPerRange] = useState("1d");
  const [range, setRange] = useState("5d");
  const [indexPrice, setIndexPrice] = useState([]);
  const [indexDate, setIndexDate] = useState([]);
  const [color, setColor] = useState();
  const [lastPrice, setLastPrice] = useState();
  

  const handleButtonClick = (newPerRange, newRange) => {
    setPerRange(newPerRange);
    setRange(newRange);
  };
  

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9453/stock-index", {
          params: {
            perRange: perRange,
            range: range,
          },
        });

        //收盤價
        const Prices = response.data.indicators.adjclose[0].adjclose;
        const FirstPrice = parseFloat(Prices[0]);
        const LastPrice = parseFloat(Prices[Prices.length - 1]);
        const grow = LastPrice - FirstPrice;
        const color = grow >= 0 ? "#f17064" : "#77BE6B";
        setLastPrice(LastPrice)
        setColor(color)
        // console.log("這是PRICE回傳的陣列", Prices);
        //日期
        const Dates = response.data.timestamp;
        // console.log("這是DATE回傳的陣列", Dates);
        
        const myIndexDate = Dates.map((time) => {
          const date = new Date(time * 1000);
          return date.toDateString().slice(4, 10);
        });
        setIndexDate(myIndexDate);

        //價錢
        const myIndexPrice = Prices.map((price) => {
          //取到小數第二位
          return price.toFixed(2);
        });
        setIndexPrice(myIndexPrice);
        //傳遞更新資料給父元件
        onChartDataChange(myIndexPrice)
       
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [perRange, range]);
  const options = {
    chart: {
      type: "area",
      toolbar: {
        show: false,
      },
    },
    series: [
      {
        name: "指數",
        data: indexPrice,
      },
    ],
    xaxis: {
      labels: {
        show: true,
      },
      categories: indexDate,
      tickAmount: 10,
    },
    fill: {
      colors: [color],
    },
    stroke: {
      curve: "smooth",
      colors: [color],
      width: 2,
    },
    yaxis: {
      labels: {
        show: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div className="container-fluid mt-3 mb-3">
      <h2>大盤指數TWII</h2>
      <Chart
        options={options}
        series={options.series}
        type="area"
        width={900}
        height={360}
      />
      <div className="text-end">

        <button className="twiibtn" onClick={() => handleButtonClick("1d", "5d")}>5天</button>
        <button className="twiibtn" onClick={() => handleButtonClick("1d", "3mo")}>1個月</button>
        <button className="twiibtn" onClick={() => handleButtonClick("1d", "6mo")}>6個月</button>
        <button className="twiibtn" onClick={() => handleButtonClick("1d", "1y")}>1年</button>
        <button className="twiibtn" onClick={() => handleButtonClick("1d", "5y")}>5年</button>
      </div>
    </div>
  );
};

export default AreaChart;
