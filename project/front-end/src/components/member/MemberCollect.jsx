import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
// import "../../styles/memberCol.css";
import "../../styles/member.css";
import "../../styles/forum_main.css";

const MemberCollect = () => {
    const [messages, setMessages] = useState([]);
    const [uid, setUid] = useState("");
    const [mid, setMid] = useState("");
    const [stats, setStats] = useState("");
    const [dataFromDB, setDataFromDB] = useState([]);
    // 顯示彈跳視窗
    const [modalOpen, setModalOpen] = useState(false);
    // 顯示我選的message
    const [selectedMessage, setSelectedMessage] = useState("");
    // 顯示當前頁數
    const [currentPage, setCurrentPage] = useState(1);
    // 每頁顯示幾則內容
    const [messagesPerPage] = useState(4);
    useEffect(() => {
      axios
        .get("http://localhost:3000/member/col", { withCredentials: true })
        .then((res) => {
          console.log(res.data);
          setDataFromDB(res.data);
          // setUid(res.data.uid);
          // setMid(res.data.mid);
          setMessages(res.data);
          // // 更新stats的值
          // setStats(res.data.stats);
        })
        .catch((err) => console.log(err));
    }, []);
  //取消按鈕功能
    const handleCancel = (faid) => {
      axios
        .put("http://localhost:3000/member/col/cancel", { faid })
        .then((res) => {
          console.log("資料庫中的collect已成功更新");
          // 更新前端的資料，將對應的消息的 collect 設為 0
          setDataFromDB((prevData) =>
            prevData.map((item) =>
              item.faid === faid ? { ...item, collect: 0 } : item
            )
          );
        })
        .catch((err) => console.log(err));
    };

  // 顯示彈跳視窗內容
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
              prevMessage.mid === message.mid
                ? { ...prevMessage, stats: 1 }
                : prevMessage
            )
          );
        })
        .catch((err) => console.log(err));
    } else {
      console.log("message.stats不是null");
    }
  };

  // 關閉彈跳視窗
  const handleCloseModal = () => {
    setSelectedMessage("");
    setModalOpen(false);
  };

  // 獲取當前顯示的消息
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = dataFromDB.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );

  // 計算總頁數
  const totalPages = Math.ceil(dataFromDB.length / messagesPerPage);

  // 切換到上一頁
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // 切換到下一頁
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  // 刪除信件
  //   const handleDelete = (message) => {
  //     const confirmDelete = window.confirm("確定要刪除郵件嗎？");

  //     if (confirmDelete) {
  //       axios
  //         .delete(`http://localhost:3000/member/mail/${message.mid}`)
  //         .then((res) => {
  //           console.log("資料已成功刪除");
  //           setMessages((prevMessages) =>
  //             prevMessages.filter(
  //               (prevMessage) => prevMessage.mid !== message.mid
  //             )
  //           );
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //   };

  return (
    <>
      <div className="px-4 py-3 me-5">
        <p className="text-IronGray-Deep fs-3 fw-bold pb-2 border-bottom">
          我的收藏
        </p>
        <div className="mt-3">
          <div className="row mb-2 fw-bold fs-5 IronGray-Light rounded-3">
            <div className="col-1 px-4 py-2 text-center">#</div>
            <div className="col-6 px-4 py-2 text-center">文章標題</div>
            <div className="col-3 px-4 py-2 text-center">作者</div>
            <div className="col-2 px-4 py-2 text-center">#</div>
          </div>
          {currentMessages.map((item, index) => (
            <div className="row mb-2 fz-3 bg-white rounded-3" key={index}>
              <div className="col-1 px-4 py-2 text-center">{index + 1}</div>
              <div className="col-6 px-4 py-2 text-truncate">
                {item.fatitle}
              </div>
              <div className="col-3 px-4 py-2 text-center text-truncate">
                {item.name}
              </div>
              <div className="col-2 px-4 py-2 text-center">
                <button
                  onClick={() => handleCancel(item.faid)}
                  className="deleteBtn text-IronGray-Deep IronGray-Light rounded-3 border-0 px-3 py-2"
                >
                  取消
                </button>
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
    </>
  );
};

export default MemberCollect;
