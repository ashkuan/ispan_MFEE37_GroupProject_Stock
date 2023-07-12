import React, { useContext } from "react";
import Linechart from "../components/linechart";
import Footer from "../components/Footer";
import "../styles/indStock.css";
import { StockContext } from "../../context/StockContext";

const IndStock = () => {
  const { stockInfo } = useContext(StockContext);

  return (
    <>
      <div className="container">
        {/* 個股名稱 */}
        <div className="name text-center d-flex align-items-center">
          <div style={{ width: "100%" }}>
            <span id="indStocksNumber">{stockInfo.inputValue}</span>
            <span className="mx-2"> - </span>
            <span id="indStocksName">{stockInfo.shortname}</span>
          </div>
          <svg
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
          </svg>
        </div>
        {/* 個股介紹 */}
        <div className="d-flex align-items-center">
          <div
            className="card me-4"
            style={{
              width: "40%",
              backgroundColor: "#2c3e50",
              borderRadius: 20,
            }}
          >
            <div className="card-body d-flex flex-column align-items-center">
              <p
                className="card-title mb-4"
                style={{ fontSize: "2rem", color: "white" }}
              >
                介紹
              </p>
              <p
                className="card-text"
                style={{ fontSize: "1.4rem", color: "#dddddd" }}
              >
                台積電（TSMC）是全球領先的半導體製造公司之一，成立於1987年，以製造先進的積體電路為主要業務。
                作為全球最大的晶圓代工廠商，台積電提供給全球各種規模的半導體設計公司製造高品質的晶圓產品。
              </p>
            </div>
          </div>
          {/* 個股走勢圖 */}
          <Linechart></Linechart>
        </div>
        {/* 個股股市 */}
        <div id="indStocksIndex" className="mt-5">
          <div
            className="row mb-5"
            style={{
              fontSize: "2.5rem",
              color: "#2c3e50",
              fontWeight: "bold",
            }}
          >
            股市
          </div>
          <div className="row">
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
                <p className="card-title">最低</p>
                <p className="card-text">{stockInfo.regularMarketDayLow}</p>
              </div>
            </div>
            <div className="card col-3">
              <div className="card-body">
                <p className="card-title">目前股價報酬率</p>
                <p className="card-text">23.78%</p>
              </div>
            </div>
          </div>
          <div className="row my-5">
            <div className="card col-3">
              <div className="card-body">
                <p className="card-title">開盤</p>
                <p className="card-text">{stockInfo.regularMarketOpen}</p>
              </div>
            </div>
            <div className="card col-3">
              <div className="card-body">
                <p className="card-title">交易量</p>
                <p className="card-text">{stockInfo.regularMarketVolume}</p>
              </div>
            </div>
            <div className="card col-3">
              <div className="card-body">
                <p className="card-title">一年股價報酬率</p>
                <p className="card-text">23.78%</p>
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
                <p className="card-title">殖利率</p>
                <p className="card-text">23.78%</p>
              </div>
            </div>
            <div className="card col-3">
              <div className="card-body">
                <p className="card-title">三年股價報酬率</p>
                <p className="card-text">23.78%</p>
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
