import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../components/Sidebar";
import MemberInfoEdit from "../components/member/MemberInfoEdit";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import "../styles/member.css";
import "../styles/forum_main.css";

const MemberEdit = () => {
  const uid = sessionStorage.getItem("uid");
  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const photopath = sessionStorage.getItem("photopath");
  const password = sessionStorage.getItem("password");

  // const [password, setPassword] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/member", { withCredentials: true })
      .then((res) => {
        // setUid(res.data.uid);
        // setName(res.data.name);
        // setEmail(res.data.email);
        // setPassword(res.data.password);
        // setPhotopath(res.data.photopath);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div style={{ height: "6rem" }}></div>
      <div className="d-flex justify-content-center">
        <div
          className="vh-83 drop-shadow-20 position-fixed rounded-4 bg-Primary-Gray text-IronGray-Deep mt-3"
          style={{ width: "75rem" }}>
          {/* 自選背景顏色 */}
          <div>
            <Form.Label
              htmlFor="changeBgColor"
              className="d-none">
              更改背景顏色
            </Form.Label>
            <Form.Control
              type="color"
              id="changeBgColor"
              defaultValue="#57687C"
              title="Choose your color"
              className="border-0 bg-Primary-Gray"
            />
          </div>
          {/* 會員頭像 與 歡迎詞 */}
          <div className="d-flex">
            <div className="memberpic d-flex justify-content-center align-items-center">
              <img src={`http://localhost:3000/${photopath}`} alt="大頭照" />
            </div>
            <div className="mt-2">
              <span className="ps-4 py-3 fs-3 fw-bold text-Pink-Deep">{name}</span>
              <span className="ps-4 py-3 fs-4">歡迎回來！</span>
            </div>
          </div>
          {/* 側邊欄 與 內容 */}
          <div className="row vh-100">
            {/* 側邊欄 */}
            <aside className="col-3">
              <Sidebar />
            </aside>
            {/* 內容 */}
            <main className="col-9">
              <MemberInfoEdit />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberEdit;