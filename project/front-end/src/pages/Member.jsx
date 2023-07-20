import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/member.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Member = () => {
  const uid = sessionStorage.getItem("uid");
  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const photopath = sessionStorage.getItem("photopath");
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/member", { withCredentials: true })
      .then((res) => {
        setPassword(res.data.password);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Sidebar />
      <div className="main-content flex-grow-1 p-3 ">
        <p className="mt-5 member-info">會員資訊</p>
        <hr />
        <div className="memberpage-info ">
          <div className="mb-4 memberpic">
            <img src={`http://localhost:3000/${photopath}`} alt="大頭照" />
          </div>
          <div className="mb-4">
            <span>會員姓名:</span>
            <input type="text" value={name} readOnly />
          </div>
          <div className="mb-4">
            <span>會員帳號:</span>
            <input type="text" value={uid} readOnly />
          </div>
          <div className="mb-4">
            <span>會員密碼:</span>
            <input type="text" value={password} readOnly />
          </div>
          <div className="mb-4">
            <span>會員信箱:</span>
            <input type="text" value={email} readOnly />
          </div>
          <div className="mb-4 edit-btn">
            <div />
            <div />
            <Link to="/member/edit">
              <button>編輯資料</button>
            </Link>
            <div />
          </div>
        </div>
      </div>
    </>
  );
};

export default Member;
