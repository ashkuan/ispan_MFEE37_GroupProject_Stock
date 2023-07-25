import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import "../../styles/member.css";
import "../../styles/forum_main.css";

const MemberCollect = () => {
  // const uid = sessionStorage.getItem("uid");
  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const photopath = sessionStorage.getItem("photopath");
  const password = sessionStorage.getItem("password");
  console.log(photopath);
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
  const [messagesPerPage] = useState(3);

  // 重新渲染組件的函數
  const forceUpdate = () => {
    setCurrentPage(1); // 重新設置當前頁數為第一頁
  };

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
        // 在資料庫更新成功後，重新取得最新的資料
        axios
          .get("http://localhost:3000/member/col", { withCredentials: true })
          .then((res) => {
            console.log(res.data);
            setDataFromDB(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // 在 dataFromDB 改變時觸發重新渲染
    setCurrentPage(1); // 重新設置當前頁數為第一頁
  }, [dataFromDB]);

  // 顯示彈跳視窗內容
  const handleOpenModal = (item) => {
    setSelectedMessage(item);
    setModalOpen(true);

    // if (message.stats === null) {
    //   const updatedStats = 1;

    //   axios
    //     .put("http://localhost:3000/member/mail/updateStats", {
    //       mid: message.mid,
    //     })
    //     .then((res) => {
    //       console.log("資料庫中的stats已成功更新");
    //       // 更新前端的stats狀態值
    //       setMessages((prevMessages) =>
    //         prevMessages.map((prevMessage) =>
    //           prevMessage.mid === message.mid
    //             ? { ...prevMessage, stats: 1 }
    //             : prevMessage
    //         )
    //       );
    //     })
    //     .catch((err) => console.log(err));
    // } else {
    //   console.log("message.stats不是null");
    // }
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
            <div className="col-2 px-4 py-2 text-center"></div>
          </div>
          {currentMessages.map((item, index) => (
            <div className="row mb-2 fz-3 bg-white rounded-3" key={item.faid}>
              <div className="col-1 px-4 py-2 text-center">{index + 1}</div>
              <Col sm={6} className="p-3">
                <a
                  key={index}
                  href="#"
                  onClick={() => handleOpenModal(item)}
                  className={`line-cut-2 border-0 text-IronGray-Deep text-IronGray-Light 
                  }`}
                >
                  {item.fatitle}
                </a>
              </Col>
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
          {/* 彈跳視窗 Modal */}
          <Modal
            show={modalOpen}
            onHide={handleCloseModal}
            backdrop="static"
            keyboard={false}
            className="top-20 fs-4 text-IronGray-Deep modalop"
          >
            <Modal.Body>
              <h3 className="px-4 py-3">{selectedMessage.fatitle}</h3>
              {/* 在這裡顯示內文 */}
              <p className="px-4 py-3 modlatext">{selectedMessage.farticle}</p>
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
