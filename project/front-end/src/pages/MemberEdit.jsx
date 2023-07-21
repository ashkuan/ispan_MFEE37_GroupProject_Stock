import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/member.css";
const MemberEdit = () => {
  return (
    <>
      <Sidebar />
      <div className="main-content flex-grow-1 p-3 ">
        <p className="mt-5 member-info">會員資訊</p>
        <hr />
        <div className="memberpage-info ">
          <div className="mb-4 memberpic">
            <img src="./img/sidesbar/Mask Group.svg" alt="" />
          </div>
          <div className="mb-4">
            <span>會員姓名:</span>
            <input type="text" />
          </div>
          <div className="mb-4">
            <span>會員帳號:</span>
            <input type="text" />
          </div>
          <div className="mb-4">
            <span>會員密碼:</span>
            <input type="text" />
          </div>
          <div className="mb-4">
            <span>會員信箱:</span>
            <input type="text" />
          </div>
          <div className="mb-4 edit-btn">
            <div />
            <div />         
              <button>儲存編輯</button>
            <div />
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberEdit;
