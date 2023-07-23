import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/sideShopBar.css";

const SideShopBar = () => {
  const uid = sessionStorage.getItem("uid");
  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const photopath = sessionStorage.getItem("photopath");

  const [userData, setUserData] = useState("");
  const [dataAccount, setDataAccount] = useState("");
  const fetchUidPhoto = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5566/shop/history/uidPhoto",
        { uid }
      );
      // console.log(res.data);
      // console.log(res.data.photopath);
      setUserData(res.data);
    } catch (err) {
      console.log("歷史訂單載入失敗");
      console.log(err);
    }
  };
  const countHistoryData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5566/shop/history/countHistoryData",
        { uid }
      );
      console.log("countHistoryData後端連接成功");
      //   console.log(res.data[0]["COUNT(oid)"]);
      setDataAccount(res.data[0]["COUNT(oid)"]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    axios
      .post("http://localhost:3000/logout") // 发送 POST 请求到 /logout 路由
      .then((response) => {
        sessionStorage.removeItem("uid");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("photopath");

        // 登出成功的处理逻辑
        // console.log(response.data); // 可根据需要处理返回的响应数据
        // 进行重定向或其他操作
        window.location.href = "/";
      })
      .catch((error) => {
        // 登出失败的处理逻辑
        console.error(error);
        // 进行错误处理或其他操作
      });
  };

  useEffect(() => {
    fetchUidPhoto();
    countHistoryData();
  }, []);

  return (
    <>
      {userData && (
        <div>
          <img src={`/img/memberimg/member/${userData[0].photopath}`} />
          <p className="name">{userData[0].name}</p>
          <div className="email">{userData[0].email}</div>
          <div className="side side-main">
            <Link to="/shop/history">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="currentColor"
                className="bi bi-bag"
                viewBox="0 0 25 20"
              >
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
              歷史訂單 ({dataAccount})
            </Link>
          </div>
          <div className="side">
            <Link to="/member">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 25 19"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
              會員資料
            </Link>
          </div>
          <div className="side">
            <Link to="/" onClick={handleLogout}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-box-arrow-right"
                viewBox="0 0 23 18"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                />
                <path
                  fillRule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                />
              </svg>
              登出
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SideShopBar;
