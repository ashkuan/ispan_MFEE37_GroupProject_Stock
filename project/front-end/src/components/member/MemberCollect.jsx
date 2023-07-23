import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import "../../styles/member.css";
import "../../styles/forum_main.css";

const MemberCollect = () => {
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
                            prevMessage.mid === message.mid ? { ...prevMessage, stats: 1 } : prevMessage
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
            <div className="px-4 py-3 me-5">
                <p className="text-IronGray-Deep fs-3 fw-bold pb-2 border-bottom">我的收藏</p>
                <div className="mt-3">
                    <div className="row mb-2 fw-bold fs-5 IronGray-Light rounded-3">
                        <div className="col-1 py-2 text-center">
                            #
                        </div>
                        <div className="col-6 py-2 text-center">
                            文章標題
                        </div>
                        <div className="col-3 py-2 text-center">
                            作者
                        </div>
                        <div className="col-2" />
                    </div>
                    {/* 收藏的文章 */}
                    <div className="row mb-2 fz-3 bg-white rounded-3">
                        <div className="col-1 px-4 py-2 text-center">
                            1
                        </div>
                        <div className="col-6 px-4 py-2 text-truncate">
                            除息前一天買陽明是不是穩賺
                        </div>
                        <div className="col-3 px-4 py-2 text-center text-truncate">
                            阿ben
                        </div>
                        <div className="col-2 px-4 py-2 text-center">
                            <button className="deleteBtn text-IronGray-Deep IronGray-Light rounded-2 border-0 px-2 py-1 fz-4">取消</button>
                        </div>
                    </div>
                    <div className="row mb-2 fz-3 bg-white rounded-3">
                        <div className="col-1 px-4 py-2 text-center">
                            2
                        </div>
                        <div className="col-6 px-4 py-2 text-truncate">
                        外資高割離席,台股萬七進場做空
                        </div>
                        <div className="col-3 px-4 py-2 text-center text-truncate">
                            ASF999
                        </div>
                        <div className="col-2 px-4 py-2 text-center">
                            <button className="deleteBtn text-IronGray-Deep IronGray-Light rounded-2 border-0 px-2 py-1 fz-4">取消</button>
                        </div>
                    </div>
                    <div className="row mb-2 fz-3 bg-white rounded-3">
                        <div className="col-1 px-4 py-2 text-center">
                            3
                        </div>
                        <div className="col-6 px-4 py-2 text-truncate">
                        台股太強了吧,我一路抱一路抱一路抱一路抱一路抱一路抱一路抱一路抱一路抱一路抱
                        </div>
                        <div className="col-3 px-4 py-2 text-center text-truncate">
                            SharonHsu888
                        </div>
                        <div className="col-2 px-4 py-2 text-center">
                            <button className="deleteBtn text-IronGray-Deep IronGray-Light rounded-2 border-0 px-2 py-1 fz-4">取消</button>
                        </div>
                    </div>
                    {/* 切換頁面 */}
                    <div className="mt-3 d-flex justify-content-center">
                        <Pagination>
                            <Pagination.First
                                disabled={currentPage === 1}
                            >
                                <span className="fz-3 text-IronGray">
                                    &laquo;
                                </span>
                            </Pagination.First>
                            <Pagination.Prev
                                onClick={goToPreviousPage}
                                disabled={currentPage === 1}
                            >
                                <span className="fz-3 text-IronGray">
                                    &lt;
                                </span>
                            </Pagination.Prev>
                            <Pagination.Item
                                active
                            >
                                <span className="fz-3">
                                    {currentPage}
                                </span>
                            </Pagination.Item>
                            <Pagination.Next
                                onClick={goToNextPage}
                                disabled={currentPage === totalPages}
                            >
                                <span className="fz-3 text-IronGray">
                                    &gt;
                                </span>
                            </Pagination.Next>
                            <Pagination.Last
                                disabled={currentPage === totalPages}
                            >
                                <span className="fz-3 text-IronGray">
                                    &raquo;
                                </span>
                            </Pagination.Last>
                        </Pagination>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MemberCollect;