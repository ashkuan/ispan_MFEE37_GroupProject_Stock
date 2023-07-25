import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "../../styles/finance.css";

const CarChart = () => {
  const [indexPrice, setIndexPrice] = useState([]);
  const [indexDate, setIndexDate] = useState([]);
  const [color, setColor] = useState();
  const [yrange, setYrange] = useState();
  const [persentage, setPersentage] = useState();
  const [rotate, setRotate] = useState();
  const [showTooltip, setShowTooltip] = useState(false);
  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:9453/car", {});
        // setStockData(res.data); // 將後端回傳的資料存入 stockData 狀態中
        // console.log(res.data);
        //價錢
        const Prices = res.data.indicators.adjclose[0].adjclose;
        // console.log(Prices)
        const FirstPrice = parseFloat(Prices[0]);
        const LastPrice = parseFloat(Prices[Prices.length - 1]);
        const grow = LastPrice - FirstPrice;
        const color = grow >= 0 ? "#f17064" : "#77BE6B";
        //漲幅百分比
        const persentage = (
          ((LastPrice - FirstPrice) / FirstPrice) *
          100
        ).toFixed(2);
        setPersentage(persentage);
        //旋轉箭頭
        const rotate = grow >= 0 ? "rotate(360deg)" : "rotate(180deg)";
        setRotate(rotate);
        // console.log(persentage)
        setColor(color);
        setYrange(FirstPrice);
        // console.log(color)

        // console.log(FirstPrice,LastPrice,grow)
        //日期
        const Dates = res.data.timestamp;
        // console.log("這是DATE回傳的陣列", Dates);

        const myIndexDate = Dates.map((time) => {
          const date = new Date(time * 1000);
          return date.toDateString().slice(4, 10);
        });
        // console.log(myIndexDate)
        setIndexDate(myIndexDate);

        //價錢
        const myIndexPrice = Prices.filter((price) => price !== null) // 過濾掉 null 值
          .map((price) => {
            // 取到小數第二位
            return price.toFixed(2);
            // console.log(price);
            // return price;
          });
        // console.log(myIndexPrice)
        setIndexPrice(myIndexPrice);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const options = {
    chart: {
      type: "area",
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      style: {},
    },
    series: [
      {
        name: "00881",
        data: indexPrice,
      },
    ],
    xaxis: {
      labels: {
        show: true,
        rotate: -45,
        rotateAlways: true,
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: false,
      },
      categories: indexDate,
      tickAmount: 10,
    },

    fill: {
      colors: color,
    },
    stroke: {
      curve: "smooth",
      colors: color,
      width: 5,
    },
    yaxis: {
      labels: {
        show: true,
      },
      min: yrange - yrange * 0.1,
      max: yrange + yrange * 0.4,
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <>
      <div className="mt-7rem">
        <button
          className="fs-3 text-center IronGray text-white rounded-3 px-4 py-2 border-0"
          onClick={toggleTooltip}>
          00881 國泰台灣5G
        </button>
        <Chart
          options={options}
          series={options.series}
          type="area"
          width={500}
          height={300}
          className="mt-3" />
      </div>
      <div className={
        `w-550 text-IronGray-Deep ${showTooltip ? "visible" : "hidden"}`}>
        <div className="d-flex align-items-center px-2 mb-2">
          <p className="fs-4 me-3">
            <span
              style={{ color: color }}>
              ▎
            </span>
            近三個月漲幅</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            color="white"
            width={30}
            height={30}
            fill="currentColor"
            className="me-2 bi bi-arrow-up"
            viewBox="0 0 16 16"
            style={{ transform: rotate }}>
            <path fillRule="evenodd" color={color} d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
          </svg>
          <span
            style={{ color: color }}
            className="fs-3 fw-bold">
            {persentage} %
          </span>
        </div>
        <div className="p-2 fs-5">
          00881國泰台灣5G是台灣股市上市的ETF，由國泰投信管理，追踪台灣5G相關公司指數，投資於台灣5G產業的龍頭企業。投資者可透過交易所買賣，受惠於5G科技發展的潛力與成長。投資需謹慎，建議尋求專業建議。
        </div>
      </div>
    </>
  );
};

export default CarChart;
