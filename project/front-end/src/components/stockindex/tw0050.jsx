import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "../../styles/finance.css";

const FinanceChart = () => {
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
  }, []);

  const options = {
    chart: {
      type: "area",
      toolbar: {
        show: true,
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
      max: yrange + yrange * 0.2,
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div
      className="container-fluid mt-3 mb-3
    d-flex "
    >
      <div className="container-1 d-flex flex-column chartscontainer">
        <h2 className="text-center">台灣元大50</h2>
        <div className="d-flex justify-content-center  ">
          <h3>近三個月漲幅</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            color= "white"
            width={30}
            height={30}
            fill="currentColor"
            className="bi bi-arrow-up"
            viewBox="0 0 16 16"
            style={{ transform: rotate }} 
            
          >
            <path
              fillRule="evenodd"
              color= {color}
              d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
            />
          </svg>
          <h3 style={{color:color}}>{persentage}%</h3>
        </div>
        <div className="etf-dis" >
          台灣0050是一個追踪台灣股市表現的指數基金。它包含台灣股市中具有高市值和流動性的50家
          大型公司股票。這個指數基金在金融市場中扮演關鍵角色，讓投資者能夠分散風險並參與台灣
          經濟的成長。台灣0050的表現受到經濟景氣、政策變化、全球市場情勢等因素的影響，對台灣
          股市的穩定性和漲跌起伏具有重要影響。投資者通常將台灣0050視為追求穩健增長的一個重要選擇。
        </div>
      </div>
      <div className="container-2">
        
        
        <Chart
          options={options}
          series={options.series}
          type="area"
          width={550}
          height={340}
          className="mt-4"
        />
      </div>
    </div>
  );
};

export default FinanceChart;
