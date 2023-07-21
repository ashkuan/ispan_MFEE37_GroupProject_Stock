import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/memberCol.css";

const MemberCol = () => {
  return (
    <>
      <Sidebar></Sidebar>
      <div className="replacecol">

        <div className="main-content flex-grow-1 p-3">
          <p className="mt-5 art-info">我的收藏</p>
          <hr />
          <div className="col-list">
            <table className="table1">
              <thead>
                <tr className="header-row">
                  <th className="text-center col-header">標題</th>
                  <th className="text-center  col-author">作者</th>
                  <th className="text-center  col-time">發文時間</th>
                  <th className=" col-blank" />
                </tr>
              </thead>
              <tbody>
                <tr className="col-row">
                  <td className="col-td-header text-left">
                    <div className=" col-title">數位帳戶、網路銀行安全性</div>
                  </td>
                  <td>
                    <div className="text-center  col-td-author">2ak47z</div>
                  </td>
                  <td className="text-center">
                    <div className="col-td-time">2023/01/15</div>
                  </td>
                  <td className="col-text-center">
                    <button className="del-btn col-btn">刪除</button>
                  </td>
                </tr>
                <tr className="col-row">
                  <td className="col-td-header text-left">
                    <div className=" col-title">除息前一天買陽明是不是穩賺</div>
                  </td>
                  <td>
                    <div className="text-center col-td-author">阿ben</div>
                  </td>
                  <td className="text-center">
                    <div className="col-td-time">2023/04/23</div>
                  </td>
                  <td>
                    <button className="del-btn col-btn">刪除</button>
                  </td>
                </tr>
                <tr className="col-row">
                  <td className="col-td-header text-left">
                    <div className="col-title">外資高割離席,台股萬七進場做空</div>
                  </td>
                  <td>
                    <div className="text-center col-td-author">ASF999</div>
                  </td>
                  <td className="text-center">
                    <div className="col-td-time">2023/03/17</div>
                  </td>
                  <td>
                    <button className="del-btn col-btn">刪除</button>
                  </td>
                </tr>
                <tr className="col-row">
                  <td className="col-td-header text-left">
                    <div className=" col-title">台股太強了吧,我一路抱</div>
                  </td>
                  <td>
                    <div className="text-center  col-td-author">與我無關</div>
                  </td>
                  <td className="text-center">
                    <div className="col-td-time">2022/10/11</div>
                  </td>
                  <td>
                    <button className="del-btn col-btn">刪除</button>
                  </td>
                </tr>
                <tr className="col-row">
                  <td className="col-td-header text-left">
                    <div className=" col-title">長榮為何一直漲停呀?</div>
                  </td>
                  <td>
                    <div className="text-center  col-td-author">invest</div>
                  </td>
                  <td className="text-center">
                    <div className="col-td-time">2022/05/01</div>
                  </td>
                  <td>
                    <button className="del-btn col-btn">刪除</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="col-page-btn-container">
              <div className="col-page-btn-container-2">
                <button className="col-page-btn">上一頁</button>
                <button className="col-page-btn">下一頁</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberCol;
