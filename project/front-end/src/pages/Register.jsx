import React from "react";
import Navbar from "../components/Nav";
import "../styles/register.css"
import Sidebar from "../components/Sidebar";

const Register = () => {
  return (
    <>
    <Navbar></Navbar>
    
    <div className="register-area container">
      <p className="text-center register-title">會員註冊</p>
      <hr />
      <div className="text-center input-row">
        <span>姓名:</span>
        <input className="regi-input" type="text" />
      </div>
      <div className="text-center input-row-radio">
        <span>性別:</span>
        <div className="sexoption">
          <input
            className="inputradio inputradio-male"
            type="radio"
            defaultValue="male"
          />
          <label htmlFor="male">男</label>
          <input className="inputradio inputradio-female" type="radio" defaultValue="female" />
          <label htmlFor="female">女</label>
        </div>

      </div>
      <div className="text-center input-row">
        <span>帳號:</span>
        <input className="regi-input" type="text" />
      </div>
      <div className="text-center input-row">
        <span>密碼:</span>
        <input className="regi-input" type="text" />
      </div>
      <div className="text-center input-row pwdc">
        <span>確認密碼:</span>
        <input className="regi-input" type="text" />
      </div>
      <div className="text-center input-row pwdc">
        <span>電子信箱:</span>
        <input className="regi-input" type="text" />
      </div>
      <div className="text-center">
        <button className="register-btn">註冊</button>
      </div>
      <div className="register-fast">
        <div className="register-fast-row">
          <img src="./img/memberimg/google.svg" alt="" />
          <p>google</p>
        </div>
        <div className="register-fast-row">
          <img src="./img/memberimg/fb.svg" alt="" />
          <p>Facebook</p>
        </div>
        <div className="register-fast-row">
          <img src="./img/memberimg/line.svg" alt="" />
          <p>Line</p>
        </div>
      </div>
    </div>

    
    </>
  );
};

export default Register;
