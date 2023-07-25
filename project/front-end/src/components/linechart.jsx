import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const LineChart = ({ onChartDataChange }) => {
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

        //價格
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
        style: { fontSize: "1rem" },
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
        style: { fontSize: "1rem" },
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <>
      <div className="text-IronGray-Deep fw-bold fs-1">
        加權指數 TWII
      </div>
      <div className="time-zone mb-3 fz-3">
        <button
          className=""
          onClick={() => handleButtonClick("1d", "5d")}>
          週
        </button>
        <button
          className=""
          onClick={() => handleButtonClick("1d", "30d")}>
          月
        </button>
        <button
          className=""
          onClick={() => handleButtonClick("1d", "3mo")}>
          季
        </button>
        <button
          className=""
          onClick={() => handleButtonClick("1d", "6mo")}>
          半年
        </button>
        <button
          className=""
          onClick={() => handleButtonClick("1d", "1y")}>
          1年
        </button>
        <button
          className=""
          onClick={() => handleButtonClick("1d", "5y")}>
          5年
        </button>
      </div>
      <div className="drop-shadow-20 d-flex justify-content-center rounded-3">
        <Chart
          options={options}
          series={options.series}
          type="area"
          width={780}
          height={400}
        />
      </div>
    </>
  );
};

export default LineChart;
