import React from "react";
import "../styles/stockindex.css";
import LineChart from "../components/linechart";
import Doughnut from "../components/DoughnutCharts";
import StockIndexAcc from "../components/StockindexAcc";
import FinanceChart from "../components/stockindex/finance";
import ComputerChart from "../components/stockindex/computer";
import SemiChart from "../components/stockindex/semiconductor";
import ElecChart from "../components/stockindex/electronic";
import TextileChart from "../components/stockindex/Textile";
import CarChart from "../components/stockindex/car";
import FoodChart from "../components/stockindex/food";
import ChemicalChart from "../components/stockindex/chemical";
import GlassChart from "../components/stockindex/glass";
import Footer from "../components/Footer";

const IndStock = () => {
  return (
    <>
      <div className="container">
        <div className="part1-text-container">
          <p className="part1-text">大盤指數</p>
        </div>
        <div className="d-flex">
          <div className="inchart">
            <LineChart></LineChart>
            <div className="text-end ">
              
            </div>
          </div>
          <div className="part1-row ">
            <div className="d-flex first-row">
              <div className=" part1-card ">
                <div className="part1-card-text">加權指數</div>
              </div>
              <div className="part1-chart-container">
                <Doughnut></Doughnut>
              </div>
              <div className="part1-row-number">
                <p>17,140.77</p>
              </div>
            </div>
            <div className="d-flex first-row">
              <div className=" part1-card ">
                <div className="part1-card-text">櫃買指數</div>
              </div>
              <div className="part1-chart-container">
                <Doughnut></Doughnut>
              </div>
              <div className="part1-row-number">
                <p>226.15</p>
              </div>
            </div>
            <div className="d-flex first-row">
              <div className=" part1-card ">
                <div className="part1-card-text">台股成交</div>
              </div>
              <div className="part1-chart-container">
                <Doughnut></Doughnut>
              </div>
              <div className="part1-row-number">
                <p>2,747,477</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StockIndexAcc></StockIndexAcc>
      <div className="container">
        <div className="part1-text-container ">
          <p className="part1-text">產業指數</p>
        </div>
        <div className="d-flex">
          <div className="finance-text-area">
            <a href="./industrypage.html">
              {" "}
              <p className="industry-title text-center">金融科技</p>
            </a>
            <div className="finance-stats">
              <p>近三個月漲跌幅</p>
              <div className="d-flex">
                <div className="svgcontainer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    color="white"
                    width={30}
                    height={30}
                    fill="currentColor"
                    className="bi bi-arrow-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                    />
                  </svg>
                </div>
                <p className="stock-prescent">16.3%</p>
              </div>
            </div>
            <div className="stock-content">
              金融股是指從事金融業務的公司股票。金融股包括銀行、保險公司、證券公司和其他金融機構。
              這些公司在金融體系中扮演關鍵角色，提供貸款、儲蓄、投資、風險管理和其他金融產品和服務。
              金融股通常受到經濟狀況、利率變動、監管政策和市場情緒等因素的影響，
              並對整個股市的表現和穩定性產生重要影響。
            </div>
          </div>
          <div className="finance-canvas">
            <FinanceChart></FinanceChart>
          </div>
        </div>
      </div>
      <div className="stock-rows">
        <div className="d-flex">
          <ComputerChart></ComputerChart>
          <SemiChart></SemiChart>
          <ElecChart></ElecChart>
          <TextileChart></TextileChart>
        </div>
        <div className="d-flex">
          <CarChart></CarChart>
          <FoodChart></FoodChart>
          <ChemicalChart></ChemicalChart>
          <GlassChart></GlassChart>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default IndStock;
