// 橫列發文鈕 modal內容
import React, { useState, useRef } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import uuid, { v4 as uuidv4 } from "react-uuid";
import "../../styles/post.css";
import "../../styles/forum_main_right.css";
import "../../styles/forum_main.css";
import axios from "axios";

function PostBtn() {
  const [lgShow, setLgShow] = useState(false);
  const [postAlert, setPostAlert] = useState(false);
  const handleClose = () => {
    setLgShow(false);
  };
  const handleShow = () => setLgShow(true);
  const v4Id = uuid();
  // console.log("我在這" + v4Id);
  const [posts, setPosts] = useState({
    fatitle: "",
    farticle: "",
    faimage: "",
    faid: "",
    fboard: "",
    createTime: "",
    fhashtag: "",
    collect: "",
  });
  const handleChange = (e) => {
    // setPosts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "faimage") {
      setPosts((prev) => ({ ...prev, faimage: e.target.files[0] }));
    } else {
      setPosts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };
  console.log(posts);

  const handleClick = async (e) => {
    e.preventDefault();
    //全部都要填寫
    const { fatitle, farticle, faimage, fboard, fhashtag } = posts;
    if (!fatitle || !farticle || !faimage || !fboard || !fhashtag) {
      alert("請填寫所有選項");
      return;
    }
    try {
      const currentTime = new Date().toDateString();
      setPosts((prev) => ({ ...prev, createTime: currentTime }));
      // setPosts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      const formData = new FormData();
      formData.append("fatitle", posts.fatitle);
      formData.append("farticle", posts.farticle);
      formData.append("faimage", posts.faimage);
      formData.append("fboard", posts.fboard);
      formData.append("fhashtag", posts.fhashtag);
      formData.append("createTime", currentTime);
      formData.append("collect", 0);
      formData.append("faid", v4Id);
      console.log("這是posts");
      console.log(posts);

      await axios.post("http://localhost:5789/posts", formData);
      console.log("上傳成功123");
      console.log(posts);
      setPostAlert(true);
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button className="postBtn px-4 fz-3" onClick={handleShow}>
        <div className="d-flex justify-content-between align-items-center py-3">
          <img
            className="userImg d-flex align-items-center"
            src="../public/img/forum/userImg.svg"
            alt=""
          />
          <div className="w-75 rounded-3 bg-white d-flex align-items-center px-3 py-2">
            想和大家分享...
          </div>
          <div className="articleBtn px-3 py-2">發文</div>
        </div>
      </button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="top-5"
      >
        <div className="container mt-0">
          <div className="p-2 d-flex flex-column justify-content-between">
            <Modal.Header closeButton>
              {/* 發文者資訊 */}
              <div className="d-flex align-items-center px-3">
                <div id="memberpic" />
                <div id="memberid" className="py-3 ms-3 fs-4">
                  韭菜是我
                </div>
              </div>
            </Modal.Header>
            <Modal.Body className="px-4 py-2">
              {/* 選擇看板 */}
              <div className="mt-4">
                <Form action="" className="">
                  <select
                    className="form-control form-select fs-5 px-3 py-2"
                    id="billboard"
                    required=""
                    name="fboard"
                    onChange={handleChange}
                  >
                    <option
                      // selected="selected"
                      disabled="disabled"
                      style={{ display: "none" }}
                    >
                      選擇看板
                    </option>
                    {/* <option>請選擇看板</option> */}
                    <option selected="selected" disabled="disabled">
                      請選看板
                    </option>
                    <option>閒聊</option>
                    <option>新聞</option>
                    <option>標的</option>
                    <option>請益</option>
                    <option>情報</option>
                    <option>心得</option>
                    <option>其他</option>
                  </select>
                </Form>
              </div>
              {/* 標題 */}
              <Form action="">
                <label htmlFor="postTitle" className="" />
                <input
                  type="text"
                  className="form-control fs-5 p-3"
                  id="postTitle"
                  placeholder="標題"
                  name="fatitle"
                  onChange={handleChange}
                />
              </Form>
              {/* 文章內容 */}
              <Form>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    cols={50}
                    className="form-control fs-5 mt-4 p-3"
                    // ref={searchInput}
                    // ref={c => (this.myInputRef = c)}
                    // onClick={areaClick}
                    placeholder="內容"
                    name="farticle"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form>
              {/* hashtag */}
              <input
                type="text"
                defaultValue="#"
                placeholder="#"
                id="hashtag"
                name="fhashtag"
                onChange={handleChange}
                className="mt-4 px-3 py-2 rounded-4 fs-4 border-0"
              />
              {/* 圖片上傳 & 取消鈕 & 發文鈕 */}
              <div className="d-flex justify-content-between align-items-center my-4">
                {/* 圖片上傳 */}
                <div className="upload__btn-box">
                  <label className="upload__btn rounded-4 text-center text-white px-3 py-2 fs-5 IronGray-Deep fw-normal">
                    上傳圖片
                    <input
                      type="file"
                      multiple=""
                      data-max_length={20}
                      className="upload__inputfile"
                      name="faimage"
                      onChange={handleChange}
                    />
                  </label>
                </div>
                {/* 取消鈕 & 發文鈕 */}
                <div className="">
                  <Button
                    className="fs-5 rounded-3 px-3 py-2"
                    variant="secondary"
                    onClick={handleClose}
                  >
                    取消
                  </Button>
                  <Button
                    className="fs-5 rounded-3 px-3 py-2 ms-4"
                    variant="primary"
                    name="createTime"
                    onClick={handleClick}
                  >
                    發文
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </div>
        </div>
      </Modal>
      <Modal
        variant="success"
        show={postAlert}
        onClose={() => setPostAlert(false)}
        dismissible
      >
        發文成功！
      </Modal>
    </>
  );
}

export default PostBtn;
