import React from "react";
import Linechart from "../components/linechart";
import "../styles/indStock.css";

const IndStock = () => {
  return (
    <>
      {/* 背景 */}
      <svg
        width={616}
        height={1091}
        viewBox="0 0 616 1091"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "fixed", top: 0, zIndex: -1 }}
      >
        <g filter="url(#filter0_f_447_2649)">
          <rect
            x="483.46"
            y="510.051"
            width="594.895"
            height="572.997"
            rx="286.498"
            transform="rotate(131.15 483.46 510.051)"
            fill="#B4C7DD"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_447_2649"
            x="-471.708"
            y="0.753906"
            width="1087.42"
            height="1089.49"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation={125}
              result="effect1_foregroundBlur_447_2649"
            />
          </filter>
        </defs>
      </svg>
      <svg
        width={494}
        height={777}
        viewBox="0 0 494 777"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "fixed", right: 0, bottom: 0, zIndex: -1 }}
      >
        <g filter="url(#filter0_f_447_2648)">
          <rect
            x={250}
            y={250}
            width={424}
            height={424}
            rx={212}
            fill="#F58B82"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_447_2648"
            x={0}
            y={0}
            width={924}
            height={924}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation={125}
              result="effect1_foregroundBlur_447_2648"
            />
          </filter>
        </defs>
      </svg>
      {/* 主要內容 */}
      <div className="container">
        {/* 個股名稱 */}
        <div className="name text-center d-flex align-items-center">
          <div style={{ width: "100%" }}>
            <span id="indStocksNumber">2330</span>
            <span className="mx-2"> - </span>
            <span id="indStocksName">台灣積體電路製造</span>
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
                作為全球最大的晶圓代工廠商，台積電提供給全球各種規模的半導體設計公司製造高品質的晶圓產品。公司擁有先進的製程技術，包括16納米、7納米、5納米等。這些製程技術能夠生產出高性能、低功耗的芯片，廣泛應用於各種領域，包括個人電腦、智能手機、物聯網、人工智慧、高效能伺服器等。
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
                <p className="card-text">568</p>
              </div>
            </div>
            <div className="card col-3">
              <div className="card-body">
                <p className="card-title">最低</p>
                <p className="card-text">568</p>
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
                <p className="card-text">568</p>
              </div>
            </div>
            <div className="card col-3">
              <div className="card-body">
                <p className="card-title">交易量</p>
                <p className="card-text">568476</p>
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
                <p className="card-text">568</p>
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
    </>
  );
};

export default IndStock;
