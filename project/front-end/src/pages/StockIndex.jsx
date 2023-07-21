import React, { useState } from "react";
import "../styles/stockindex.css";
import LineChart from "../components/linechart";
import Doughnut from "../components/DoughnutCharts";
import StockIndexAcc from "../components/StockindexAcc";
import Tw0050 from "../components/stockindex/tw0050";
import ComputerChart from "../components/stockindex/computer";
import Twoo878 from "../components/stockindex/tw00878";
import ElecChart from "../components/stockindex/electronic";
import Tw0056 from "../components/stockindex/tw0056";
import Tw00881 from "../components/stockindex/tw00881";
import Tw00692 from "../components/stockindex/tw00692";
import Tw00713 from "../components/stockindex/tw00713";
import Tw00891 from "../components/stockindex/tw00891";
import Footer from "../components/Footer";
import DoughnutTwii from "../components/DoughnutTwii";
import TwindexPrice from "../components/stockindex/twindexprice";
import Frmsa from "../components/stockindex/frmsa";
import IndexAmount from "../components/stockindex/indexamount";

const IndStock = () => {
  const [lineChart, setLineChart] = useState([]);

  const [returnedData, setReturnedData] = useState(null);
  const handleLineChartDataChange = (data) => {
    setLineChart(data);
  };

  return (
    <>
      <div className="container1">
        <div className="part1-text-container">
          <p className="part1-text">大盤指數</p>
        </div>
        
        <div className="d-flex container2">
          <div className="inchart">
            <LineChart
              onChartDataChange={handleLineChartDataChange}
            ></LineChart>
            <div className="text-end "></div>
          </div>
          <div className="part1-row ">
            <IndexAmount></IndexAmount>
            <TwindexPrice></TwindexPrice>
            <Frmsa></Frmsa>
            {/* <DoughnutTwii lineChart={lineChart}></DoughnutTwii> */}
          </div>
        </div>
      </div>
      <StockIndexAcc></StockIndexAcc>
      <div className="container">
        <div className="part1-text-container">
          <p className="part1-text">台灣熱門ETF</p>
        </div>
        <div className="show-etf">
          <Tw0050 />
        </div>
      </div>

      <div className="d-flex" style={{ width: "95%", marginLeft: 20 }}>
        <Tw0056></Tw0056>
        <Twoo878></Twoo878>
        <Tw00891></Tw00891>
      </div>
      <div className="d-flex" style={{ width: "95%", marginLeft: 20 }}>
        <Tw00692></Tw00692>
        <Tw00881></Tw00881>
        <Tw00713></Tw00713>
      </div>
      <Footer></Footer>
    </>
  );
};

export default IndStock;
