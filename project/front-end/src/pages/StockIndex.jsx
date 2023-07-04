import React from "react";
import "../styles/stockindex.css";
import LineChart from "../components/linechart";
import Doughnut from "../components/DoughnutCharts";

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
              <p className="date-text">1天 5天 1個月 6個月 1年 2年 5年</p>
            </div>
          </div>
          <div className="part1-row ">
            <div className="d-flex first-row">
              <div className=" part1-card ">
                <div className="part1-card-text">加權指數</div>
              </div>
              <div className="part1-chart-container">
                <Doughnut></Doughnut>
                <canvas className="part1-card-chart" />
              </div>
              <div className="part1-row-percent">
                <p className="go-up">漲:45%</p>
                <p className="go-down">跌:45%</p>
              </div>
              <div className="part1-row-number">
                <p>16,666.77</p>
              </div>
            </div>
            <div className="d-flex first-row">
              <div className=" part1-card">
                <div className="part1-card-text">櫃買指數</div>
              </div>
              <div className="part1-chart-container">
                <canvas className="part1-card-chart2" />
              </div>
              <div className="part1-row-percent">
                <p className="go-up">漲:45%</p>
                <p className="go-down">跌:45%</p>
              </div>
              <div className="part1-row-number">
                <p>16,666.77</p>
              </div>
            </div>
            <div className="d-flex first-row">
              <div className=" part1-card">
                <div className="part1-card-text">台股成交</div>
              </div>
              <div className="part1-chart-container">
                <canvas className="part1-card-chart3" />
              </div>
              <div className="part1-row-percent">
                <p className="go-up">漲:45%</p>
                <p className="go-down">跌:45%</p>
              </div>
              <div className="part1-row-number">
                <p>16,666.77</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Doughnut></Doughnut>
    </>
  );
};

export default IndStock;
