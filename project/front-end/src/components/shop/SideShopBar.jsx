import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

const SideShopBar = () => {
  const {
    uid,
    setUid,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    photopath,
    setPhotopath,
  } = useContext(UserContext);
  const [userData, setUserData] = useState("");
  const [dataAccount, setDataAccount] = useState("");
  const fetchUidPhoto = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5566/shop/history/uidPhoto",
        { uid }
      );
      console.log(res.data);
      console.log(res.data.photopath);
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
        setUid("");
        setName("");
        setEmail("");
        setPassword("");
        setPhotopath("");
        // 登出成功的处理逻辑
        console.log(response.data); // 可根据需要处理返回的响应数据
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
        <div className="right">
          <img src={`/img/memberimg/member/${userData[0].photopath}`} />
          <p className="name">{userData[0].name}</p>
          <div className="email">{userData[0].email}</div>
          <div className="side side-main">
            <Link to="/shop/history">歷史訂單 ({dataAccount})</Link>
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
