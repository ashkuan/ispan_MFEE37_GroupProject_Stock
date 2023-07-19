import React, { useState, useEffect, useContext } from "react";
import "../../styles/forum_main_right.css";
import "../../styles/forum_main.css";
import Emoji from "./Emoji";
import { Button, Modal } from "react-bootstrap";
import PostUser from "./PostUser";
import BoardTag from "./BoardTag";
import ArticleContent from "./ArticleContent";
import HitoHashTags from "./HitoHashTags";
import MessageQuantity from "./MessageQuantity";
import EmojiButton from "./EmojiButton";
import KeepButton from "./KeepButton";
import HotNewMessageTabs from "./HotNewMessageTabs";
import NotifyShareDropdown from "./NotifyShareDropdown";
import AddMessage from "./AddMessage";
import ArticleTitle from "./ArticleTitle";
import axios from "axios";
// import {UserContext} from "../../../context/UserContext";

function ChatArticle() {

  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [faid, setFaid] = useState([]);
  const [userPhotoPath, setUserPhotoPath] = useState([]);
  const [collects, setCollects] = useState(0);

  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const res = await axios.get("http://localhost:5789/chats");
        // console.log(res.data)
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPost();
  }, [posts]);

  // useEffect(() => {
  //   const fetchUserPhotoPath = async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:3000/photopath/${photopath}`);
  //       setUserPhotoPath(res);
  //     } catch (err) {
  //       console.log("我是res.data")
  //       console.log(err);
  //     }
  //   };
  //   fetchUserPhotoPath();
  // }, []);

  const handleArticleClick = () => {
    setShowModal(true);
  };

  const handleModalClose = (id) => {
    setFaid(id);
    setShowModal(false);
  };

  return (
    <div className="drop-shadow-20 rounded-4 bg-white mt-4">
      <div className="px-5 py-4">
        {posts.map((post, index) => (
          <div key={"popular"+index}>
            <div className="articleCont py-4">
              {/* 用戶 */}
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center text-IronGray-Deep">
                  <img className="userImg me-3" src={`http://localhost:3000/${post.userimg}`} alt="" />
                  <span className="me-3 mb-1 fz-3">{post.name}</span>
                  <span className="me-4 mb-1 fz-3">{post.fboard}</span>
                  <span className="me-3 mb-1 fz-4 fw-normal">
                    {" "}
                    {new Date(post.createTime).toLocaleDateString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </span>
                </div>
              </div>
              {/* articleContent */}
              <div
                className="row mt-3"
                id={post.faid}
                onClick={(e) => {
                  console.log(e.target.id);
                  setFaid(e.target.id);
                  handleArticleClick();
                }}
                //  style={{ backgroundColor: "black" }}
              >
                <div className="col-9">
                  <p
                    className="ellipsis fs-4 fw-bold mt-2 text-IronGray-Deep"
                    id={post.faid}
                  >
                    {post.fatitle}
                  </p>
                  <p
                    className="line-cut-2 mt-2 fz-3 text-IronGray-Deep"
                    id={post.faid}
                  >
                    {post.farticle}
                  </p>
                </div>
                <div className="col-2 d-flex align-items-center">
                  <div className="rounded-4">
                    {/* <img src={post.faimage} alt="" /> */}
                  </div>
                </div>
              </div>
              <div className="pe-4 mt-4 d-flex text-IronGray-Deep">
                {/* likeCount */}
                <div className="d-flex me-1">
                  <img src="../public/img/forum/likeClick.svg" alt="" />
                  <span className="fz-3 fw-normal px-3 d-flex align-content-center">
                    {post.likeCount}
                  </span>
                </div>
                {/* messageCount */}
                <div className="me-1">
                  <img src="../public/img/forum/chat-left-fill.svg" alt="" />
                  <span className="fz-3 fw-normal px-3">25</span>
                </div>
                {/* collectCount */}
                {/* <div className="me-1" onClick={collectClick}>
                  <img src={
                    collects !== 0
                      ? "public/img/forum/collect.svg"
                      : "public/img/forum/collect-Article.svg"
                  } />
                  <span className="fz-3 fw-normal px-3">3</span>
                </div> */}
              </div>
            </div>
            <hr />
          </div>
        ))}
        {/* articleIndividual-modal */}
        <Modal show={showModal} onHide={handleModalClose}>
          <div className="px-5 py-3 d-flex flex-column justify-content-between">
            <Modal.Header closeButton>
              <Modal.Title>
                <div className="d-flex align-items-center">
                  <PostUser data={faid} />
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="p-4">
                <div className="p-2 pb-4">
                  {/* 看板 */}
                  <BoardTag data={faid} />
                </div>
                <div className="p-3 fs-5">
                  {/* 文章內容 */}
                  <ArticleTitle data={faid} />
                  <ArticleContent data={faid} />
                </div>
                <div className="p-3 d-flex">
                  {/* hashtag */}
                  <HitoHashTags data={faid} />
                </div>
                <div className="text-secondary fs-5 p-4 d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    {/* <Emoji /> */}
                    {/* <img src="public/img/forum/likeClick.svg" alt="" /> */}
                    {/* <EmojiCount data={faid} /> */}
                    <EmojiButton data={faid} />
                    <MessageQuantity />
                  </div>
                  <div className="d-flex">
                    <KeepButton data={faid} />
                    {/* <NotifyShareDropdown /> */}
                  </div>
                </div>
                <HotNewMessageTabs data={faid} />
              </div>
            </Modal.Body>
            <Modal.Footer className="p-4 d-flex justify-content-between align-items-center">
              <AddMessage data={faid} />
            </Modal.Footer>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default ChatArticle;
