import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../styles/member.css";
import "../../styles/forum_main.css";

const MyArtical = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  //編輯文章的彈跳
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState();
  const [currentArticle, setCurrentArticle] = useState(null); // 追加
  const [articleTitle, setArticleTitle] = useState("");
  const handleEdit = (article) => {
    setCurrentArticle(article);
    setInputValue(article.farticle);
    setArticleTitle(article.fatitle);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    console.log("要保存的输入值：", inputValue);
    // 將編輯後的文章內容傳送到後端
    const updatedArticle = {
      ...currentArticle,
      fatitle: articleTitle,
      farticle: inputValue,
    };

    axios
      .put(`http://localhost:3000/member/artical/${updatedArticle.faid}`, updatedArticle, { withCredentials: true })
      .then((response) => {
        console.log("文章已更新到資料庫:", response.data);
        handleCloseModal();
        // 重新載入文章列表，以顯示更新後的內容
        fetchArticles();
      })
      .catch((error) => {
        console.error("更新文章時發生錯誤:", error);
      });
  };
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = () => {
    axios
      .get("http://localhost:3000/member/artical", { withCredentials: true })
      .then((response) => {
        // console.log(response.data[1]);
        setArticles(response.data);

        setInputValue(response.data.farticle);
        // setMessages(res.data.messages);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 每頁顯示的文章數量
  const articlesPerPage = 3;

  // 計算總頁數
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  // 取得當前頁面的文章
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

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
            prevArticles.filter(
              (prevArticle) => prevArticle.faid !== article.faid
            )
          );
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <div className="px-4 py-3 me-5">
        <p className="text-IronGray-Deep fs-3 fw-bold pb-2 border-bottom">
          我的文章
        </p>
        <div className="mt-3">
          <div className="row mb-2 fw-bold fs-5 IronGray-Light rounded-3">
            <div className="col-5 ps-4 py-2">文章標題</div>
            <div className="col-3 py-2 text-center">發文時間</div>
            <div className="col-1" />
            <div className="col-3" />
          </div>
          {/* 我的文章 */}
          {currentArticles.map((article) => (
            <div
              key={article.faid}
              className="row mb-2 fz-3 bg-white rounded-3"
            >
              <div className="col-5 px-4 py-2">
                <div className="line-cut-2">{article.fatitle}</div>
              </div>
              <div className="col-3 px-4 py-2 text-center">
                {article.createTime.substring(0, 10)}
              </div>
              <div className="col-1 d-none px-4 py-2">{article.farticle}</div>
              <div className="col-3 px-4 py-2">
                <div className="d-flex justify-content-center">
                  <button
                    onClick={() => handleEdit(article)}
                    className="deleteBtn text-IronGray-Deep IronGray-Light rounded-2 border-0 px-2 py-1 fz-4 me-4"
                  >
                    編輯
                  </button>
                  <button
                    className="deleteBtn text-IronGray-Deep IronGray-Light rounded-2 border-0 px-2 py-1 fz-4"
                    onClick={() => handleDelete(article)}
                  >
                    刪除
                  </button>
                </div>
              </div>
            </div>
          ))}
          {/* 切換頁面 */}
          <div className="mt-3 d-flex justify-content-center">
            <Pagination>
              <Pagination.First disabled={currentPage === 1}>
                <span className="fz-3 text-IronGray">&laquo;</span>
              </Pagination.First>
              <Pagination.Prev
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                <span className="fz-3 text-IronGray">&lt;</span>
              </Pagination.Prev>
              <Pagination.Item active>
                <span className="fz-3">{currentPage}</span>
              </Pagination.Item>
              <Pagination.Next
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                <span className="fz-3 text-IronGray">&gt;</span>
              </Pagination.Next>
              <Pagination.Last disabled={currentPage === totalPages}>
                <span className="fz-3 text-IronGray">&raquo;</span>
              </Pagination.Last>
            </Pagination>
          </div>
        </div>
      </div>
      {/* 彈跳視窗 */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="top-5">
        <Modal.Header
          className="IronGray text-white"
          closeButton>
          <Modal.Title
            className="fs-3 px-3 py-2">
            編輯文章
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="px-5 py-4 fs-4">
          <div>
            <div
              className="fw-bold mb-2">
              文章標題
            </div>
            <input
              type="text"
              value={articleTitle}
              style={{ width: "100%" }}
              onChange={(e) => setArticleTitle(e.target.value)}
              className="border-0 rounded-2 px-3 py-2 fs-5"
            />
          </div>
          <div
            className="fw-bold mb-2 mt-4">
            文章內容
          </div>
          <textarea
            value={inputValue}
            style={{ width: "100%", height: 300, resize: "vertical" }}
            onChange={(e) => setInputValue(e.target.value)}
            className="border-0 px-3 py-2 rounded-1 fs-5"
          />
        </Modal.Body>
        <Modal.Footer
          className="px-5 py-4">
          <Button
            variant="secondary"
            onClick={handleCloseModal}
            className="px-3 py-2 letter-spacing-0_2 fz-3 me-3">
            取消
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            className="px-3 py-2 letter-spacing-0_2 fz-3">
            儲存
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyArtical;
