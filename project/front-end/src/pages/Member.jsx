import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/member.css";
import { Link } from "react-router-dom";
import axios from "axios";


const Member = () => {
  const [uid, setUid] = useState(""); // 用于存储 UID 的状态
  const [name, setName] = useState(""); // 用于存储姓名的状态
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [photopath, setPhotopath] = useState(""); 
  

  useEffect(() => {
    axios
      .get("http://localhost:3000/member", { withCredentials: true })
      .then((res) => {
        setUid(res.data.uid); // 存储 UID 到 uid 状态
        setName(res.data.name); // 存储姓名到 name 状态
        setEmail(res.data.email)
        setPassword(res.data.password)
        setPhotopath(res.data.photopath)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Sidebar></Sidebar>
      <div className="main-content flex-grow-1 p-3 ">
        <p className="mt-5 member-info">會員資訊</p>
        <hr />
        <div className="memberpage-info ">
          <div className="mb-4 memberpic">
          <img src={photopath.replace("http://localhost:5173/",'')} alt="1234" />
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
            <input type="text"  value={password} readOnly/>
          </div>
          <div className="mb-4">
            <span>會員信箱:</span>
            <input type="text" value={email} readOnly/>
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
