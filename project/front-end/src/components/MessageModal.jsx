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
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default MessageModal;