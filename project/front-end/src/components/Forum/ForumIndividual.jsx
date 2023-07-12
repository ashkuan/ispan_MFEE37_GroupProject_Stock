import React, { useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import PostUser from './PostUser';
import BoardTag from './BoardTag';
import ArticleContent from './ArticleContent';
import HitoHashTags from './HitoHashTags';
import Emoji from './Emoji';
import MessageQuantity from './MessageQuantity';
import EmojiButton from './EmojiButton';
import KeepButton from './KeepButton';
import HotNewMessageTabs from './HotNewMessageTabs';
import NotifyShareDropdown from './NotifyShareDropdown';
import AddMessage from './AddMessage';

function ForumIndividual() {
  const [show, setShow] = useState(true);

  const modalClose = () => setShow(false);

  return (
    <>
      <Button onClick={modalShow}>
        這裡是modal要連結個別貼文
      </Button>

      <Modal show={show} onHide={modalClose}>
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

export default ForumIndividual;
