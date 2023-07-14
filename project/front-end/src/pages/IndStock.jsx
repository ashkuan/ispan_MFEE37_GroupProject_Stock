import React, { useContext, useState } from "react";
import Footer from "../components/Footer";
import "../styles/indStock.css";
import { StockContext } from "../../context/StockContext";
import IndStockChart from "../components/indStockChart";
import axios from "axios";

const IndStock = () => {
  const { stockInfo } = useContext(StockContext);
  const [stockName, setStockName] = useState("");
  const inputValue = stockInfo.inputValue;
  axios
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
  return (
    <>
      <div className="container">
        {/* 個股名稱 */}
        <div className="name text-center d-flex align-items-center">
          <div style={{ width: "100%" }}>
            <span id="indStocksNumber">{stockInfo.inputValue}</span>
            <span className="mx-2"> - </span>
            <a href={stockInfo.website} id="indStocksName">
              {stockName}
            </a>
          </div>
          {/* <svg
            id="heart"
            style={{ position: "absolute", right: 300 }}
            xmlns="http://www.w3.org/2000/svg"
            width={50}
            height={50}
            fill="currentColor"
            className="bi bi-heart-fill"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
            />
          </svg> */}
        </div>
        {/* 個股介紹 */}
        <div className="d-flex align-items-center">
          {/* 個股走勢圖 */}
          <IndStockChart></IndStockChart>
        </div>
        {/* 個股股市 */}
        <div id="indStocksIndex" className="mt-5">
          <p
            className="mb-5 text-center"
            style={{
              fontSize: "2.5rem",
              color: "#2c3e50",
              fontWeight: "bold",
            }}
          >
            股市
          </p>
          <div className="row">
            <div className="card col-3">
              <div className="card-body">
                <p className="card-title">現價</p>
                <p className="card-text">{stockInfo.regularMarketPrice}</p>
              </div>
            </div>
            <div className="card col-3">
              <div className="card-body">
                <p className="card-title">最低</p>
                <p className="card-text">{stockInfo.regularMarketDayLow}</p>
              </div>
            </div>
            <div className="card col-5">
              <div className="card-body">
                <p className="card-title">ROC價格變動率</p>
                <p className="card-text">
                  {stockInfo.regularMarketChangePercent}
                </p>
              </div>
            </div>
          </div>
          <div className="row my-5">
            <div className="card col-3">
              <div className="card-body">
                <p className="card-title">昨收</p>
                <p className="card-text">
                  {stockInfo.regularMarketPreviousClose}
                </p>
              </div>
            </div>
            <div className="card col-3">
              <div className="card-body">
                <p className="card-title">交易量</p>
                <p className="card-text">{stockInfo.regularMarketVolume}</p>
              </div>
            </div>
            <div className="card col-5">
              <div className="card-body">
                <p className="card-title">3個月平均每日交易量</p>
                <p className="card-text">
                  {stockInfo.averageDailyVolume3Month}
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="card col-3">
              <div className="card-body">
                <p className="card-title">最高</p>
                <p className="card-text">{stockInfo.regularMarketDayHigh}</p>
              </div>
            </div>
            <div className="card col-3">
              <div className="card-body">
                <p className="card-title">開盤</p>
                <p className="card-text">{stockInfo.regularMarketOpen} </p>
              </div>
            </div>
            <div className="card col-5">
              <div className="card-body">
                <p className="card-title">10日平均每日交易量</p>
                <p className="card-text">{stockInfo.averageDailyVolume10Day}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default IndStock;
