import React from "react";
import { Nav } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import "../styles/history.css";

const History = () => {
  return (
    <>
      <Nav></Nav>
      <Sidebar></Sidebar>
      {/* <!-- 主要內容 --> */}
      <div className="history_container">
        <p className="title">歷史訂單</p>
        <hr />
        <div className="card d-flex flex-row align-items-start">
          {/* <!-- 購物車 - 左 -->
          <!-- 購物車內容-圖 --> */}
          <img
            src="/public/img/navbar/background.svg"
            className="card-img-top"
          />
          {/* <!-- 購物車 - 中 -->
          <!-- 購物車內容-文字 --> */}
          <div className="card-body d-flex flex-column align-items-start mx-1">
            <p className="card-title fw-bold">全方位股票分析法</p>
            <p className="amount">2項商品</p>
            <p className="date">
              購買日期：<span>2023/06/28</span>
            </p>
          </div>
          {/* <!-- 購物車 - 右 --> */}
          <div className="d-flex flex-column justify-content-between align-items-end mt-3">
            {/* <!-- 總額 --> */}
            <div className="total">
              總額NT$ <span>399</span>
            </div>
          </div>
        </div>
        <hr />
        <div className="card d-flex flex-row align-items-start">
          {/* <!-- 購物車 - 左 --> */}
          {/* <!-- 購物車內容-圖 --> */}
          <img
            src="/public/img/navbar/background.svg"
            className="card-img-top"
          />
          {/* <!-- 購物車 - 中 -->
          <!-- 購物車內容-文字 --> */}
          <div className="card-body d-flex flex-column align-items-start mx-1">
            <p className="card-title fw-bold">全方位股票分析法</p>
            <p className="amount">2項商品</p>
            <p className="date">
              購買日期：<span>2023/06/28</span>
            </p>
          </div>
          {/* <!-- 購物車 - 右 --> */}
          <div className="d-flex flex-column justify-content-between align-items-end mt-3">
            {/* <!-- 總額 --> */}
            <div className="total">
              總額NT$ <span>399</span>
            </div>
          </div>
        </div>
        <hr />
        <div className="card d-flex flex-row align-items-start">
          {/* <!-- 購物車 - 左 -->
          <!-- 購物車內容-圖 --> */}
          <img
            src="/public/img/navbar/background.svg"
            className="card-img-top"
          />
          {/* <!-- 購物車 - 中 -->
          <!-- 購物車內容-文字 --> */}
          <div className="card-body d-flex flex-column align-items-start mx-1">
            <p className="card-title fw-bold">全方位股票分析法</p>
            <p className="amount">2項商品</p>
            <p className="date">
              購買日期：<span>2023/06/28</span>
            </p>
          </div>
          {/* <!-- 購物車 - 右 --> */}
          <div className="d-flex flex-column justify-content-between align-items-end mt-3">
            {/* <!-- 總額 --> */}
            <div className="total">
              總額NT$ <span>399</span>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

export default History;
