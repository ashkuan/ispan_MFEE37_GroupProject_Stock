import React from "react";
import "../styles/MemberArtical.css";
import Sidebar from "../components/Sidebar";

const MemberArtical = () => {
  return (
    <>
      <Sidebar></Sidebar>
      <div className="main-content flex-grow-1 p-3">
        <p className="mt-5 art-info">我的文章</p>
        <hr />
        <div className="col-list">
          <table className="table1">
            <thead>
              <tr className="header-row">
                <th className="text-center art-header">標題</th>
                <th className="text-center  art-time">發文時間</th>
                <th className="text-center  art-author">內容</th>
                <th className=" col-blank" />
              </tr>
            </thead>
            <tbody>
              <tr className="art-row">
                <td className="art-td-header text-left">
                  <div className=" art-title">我的今日焦點股</div>
                </td>
                <td className="text-center">
                  <div className="art-td-time">2023/01/17</div>
                </td>
                <td>
                  <div className="text-center  art-td-contant">
                    認真問 從沒翻正過的股票 ...
                  </div>
                </td>
                <td className="art-text-center">
                  <button className="del-btn art-btn">刪除</button>
                </td>
              </tr>
              <tr className="art-row">
                <td className="art-td-header text-left">
                  <div className=" art-title">論不成功投資者的樣貌</div>
                </td>
                <td className="text-center">
                  <div className="art-td-time">2023/01/17</div>
                </td>
                <td>
                  <div className="text-center  art-td-contant">
                    理論看法更新：投資與人生哲學...
                  </div>
                </td>
                <td className="art-text-center">
                  <button className="del-btn art-btn">刪除</button>
                </td>
              </tr>
              <tr className="art-row">
                <td className="art-td-header text-left">
                  <div className=" art-title">0705台股盤前</div>
                </td>
                <td className="text-center">
                  <div className="art-td-time">2023/01/17</div>
                </td>
                <td>
                  <div className="text-center  art-td-contant">
                    台股開盤指數17055點下跌29點...
                  </div>
                </td>
                <td className="art-text-center">
                  <button className="del-btn art-btn">刪除</button>
                </td>
              </tr>
              <tr className="art-row">
                <td className="art-td-header text-left">
                  <div className=" art-title">個人新聞解讀及產業新聞</div>
                </td>
                <td className="text-center">
                  <div className="art-td-time">2023/01/17</div>
                </td>
                <td>
                  <div className="text-center  art-td-contant">
                    只要三分鐘，與股市不脫鉤 養成...
                  </div>
                </td>
                <td className="art-text-center">
                  <button className="del-btn art-btn">刪除</button>
                </td>
              </tr>
              <tr className="art-row">
                <td className="art-td-header text-left">
                  <div className=" art-title">專欄晚報精選文章</div>
                </td>
                <td className="text-center">
                  <div className="art-td-time">2023/01/17</div>
                </td>
                <td>
                  <div className="text-center  art-td-contant">
                    各位晚上好，昨晚有提到...
                  </div>
                </td>
                <td className="art-text-center">
                  <button className="del-btn art-btn">刪除</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="art-page-btn-container">
            <div className="art-page-btn-container-2">
              <button className="art-page-btn">上一頁</button>
              <button className="art-page-btn">下一頁</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberArtical;
