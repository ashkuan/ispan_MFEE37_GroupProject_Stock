import React, { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import "../styles/history.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SideShopBar from "../components/shop/SideShopBar";
import Footer from "../components/Footer";
import HistoryProducts from "../components/shop/HistoryProducts";

const History = () => {
  const [historyData, setHistoryData] = useState("");
  const [totalAccount, setTotalAccount] = useState([]);
  const [firstPimg, setFirstPimg] = useState([]);
  const [firstPname, setFirstPname] = useState([]);
  const navigate = useNavigate();
  const uid = sessionStorage.getItem("uid");
  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const photopath = sessionStorage.getItem("photopath");

  // 檢查是否有登入會員
  useEffect(() => {
    if (!uid) {
      console.log(uid);
      console.log("請先登入會員");
      navigate("/loginPage");
    }
  }, []);

  return (
    <>
      <Nav></Nav>
      {/* <!-- 主要內容 --> */}
      <div className="history_container">
        <div>
          <div className="bread">
            <Link to="/shop">商城</Link> &gt; <Link to="#">歷史訂單</Link>
          </div>
          <div className="title">歷史訂單</div>
        </div>
        <div className="mainContent">
          <div className="left">
            <HistoryProducts></HistoryProducts>
          </div>
          <div className="right">
            <SideShopBar></SideShopBar>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default History;
