import React from "react";
import "../styles/MemberArtical.css"
import Sidebar from "../components/Sidebar";

const MemberArtical = () => {
  return (
    <>
      <Sidebar></Sidebar>
      <div className="main-content flex-grow-1 p-3">
        <p className="mt-5 art-info">我的文章</p>
        <hr />
        <div className="art-list">
          <table className="table1">
            <thead>
              <tr className="header-row">
                <th className="text-center">標題</th>
                <th className="text-center">日期</th>
                <th className="text-center">內容</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr className="art-row">
                <td className="art-title">我的今日焦點股</td>
                <td>2023/6/6</td>
                <td>認真問 為什麼這種EPS從沒翻正過的股票 ...</td>
                <td className="text-center">
                  <button className="del-btn">刪除</button>
                </td>
              </tr>
              <tr className="art-row">
                <td className="art-title">我的今日焦點股</td>
                <td>2023/6/6</td>
                <td>認真問 為什麼這種EPS從沒翻正過的股票 ...</td>
                <td className="text-center">
                  <button className="del-btn">刪除</button>
                </td>
              </tr>
              <tr className="art-row">
                <td className="art-title">我的今日焦點股</td>
                <td>2023/6/6</td>
                <td>認真問 為什麼這種EPS從沒翻正過的股票 ...</td>
                <td className="text-center">
                  <button className="del-btn">刪除</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MemberArtical;
