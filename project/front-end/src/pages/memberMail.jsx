import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/mail.css";
const MemberMail = () => {
  return (
    <>
      <Sidebar></Sidebar>
      <div className="main-content flex-grow-1 p-3">
        <p className="mt-5 member-info">會員公告</p>
        <hr />
        <div className="mailpage-info ">
          <div className="newmail-row d-flex">
            <span className="newmail">新郵件</span>
            <div className="newmail-number">
              <div>2</div>
            </div>
          </div>
          <div className="col">
            <div className="d-flex justify-content-around mail-row">
              <span className="mail-content">
                恭喜成為會員! 請收取折價金300元,可以在商城使用...
              </span>
              <button className="mail-btn">點擊</button>
              <div />
            </div>
            <div className="d-flex justify-content-around mail-row">
              <span className="mail-content">
                恭喜成為會員! 請收取折價金300元,可以在商城使用...
              </span>
              <button className="mail-btn">點擊</button>
              <div />
            </div>
            <div className="d-flex justify-content-around mail-row read">
              <span className="mail-content">你好.歡迎成為會員David...</span>
              <button className="mail-btn">點擊</button>
              <div />
            </div>
            <div className="d-flex justify-content-around mail-row read">
              <span className="mail-content">你好.歡迎成為會員David...</span>
              <button className="mail-btn">點擊</button>
              <div />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberMail;
