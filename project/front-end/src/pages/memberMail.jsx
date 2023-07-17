import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/mail.css";
import axios from "axios";
import MessageModal from "../components/MessageModal";

const MemberMail = () => {
  const [messages, setMessages] = useState([]);
  const [uid, setUid] = useState("");
  const [mid, setMid] = useState("");
  const [stats, setStats] = useState("");
  // 顯示彈跳視窗
  const [modalOpen, setModalOpen] = useState(false); 
  // 顯示我選的message
  const [selectedMessage, setSelectedMessage] = useState(""); 
  // 顯示當前頁數
  const [currentPage, setCurrentPage] = useState(1); 
  // 每頁顯示幾則內容
  const [messagesPerPage] = useState(5); 

  useEffect(() => {
    axios
      .get("http://localhost:3000/member/mail", { withCredentials: true })
      .then((res) => {
        setUid(res.data.uid);
        setMid(res.data.mid);
        setMessages(res.data.messages);
        // 更新stats的值
        setStats(res.data.stats); 
      })
      .catch((err) => console.log(err));
  }, []);

  const handleOpenModal = (message) => {
    setSelectedMessage(message);
    setModalOpen(true);

    if (message.stats === null) {
      const updatedStats = 1;

      axios
        .put("http://localhost:3000/member/mail/updateStats", {
          mid: message.mid,
        })
        .then((res) => {
          console.log("資料庫中的stats已成功更新");
          // 更新前端的stats狀態值
          setMessages((prevMessages) =>
            prevMessages.map((prevMessage) =>
              prevMessage.mid === message.mid ? { ...prevMessage, stats: 1 } : prevMessage
            )
          );
        })
        .catch((err) => console.log(err));
    } else {
      console.log("message.stats不是null");
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMessage("");
  };

  // 獲取當前顯示的消息
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

  // 計算總頁數
  const totalPages = Math.ceil(messages.length / messagesPerPage);

  // 切換到上一頁
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // 切換到下一頁
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  // 刪除信件
  const handleDelete = (message) => {
    const confirmDelete = window.confirm("確定要刪除郵件嗎？");
  
    if (confirmDelete) {
      axios
        .delete(`http://localhost:3000/member/mail/${message.mid}`)
        .then((res) => {
          console.log("資料已成功刪除");
          setMessages((prevMessages) =>
            prevMessages.filter((prevMessage) => prevMessage.mid !== message.mid)
          );
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <Sidebar></Sidebar>
      <div className="main-content flex-grow-1 p-3">
        <p className="mt-5 member-info">會員公告</p>
        <hr />
        <div className="mailpage-info">
          {currentMessages.map((message, index) => (
            <div
              key={index}
              className={`d-flex justify-content-around mail-row ${
                message.stats === 1 ? "mail-read" : ""
              }`}
            >
              <span className="mail-content">{message.message}</span>
              <button
                className="mail-btn"
                onClick={() => handleOpenModal(message)}
              >
                點擊
              </button>
              <button className="delete-btn" onClick={() => handleDelete(message)}>刪除</button>
            </div>
          ))}
        </div>
        <div className="pagination mail-page-btn-container">
          <button onClick={goToPreviousPage} disabled={currentPage === 1} className="mail-page-btn">
            上一頁
          </button>
          <span className="currentPage">{currentPage}</span>
          <button onClick={goToNextPage} disabled={currentPage === totalPages} className="mail-page-btn">
            下一頁
          </button>
        </div>
      </div>
      <MessageModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        message={selectedMessage.message} // 使用 selectedMessage.message
      />
    </>
  );
};

export default MemberMail;
