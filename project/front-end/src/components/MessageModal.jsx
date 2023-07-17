import React from "react";
import Modal from "react-modal";
import "../styles/ModalStyles.css"; // 引入自定义的样式文件

const MessageModal = ({ isOpen, onClose, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="custom-modal-content" 
      portalClassName="custom-modal-portal"
    >
      <div>
        <p className="mailcontent">{message}</p>
        <button className="del-btn colbtn" onClick={onClose}>關閉</button>
      </div>
    </Modal>
  );
};

export default MessageModal;