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
                class="bi bi-bag"
                viewBox="0 0 25 20"
              >
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
              歷史訂單 ({dataAccount})
            </Link>
          </div>
          <div className="side">
            <Link to="/member">會員資料</Link>
          </div>
          <div className="side">
            <Link to="/" onClick={handleLogout}>
              登出
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SideShopBar;
