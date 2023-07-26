import React, { useState, useEffect } from "react";
import axios from "axios";
import AddMessage from "./AddMessage";
import KeepButton from "./KeepButton";
import EmojiButton from "./EmojiButton";
import { Hidden } from "@mui/material";

const SmallHotMessage = (props) => {
  const faid = props.data;
  // 顯示留言
  const [messages, setMessages] = useState([]);
  // 追蹤正在編輯的留言的fmid
  const [editingFmid, setEditingFmid] = useState(null);
  // 編輯的留言內容
  const [editedContent, setEditedContent] = useState("");
  // 留言總數
  const [totalMessages, setTotalMessages] = useState(0);
  const uid = sessionStorage.getItem("uid");
  // console.log(uid);
  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const photopath = sessionStorage.getItem("photopath");
  useEffect(() => {
    fetchMessages();
  }, [faid]);

  const fetchMessages = async () => {
    try {
      const res = await axios.post(`http://localhost:5052/messages/${faid}`, {
        uid,
      });
      setMessages(res.data);
      // 設置留言總數
      setTotalMessages(res.data.length);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteMessage = async (fmid) => {
    console.log(fmid + "刪除囉");
    try {
      await axios.delete(`http://localhost:5052/messages/delete/${fmid}`);
      setMessages(messages.filter((messages) => messages.fmid !== fmid));
      // 刪除留言後重新獲取留言列表
      fetchMessages();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditMessage = async (fmid, editedContent) => {
    console.log(editedContent);
    try {
      await axios.post(`http://localhost:5052/messages/edit/${fmid}`, {
        fmContent: editedContent,
      });

      // 編輯留言後重新獲取留言列表
      fetchMessages();
    } catch (err) {
      console.log(err);
    }
  };

  const handleStartEditing = (fmid, content) => {
    // 開始編輯留言時觸發，將fmid和內容設定到狀態中
    setEditingFmid(fmid);
    setEditedContent(content);
  };

  const handleCancelEditing = () => {
    // 取消編輯時觸發，將編輯狀態和內容重置為空
    setEditingFmid(null);
    setEditedContent("");
  };

  const handleUpdateMessage = async (fmid) => {
    // 更新留言時觸發，向後端發送編輯請求，並重新獲取留言列表
    try {
      await handleEditMessage(fmid, editedContent);
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.fmid === fmid
            ? { ...message, fmContent: editedContent }
            : message
        )
      );
      handleCancelEditing();
    } catch (err) {
      console.log(err);
    }
  };

  let messageCount = 1;

  return (
    <>
      {messages.map((message, index) => (
        <div className="border-top border-2 py-4 mt-4" key={message.fmid}>
          <div className="black-Word d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img
                className="user-img"
                src={`http://localhost:3000/${message.photopath}`}
              />

              <span className="ms-3 text-IronGray-Deep fz-3">
                {message.name} ·{" "}
                {new Date(message.createTime).toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                })}
              </span>
            </div>
            <div>
              <EmojiButton />
            </div>
          </div>
          <div className="fs-5 pt-3 d-flex justify-content-between align-items-center">
            {uid == message.uid && editingFmid == message.fmid ? (
              // 編輯狀態下，顯示可編輯的input和更新/取消按鈕
              <>
                <input
                  type="text"
                  className="form-control ms-3 fs-5"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <div className="d-flex justify-content-end">
                  <button
                    onClick={() => handleUpdateMessage(message.fmid)}
                    className="rounded-2 border-0 IronGray-Light text-white fz-3 letter-spacing-0_2 px-2 py-1 me-3"
                  >
                    更新
                  </button>
                  <button
                    onClick={() => handleCancelEditing()}
                    className="rounded-2 border-0 IronGray-Light text-white fz-3 letter-spacing-0_2 px-2 py-1"
                  >
                    取消
                  </button>
                </div>
              </>
            ) : (
              // 非編輯狀態下，顯示留言內容和編輯/刪除按鈕
              <>
                <div className="d-flex align-items-start">
                  {editingFmid !== message.fmid && (
                    <div>{message.fmContent}</div>
                  )}
                </div>
                {/* 只有留言作者能夠看到編輯和刪除按鈕 */}
                {uid == message.uid && (
                  <div className="d-flex justify-content-end">
                    <button
                      onClick={() =>
                        handleStartEditing(message.fmid, message.fmContent)
                      }
                      className="rounded-2 border-0 IronGray-Light text-white fz-3 letter-spacing-0_2 px-2 py-1 me-3"
                    >
                      編輯
                    </button>
                    <button
                      onClick={() => handleDeleteMessage(message.fmid)}
                      className="rounded-2 border-0 IronGray-Light text-white fz-3 letter-spacing-0_2 px-2 py-1"
                    >
                      刪除
                    </button>
                  </div>
                )}
              </>
            )}
            {`${messageCount++}F`}
          </div>
        </div>
      ))}
      <AddMessage data={faid} fetchAllMessages={fetchMessages} />
    </>
  );
};

export default SmallHotMessage;
