import React, { useState, useEffect } from "react";
import axios from "axios";
import AddMessage from "./AddMessage";

const SmallHotMessage = (props) => {
  const faid = props.data;
  const [messages, setMessages] = useState([]);
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
      const res = await axios.get(`http://localhost:5052/messages/${faid}`);
      setMessages(res.data);
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
      await axios.post(`http://localhost:5052/messages//edit/${fmid}`, {
        fmContent: editedContent,
      });

      // 編輯留言後重新獲取留言列表
      fetchMessages();
    } catch (err) {
      console.log(err);
    }
  };

  // 處理 createTime，只保留 T 之前的部分
  const formatCreateTime = (createTime) => {
    if (createTime && typeof createTime === "string") {
      return createTime.split("T")[0];
    }
    return createTime;
  };

  return (
    <>
      {messages.map((message) => (
        <div className="border-top border-2 py-4 mt-4" key={message.fmid}>
          <div className="black-Word d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img src={photopath} alt="" />
              <span className="ms-3 text-IronGray-Deep fs-5">
                {message.name} · {formatCreateTime(message.createTime)}
              </span>
            </div>
            <div>
              <img src={message.likeImageUrl} alt="" className="useImg" />
              <span className="fs-5 fw-normal ms-2">{message.likeCount}</span>
            </div>
          </div>
          <div className="fs-5 pt-3">
            <a href="#" className="text-decoration-none text-IronGray mx-2">
              {message.ranking}
            </a>
            <span className="fs-5 fw-normal">{message.fmContent}</span>
            {/* 只有留言作者能夠看到編輯和刪除按鈕 */}
            {uid == message.uid && (
              <div className="d-flex justify-content-end">
                {" "}
                {/* 將按鈕放在右側 */}
                <button
                  onClick={() =>
                    handleEditMessage(message.fmid, message.editedContent)
                  }
                >
                  編輯
                </button>
                <button onClick={() => handleDeleteMessage(message.fmid)}>
                  刪除
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
      <AddMessage data={faid} fetchAllMessages={fetchMessages} />
    </>
  );
};

export default SmallHotMessage;
