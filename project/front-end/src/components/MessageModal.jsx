import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../styles/ModalStyles.css";
import "../styles/forum_main.css";

const MessageModal = ({ isOpen, onClose, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="custom-modal-content" 
      // portalClassName="custom-modal-portal"
    >
      <div>
        <p className="mailcontent">{message}</p>
        <button className="del-btn colbtn" onClick={onClose}>關閉</button>
      </div>
    </Modal>
  );
};

export default MessageModal;