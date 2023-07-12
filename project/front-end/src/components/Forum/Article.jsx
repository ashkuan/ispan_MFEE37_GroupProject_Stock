import React, { useState } from "react";
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

function Article() {
  const [showModal, setShowModal] = useState(false);

  const handleArticleClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="articleCont" onClick={handleArticleClick}>
        <div className="d-flex justify-content-between px-4">
          <div className="d-flex align-items-center">
            <img className="userImg" src="./img/forum/user-Img.jpg" alt="" />
            <span className="me-3 mb-1 fz-3">大神帶你飛</span>
            <span className="me-3 mb-1 fz-4">・3小時前</span>
          </div>
        </div>

        <div className="px-4">
          <p className="fz-1 mt-3">為什麼經濟不景氣股票卻飆這麼高</p>
          <p className="ellipsis mt-3 fz-2">
            各位年薪千萬大神好 小妹初入股市沒多久還只是個小韭菜
            看到最近大盤指數一直在飆 已經快飆到上次高點萬八了
            各大ETF也跟著存股變飆股
          </p>
        </div>
        <div className="px-4 mt-3 d-flex">
          <div className="d-flex">
            <Emoji />
            <span className="fz-5 d-flex align-content-center mt-1 mx-1">
              320
            </span>
          </div>
          <div className="mx-4">
            <img src="./img/forum/Chat.svg" alt="" />

            <span className="fz-5 mx-1">25</span>
          </div>
          <div className="mx-4">
            <img src="./img/forum/collect-Article.svg" alt="" />
            <span className="fz-5 mx-1">3</span>
          </div>
        </div>
      </div>
      <hr className="forumHr mx-4 p-1" />

      <Modal show={showModal} onHide={handleModalClose}>
        <div className="container">
          <div className="p-2 d-flex flex-column justify-content-between">
            <Modal.Header closeButton>
              <Modal.Title>
                <div className="d-flex align-items-center">
                  <PostUser />
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="p-4">
                <div className="p-2 pb-4">
                  {/* 看板 */}
                  <BoardTag />
                </div>
                <div className="p-3 fs-5">
                  {/* 文章內容 */}
                  <ArticleTitle />
                  <ArticleContent />
                </div>
                <div className="p-3 d-flex">
                  {/* hashtag */}
                  <HitoHashTags />
                </div>
                <div className="text-secondary fs-5 p-4 d-flex justify-content-between">
                  <div className="d-flex">
                    {/* <Emoji /> */}
                    <EmojiButton />
                    <MessageQuantity />
                  </div>
                  <div className="d-flex">
                    <KeepButton />
                    <NotifyShareDropdown />
                  </div>
                </div>
                <HotNewMessageTabs />
              </div>
            </Modal.Body>
            <Modal.Footer className="p-4 d-flex justify-content-between align-items-center">
              <AddMessage />
            </Modal.Footer>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Article;
