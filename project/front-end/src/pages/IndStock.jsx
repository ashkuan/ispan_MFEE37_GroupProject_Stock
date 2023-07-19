import React, { useContext, useState } from "react";
import Footer from "../components/Footer";
import "../styles/indStock.css";
import "../styles/forum_main.css";
import { StockContext } from "../../context/StockContext";
import IndStockChart from "../components/IndStock/IndStockChart";
import axios from "axios";

const IndStock = () => {
  const { stockInfo } = useContext(StockContext);
  const [stockName, setStockName] = useState("");
  const inputValue = stockInfo.inputValue;
  if (inputValue !== "") {
    axios
      .post("http://localhost:5678/stockName", { data: inputValue })
      .then((res) => {
        // console.log(res.data);
        const name = res.data;
        setStockName(name);
      })
      .catch((error) => {
        console.log(error);
        console.log("股票中文名稱獲取失敗");
      });
  }
  return (
    <>
      <div className="container">
        {/* 個股名稱 */}
        <div className="mb-4">
          <a className="text-IronGray-Deep fw-bold fs-1" href={stockInfo.website} id="indStocksName">
            {stockName}
          </a>
          <span className="text-IronGray-Deep fw-bold fs-2 ms-3" id="indStocksNumber">
            ({stockInfo.inputValue})
          </span>
        </div>
        <div className="row">
          <div className="col">
            {/* 個股走勢圖 */}
            <IndStockChart />
          </div>
          <div className="col d-flex align-items-end">
            {/* 股價 & 交易量 數據表 */}
            <div className="IronGray-Light rounded-4 p-4 drop-shadow-20">
              <div className="card" id="indStocksIndex">
                <div className="card-body fs-5">
                  <div className="row">
                    <div className="col-5">
                      <div className="d-flex justify-content-between px-3">
                        <div className="card-title">成交</div>
                        {/* <div className="card-text">581</div> */}
                        <div className="card-text">{stockInfo.regularMarketPrice}</div>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between px-3">
                        <div className="card-title">昨收</div>
                        {/* <div className="card-text">591</div> */}
                        <div className="card-text">{stockInfo.regularMarketPreviousClose}</div>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between px-3">
                        <div className="card-title">開盤</div>
                        {/* <div className="card-text">587</div> */}
                        <div className="card-text">{stockInfo.regularMarketOpen}</div>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between px-3">
                        <div className="card-title">最高</div>
                        {/* <div className="card-text">588</div> */}
                        <div className="card-text">{stockInfo.regularMarketDayHigh}</div>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between px-3">
                        <div className="card-title">最低</div>
                        {/* <div className="card-text">580</div> */}
                        <div className="card-text">{stockInfo.regularMarketDayLow}</div>
                      </div>
                    </div>
                    <div className="col-7">
                      <div className="d-flex justify-content-between px-3">
                        <div className="card-title">交易量</div>
                        {/* <div className="card-text">31079</div> */}
                        <div className="card-text">{stockInfo.regularMarketVolume}</div>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between px-3">
                        <div className="card-title">10日均日交易量</div>
                        {/* <div className="card-text">25719</div> */}
                        <div className="card-text">{stockInfo.averageDailyVolume10Day}</div>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between px-3">
                        <div className="card-title">季均日交易量</div>
                        {/* <div className="card-text">28520</div> */}
                        <div className="card-text">{stockInfo.averageDailyVolume3Month}</div>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between px-3">
                        <div className="card-title">ROC價格變動率</div>
                        {/* <div className="card-text">3.14%</div> */}
                        <div className="card-text">{stockInfo.regularMarketChangePercent}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default IndStock;
