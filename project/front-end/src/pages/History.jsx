import React, { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import "../styles/history.css";
import axios from "axios";

const History = () => {
  const [historyData, setHistoryData] = useState("");
  // 載入歷史訂單
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://localhost:5566/shop/history");
        console.log("這是歷史訂單");
        console.log(res.data);
        setHistoryData(res.data);
      } catch (err) {
        console.log("歷史訂單載入失敗");
        console.log(err);
      }
    };
    fetchHistory();
    // console.log(historyData);
    historyData.map((data) => {
      // console.log(data);
      console.log("這是測試");
      console.log(data.pid.split(",")); // 訂單的第一筆資料
      // console.log(data.oid);
    });
  }, []);

  return (
    <>
      <Nav></Nav>
      {/* <!-- 主要內容 --> */}
      {historyData && (
        <div className="container history_container">
          <p className="title">歷史訂單</p>
          <hr />
          <div className="historyTitle">
            <div className="d-flex col-6 justify-content-start ps-5">
              <div>商品</div>
            </div>
            <div className="col-2">金額</div>
            <div className="col-2">數量</div>
            <div className="col-2">總額</div>
          </div>
          {historyData.map((data) => {
            return (
              <>
                <div className="card d-flex flex-row align-items-start">
                  {/* <!-- 購物車 - 左 -->*/}
                  <img
                    src="/public/img/navbar/background.svg"
                    className="card-img-top"
                  />
                  {/* <!-- 購物車 - 中 -->*/}
                  <div className="card-body d-flex flex-column align-items-start mx-1">
                    <p className="card-title fw-bold">全方位股票分析法</p>
                    <p className="amount">{data.pid.split(",")}項商品</p>
                    <p className="date">
                      購買日期：
                      <span>
                        {data.merchantTradeDate.slice(
                          0,
                          data.merchantTradeDate.length - 13
                        )}
                      </span>
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
              </>
            );
          })}
          <hr />
        </div>
      )}
    </>
  );
};

export default History;
