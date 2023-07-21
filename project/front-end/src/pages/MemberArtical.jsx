import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import "../styles/memberArtical.css";

const MemberArtical = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = () => {
    axios
      .get("http://localhost:3000/member/artical", { withCredentials: true })
      .then((response) => {
        setArticles(response.data);
        // setMessages(res.data.messages);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 每頁顯示的文章數量
  const articlesPerPage = 5;

  // 計算總頁數
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  // 取得當前頁面的文章
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  // 切換到上一頁
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // 切換到下一頁
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
// 刪除文章
const handleDelete = (article) => {
  const confirmDelete = window.confirm("確定要刪除嗎？");

  if (confirmDelete) {
    axios
      .delete(`http://localhost:3000/member/artical/${article.faid}`)
      .then((res) => {
        console.log("資料已成功刪除");
        setArticles((prevArticles) =>
          prevArticles.filter((prevArticle) => prevArticle.faid !== article.faid)
        );
      })
      .catch((err) => console.log(err));
  }
};
  return (
    <>
      <Sidebar></Sidebar>
      <div className="replaceart">

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
                {currentArticles.map((article) => (
                  <tr key={article.faid} className="art-row">
                    <td className="art-td-header text-left">
                      <div className=" art-title">{article.fatitle}</div>
                    </td>
                    <td className="text-center">
                      <div className="art-td-time">{article.createTime.substring(0, 10)}</div>
                    </td>
                    <td>
                      <div className="text-center  art-td-contant">{article.farticle}</div>
                    </td>
                    <td className="art-text-center">
                      <button className="del-btn art-btn" onClick={() => handleDelete(article)}>刪除</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="art-page-btn-container">
              <div className="art-page-btn-container-2">
                <button onClick={goToPreviousPage} disabled={currentPage === 1} className="art-page-btn">
                  上一頁
                </button>
                <button onClick={goToNextPage} disabled={currentPage === totalPages} className="art-page-btn">
                  下一頁
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberArtical;
