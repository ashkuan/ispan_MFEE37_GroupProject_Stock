import React, { useEffect, useState } from "react";
import { useContext } from "react";
import Chart from "react-apexcharts";
import { StockContext } from "../../../context/StockContext";
import "../../styles/indStockChart.css";
import "../../styles/forum_main.css";
import axios from "axios";

const IndStockChart = () => {
  const { stockInfo } = useContext(StockContext);
  const [perRange, setPerRange] = useState("1d");
  const [range, setRange] = useState("30d");
  const [stockPrice, setStockPrice] = useState([]);
  const [stockDate, setStockDate] = useState([]);
  // console.log(stockInfo.inputValue);
  const inputValue = stockInfo.inputValue;
  const [dataFetched, setDataFetched] = useState(false);

  // console.log(inputValue);
  useEffect(() => {
    if (inputValue !== "") {
      axios
        .post("http://localhost:5678/stockChart", {
          data: { inputValue, perRange, range },
        })
        .then((res) => {
          // console.log(res.data);
          // console.log(res.data.indicators.adjclose[0].adjclose);
          // console.log(res.data.timestamp);
          const Prices = res.data.indicators.adjclose[0].adjclose;
          const Dates = res.data.timestamp;
          const myStockDate = [];
          const myStockPrice = [];
          // 股票日期
          Dates.map((time) => {
            // console.log(time);
            const date = new Date(time * 1000);
            // console.log(date.toDateString());
            const dataString = date.toDateString().slice(4, 10);
            myStockDate.push(dataString);
            // console.log(myStockDate);
            setStockDate(myStockDate);
          });
          // 股票價格
          Prices.map((price) => {
            // console.log(price);
            myStockPrice.push(price.toFixed(2));
            // console.log(myStockPrice);
            setStockPrice(myStockPrice);
            setDataFetched(true); // 資料已經被獲取
          });
        })
        .catch((err) => {
          console.log("stock傳送失敗");
          console.log(err);
        });
    }
  }, [inputValue, perRange, range]);

  const options = {
    chart: {
      type: "area",
      toolbar: {
        dataLabels: {
          show: true,
        },
      },
    },
    series: [
      {
        name: "股價",
        data: stockPrice,
      },
    ],
    xaxis: {
      labels: {
        show: true,
        style: { fontSize: "1rem" },
      }, // 時間
      categories: stockDate,
      tickAmount: 7,
    },
    fill: {
      colors: ["#f17064"],
    },
    stroke: {
      curve: "smooth",
      colors: ["#f17064"],
      width: 3,
    },
    yaxis: {
      labels: {
        show: true,
        style: { fontSize: "1rem" },
      },
      tickAmount: 10,
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <>
      {dataFetched ? (
        <>
          <div className="time-zone mb-3 fz-3">
            <button
              onClick={() => {
                setPerRange("1d"), setRange("7d");
              }}
            >
              週
            </button>
            <button
              onClick={() => {
                setPerRange("1d"), setRange("30d");
              }}
            >
              月
            </button>
            <button
              onClick={() => {
                setPerRange("1d"), setRange("3mo");
              }}
            >
              季
            </button>
            <button
              onClick={() => {
                setPerRange("1d"), setRange("6mo");
              }}
            >
              半年
            </button>
            <button
              onClick={() => {
                setPerRange("1d"), setRange("1y");
              }}
            >
              1年
            </button>
            <button
              onClick={() => {
                setPerRange("1d"), setRange("5y");
              }}
            >
              5年
            </button>
            {/* <button
              onClick={() => {
                setPerRange("1d"), setRange("10y");
              }}
            >
              10年
            </button> */}
          </div>
          <div className="drop-shadow-20">
            <Chart
              options={options}
              series={options.series}
              type="area"
              width={600}
              height={600}
            />
          </div>
        </>
      ) : (
        "Loading"
      )}
    </>
  );
};
export default IndStockChart;
