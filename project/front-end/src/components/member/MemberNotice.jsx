import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import "../../styles/member.css";
import "../../styles/forum_main.css";

const MemberNotice = () => {
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
  const [messagesPerPage] = useState(3);
  // 新增狀態用來記錄符合條件的資料數量
  const [statsCount, setStatsCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/member/mail", { withCredentials: true })
      .then((res) => {
        // console.log(res.data);

        setUid(res.data.uid);
        setMid(res.data.mid);
        setMessages(res.data.messages);
        // 更新stats的值
        setStats(res.data.stats);
        // 計算符合條件的資料數量
        const count = res.data.messages.filter(
          (message) => message.stats === null
        ).length;
        setStatsCount(count);
      })
      .catch((err) => console.log(err));
  }, [messages]);

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
  const currentMessages = messages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );

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
            prevMessages.filter(
              (prevMessage) => prevMessage.mid !== message.mid
            )
          );
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div className="px-4 py-3 me-5">
        <div className="d-flex ">
          <p className="text-IronGray-Deep fs-3 fw-bold pb-2 border-bottom">
            會員公告
          </p>
          {/* 顯示符合條件的資料數量 */}
          <div className="text-IronGray-Deep fs-5 noreadbtn ">
            <div>{statsCount}</div>
          </div>
        </div>

        {/* 會員公告信件 */}
        <div className="mt-3 fs-5">
          {currentMessages.map((message, index) => (
            <div
              className="rounded-3 bg-white d-flex align-items-center mb-3 px-2"
              as={Row}
            >
              <Col sm={10} className="p-3">
                <a
                  key={index}
                  href="#"
                  onClick={() => handleOpenModal(message)}
                  className={`line-cut-1 border-0   ${
                    message.stats === 1 ? "readcolor" : "text-IronGray-Deep"
                  }`}
                >
                  {message.message}
                </a>
              </Col>
              <Col sm={2} className="text-center">
                <button
                  className="deleteBtn text-IronGray-Deep IronGray-Light rounded-3 border-0 px-3 py-2"
                  onClick={() => handleDelete(message)}
                >
                  刪除
                </button>
              </Col>
            </div>
          ))}
        </div>

        {/* 彈跳視窗 Modal */}
        <Modal
          show={modalOpen}
          onHide={handleCloseModal}
          backdrop="static"
          keyboard={false}
          className="top-20 fs-4 text-IronGray-Deep "
        >
          <Modal.Body>
            <p className="px-4 py-3">{selectedMessage.message}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={handleCloseModal}
              className="letter-spacing-0_2 fs-5 px-3 py-2"
            >
              關閉
            </Button>
          </Modal.Footer>
        </Modal>

        {/* 切換頁面 */}
        <div className="mt-4 d-flex justify-content-center">
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
    </>
  );
};

export default MemberNotice;
