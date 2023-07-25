import React, { useState } from "react";
import LineChart from "../components/linechart";
import Tw0050 from "../components/stockindex/tw0050";
import Tw00878 from "../components/stockindex/tw00878";
import Tw0056 from "../components/stockindex/tw0056";
import Tw00881 from "../components/stockindex/tw00881";
import Tw00692 from "../components/stockindex/tw00692";
import Tw00713 from "../components/stockindex/tw00713";
import Tw00891 from "../components/stockindex/tw00891";
import Footer from "../components/Footer";
import DoughnutTwii from "../components/DoughnutTwii";
import Doughnut from "../components/DoughnutCharts";
import StockIndexAcc from "../components/StockindexAcc";
import ComputerChart from "../components/stockindex/computer";
import ElecChart from "../components/stockindex/electronic";
import TwindexPrice from "../components/stockindex/twindexprice";
import Frmsa from "../components/stockindex/frmsa";
import IndexAmount from "../components/stockindex/indexamount";
import "../styles/stockindex.css";
import "../styles/indStock.css";
import "../styles/forum_main.css";

const IndStock = () => {
  const [lineChart, setLineChart] = useState([]);

  const [returnedData, setReturnedData] = useState(null);
  const handleLineChartDataChange = (data) => {
    setLineChart(data);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <LineChart
              onChartDataChange={handleLineChartDataChange}
            />
          </div>
          <div className="col-4 d-flex justify-content-center align-items-center">
            <div className="py-2">
              <IndexAmount />
              <TwindexPrice />
              <Frmsa />
              {/* <DoughnutTwii lineChart={lineChart}></DoughnutTwii> */}
            </div>
          </div>
        </div>
      </div>
      {/* <StockIndexAcc /> */}
      <div className="container">
        <div className="">
          <div className="text-IronGray-Deep fw-bold fs-1 mb-3">
            熱門 ETF
          </div>
          <Tw0050 />
        </div>
      </div>

      <div
        className="container">
        <div className="row">
          <div className="col">
            <Tw0056 />
          </div>
          <div className="col">
            <Tw00878 />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Tw00891 />
          </div>
          <div className="col">
            <Tw00692 />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Tw00881 />
          </div>
          <div className="col">
            <Tw00713 />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default IndStock;
