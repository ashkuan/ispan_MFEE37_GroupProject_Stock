import React, { useContext, useEffect } from "react";
import "../styles/orderSuccess.css";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

const OrderSuccess = () => {
  const uid = sessionStorage.getItem("uid");
  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const photopath = sessionStorage.getItem("photopath");

  useEffect(() => {
    const fetchOid = async () => {
      try {
        const res = await axios.post("/shop/orderSuccess", { oid });
        // console.log(oid);
        console.log(res.data);
      } catch (err) {
        console.log("Error response data:", err.response.data);
        console.log("Error status code:", err.response.status);
        console.log("Error headers:", err.response.headers);
        console.log(err);
      }
    };
    fetchOid();
  }, []);

  return (
    <>
      <div className="container orderSuccessContainer">
        <p
          className="mb-5"
          style={{
            fontSize: "4rem",
            fontWeight: "700",
            letterSpacing: "0.8px",
          }}
        >
          訂單狀態
        </p>
        <div className="myalert" role="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            fill="currentColor"
            className="bi bi-check-circle me-3"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
          </svg>
          <span className="fs-4 fw-normal">您的訂單已完成</span>
        </div>

        <div style={{ marginTop: "100px" }}>
          <p className="fs-4 mb-4">感謝您的購買！{name}，您的訂單已成立。</p>
          <p className="fs-4">
            訂單尚未進入物流程序，我們會在寄送之後以email通知您。
          </p>
        </div>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            className="bi bi-card-checklist"
            viewBox="0 0 16 16"
          >
            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
            <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z" />
          </svg>
          <Link to="">查看或管理訂單資訊</Link>
        </button>
        <div className="orderList">
          <div>
            <p className="orderTitle">訂單編號</p>
            <p className="orderContent"> 253346453</p>
          </div>
          <div>
            <p className="orderTitle">訂單日期</p>
            <p className="orderContent">2023-07-19</p>
          </div>
          <div>
            <p className="orderTitle">總計</p>
            <p className="orderContent">NT$ 1950</p>
          </div>
          <div>
            <p className="orderTitle">送貨地址</p>
            <p className="orderContent">台中市南屯區公益路二段51號18樓</p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default OrderSuccess;
