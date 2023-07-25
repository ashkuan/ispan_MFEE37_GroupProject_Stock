import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "../../styles/finance.css";

const FinanceChart = () => {
  const [perRange, setPerRange] = useState("1d");
  const [range, setRange] = useState("5d");
  const [indexPrice, setIndexPrice] = useState([]);
  const [indexDate, setIndexDate] = useState([]);
  const [color, setColor] = useState();
  const [yrange, setYrange] = useState();
  const [persentage, setPersentage] = useState();
  const [rotate, setRotate] = useState()
  const [showContainer1, setShowContainer1] = useState();
  const handleTestButtonClick = () => {
    // 更新showContainer1狀態，切換要顯示的零件
    setShowContainer1(!showContainer1);
  };

  const handleButtonClick = (newPerRange, newRange) => {
    setPerRange(newPerRange);
    setRange(newRange);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:9453/finance", {});
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
        const persentage = (((LastPrice - FirstPrice) / FirstPrice) * 100).toFixed(2)
        setPersentage(persentage)
        //旋轉箭頭
        const rotate = grow >= 0 ? "rotate(360deg)" : "rotate(180deg)"
        setRotate(rotate)
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
  }, [perRange, range]);

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
        name: "元大50",
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
        style: { fontSize: "1rem" },
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
      width: 2,
    },
    yaxis: {
      labels: {
        show: true,
        style: { fontSize: "1rem" },
      },
      min: yrange - yrange * 0.1,
      max: yrange + yrange * 0.2,
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div
      className="row mt-5">
      <div className="col">
        <span className="me-4 mb-3 fs-3 text-center IronGray text-white rounded-3 px-4 py-2">
          0050 元大台灣 50
        </span>
        <div className="d-flex justify-content-end align-items-center my-3 px-3">
          <div className="fs-4 text-IronGray-Deep">
            近三個月漲幅
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            color="white"
            width={30}
            height={30}
            fill="currentColor"
            className="mx-2 bi bi-arrow-up"
            viewBox="0 0 16 16"
            style={{ transform: rotate }}>
            <path fillRule="evenodd" color={color} d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
          </svg>
          <div
            style={{ color: color }}
            className="fs-3 fw-bold">
            {persentage} %
          </div>
        </div>
        <div
          className="fs-4 text-IronGray-Deep me-3 px-5 py-4 drop-shadow-20 rounded-3">
          台灣0050是一個追踪台灣股市表現的指數基金。它包含台灣股市中具有高市值和流動性的50家
          大型公司股票。這個指數基金在金融市場中扮演關鍵角色，讓投資者能夠分散風險並參與台灣
          經濟的成長。台灣0050的表現受到經濟景氣、政策變化、全球市場情勢等因素的影響，對台灣
          股市的穩定性和漲跌起伏具有重要影響。投資者通常將台灣0050視為追求穩健增長的一個重要選擇。
        </div>
      </div>
      <div className="col position-relative d-flex justify-content-center">
        <div className="position-absolute bottom-0">
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
              width={560}
              height={395}
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceChart;
