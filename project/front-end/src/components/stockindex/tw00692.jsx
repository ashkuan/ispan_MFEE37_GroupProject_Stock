import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "../../styles/finance.css";

const FoodChart = () => {
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
        const res = await axios.get("http://localhost:9453/food", {});
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
        const myIndexPrice = Prices
          .filter((price) => price !== null) // 過濾掉 null 值
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
        name: "00692",
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
    <div
      className="container-fluid mt-3 mb-3 alltag">
      <div>
        <div
          className={`d-flex flex-column eft-tooltip ${showTooltip ? "visible" : "hidden"}`}>
          {/* <h2 className="text-center">測試</h2> */}
          <div className="d-flex  p-2 ">
            <p className="toolbartitle">近三個月漲幅</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              color="white"
              width={30}
              height={30}
              fill="currentColor"
              className="bi bi-arrow-up"
              viewBox="0 0 16 16"
              style={{ transform: rotate }}>
              <path fillRule="evenodd" color={color} d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
            </svg>
            <h4
              style={{ color: color }}>
              {persentage}%
            </h4>
          </div>
          <div className="p-1 etf-dis2">
            00692富邦公司治理是台灣股市上市的股票基金，由富邦投信管理，投資於公司治理良好的企業。著重高品質股票，長期穩健投資。投資者可透過交易所買賣，受益於公司治理優良企業的成長與價值。需留意市場波動，建議尋求專業建議。          </div>
        </div>
        <div className="container-2">
          <button
            className="stockname etfbutton"
            onClick={toggleTooltip}
            style={{
              color: "white",
              fontSize: 28,
              backgroundColor: color
            }}>
            00692富邦公司治理
          </button>
          <Chart
            options={options}
            series={options.series}
            type="area"
            width={550}
            height={400}
            className="mt-4" />
        </div>
      </div>
    </div>
  );
};

export default FoodChart;
