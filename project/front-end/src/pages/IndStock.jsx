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
    const fetchName = async () => {
      await axios
        .post("http://localhost:5678/stockName", { data: inputValue })
        .then((res) => {
          console.log(res.data);
          const name = res.data;
          setStockName(name);
        })
        .catch((error) => {
          console.log(error);
          console.log("股票中文名稱獲取失敗");
        });
    };
    fetchName();
  }
  return (
    <>
      {stockInfo.inputValue !== "" &&
      stockInfo.regularMarketPrice &&
      stockName != "" ? ( // 檢查 stockInfo 是否已獲取
        <>
          <div className="container">
            {/* 個股名稱 */}
            <div className="stockName text-IronGray-Deep fw-bold fs-1">
              {stockName}
              <span
                className="text-IronGray-Deep fw-bold fs-2 ms-3"
                id="indStocksNumber"
              >
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
                            <div className="card-text">
                              {stockInfo.regularMarketPrice}
                            </div>
                          </div>
                          <hr />
                          <div className="d-flex justify-content-between px-3">
                            <div className="card-title">昨收</div>
                            {/* <div className="card-text">591</div> */}
                            <div className="card-text">
                              {stockInfo.regularMarketPreviousClose}
                            </div>
                          </div>
                          <hr />
                          <div className="d-flex justify-content-between px-3">
                            <div className="card-title">開盤</div>
                            {/* <div className="card-text">587</div> */}
                            <div className="card-text">
                              {stockInfo.regularMarketOpen}
                            </div>
                          </div>
                          <hr />
                          <div className="d-flex justify-content-between px-3">
                            <div className="card-title">最高</div>

                            <div className="card-text">
                              {stockInfo.regularMarketDayHigh}
                            </div>
                          </div>
                          <hr />
                          <div className="d-flex justify-content-between px-3 py-2">
                            <div className="card-title">最低</div>
                            <div className="card-text">
                              {stockInfo.regularMarketDayLow}
                            </div>
                          </div>
                        </div>
                        <div className="col-7">
                          <div className="d-flex justify-content-between px-3">
                            <div className="card-title">
                              市值
                              {stockInfo.marketCap.slice(
                                stockInfo.marketCap.length - 1,
                                stockInfo.marketCap.length
                              ) == "t"
                                ? "(兆)"
                                : "(十億)"}
                            </div>
                            <div className="card-text">
                              {stockInfo.marketCap.slice(
                                0,
                                stockInfo.marketCap.length - 1
                              )}
                            </div>
                          </div>
                          <hr />

                          <div className="d-flex justify-content-between px-3">
                            <div className="card-title">成交金額（億）</div>
                            {/* <div className="card-text">31079</div> */}
                            <div className="card-text">
                              {stockInfo.regularMarketVolume.slice(
                                0,
                                stockInfo.regularMarketVolume.length - 1
                              )}
                            </div>
                          </div>
                          <hr />
                          {/* <div className="d-flex justify-content-between px-3">
                        <div className="card-title">10日均日交易量</div> */}
                          {/* <div className="card-text">25719</div> */}
                          {/* <div className="card-text">
                          {stockInfo.averageDailyVolume10Day}
                        </div>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between px-3">
                        <div className="card-title">季均日交易量</div> */}
                          {/* <div className="card-text">28520</div> */}
                          {/* <div className="card-text">
                          {stockInfo.averageDailyVolume3Month}
                        </div> */}
                          {/* </div> */}
                          {/* <hr /> */}
                          <div className="d-flex justify-content-between px-3">
                            <div className="card-title">漲跌幅</div>
                            {/* <div className="card-text">3.14%</div> */}
                            <div className="card-text">
                              {stockInfo.regularMarketChangePercent}
                            </div>
                          </div>
                          <hr />
                          <div className="d-flex justify-content-between px-3">
                            <div className="card-title">漲跌</div>
                            {/* <div className="card-text">3.14%</div> */}
                            <div
                              className="card-text"
                              style={{
                                color:
                                  stockInfo.regularMarketChange > 0
                                    ? "red"
                                    : "green",
                              }}
                            >
                              {stockInfo.regularMarketChange > 0
                                ? `⬆
                          ${stockInfo.regularMarketChange.slice(
                            0,
                            stockInfo.regularMarketChange.length - 3
                          )}`
                                : `⬇${stockInfo.regularMarketChange.slice(
                                    0,
                                    stockInfo.regularMarketChange.length - 3
                                  )}`}
                            </div>
                          </div>
                          <hr />
                          <div className="d-flex justify-content-between px-3 py-2">
                            <div className="card-title">振幅</div>
                            {/* <div className="card-text">3.14%</div> */}
                            <div className="card-text">
                              {stockInfo.peRatio}%
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="col-12">
                          <div className="d-flex justify-content-between align-items-center px-3">
                            <div className="card-title pt-2">單日股價範圍</div>
                            <div className="card-tex pb-2">
                              {stockInfo.regularMarketDayLow}
                              <span> -</span>
                              {stockInfo.regularMarketDayHigh}
                            </div>
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
      ) : (
        "Loading"
      )}
    </>
  );
};

export default IndStock;
