import React, { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../../styles/post.css";
import "../../styles/forum_main_right.css";
import axios from "axios";


function PostBtn() {
  const [lgShow, setLgShow] = useState(false);
  const handleClose = () => setLgShow(false);
  const handleShow = () => setLgShow(true);
  const [posts, setPosts] = useState({
    fatitle: "",
    farticle: "",
    faimage: "",
    fboard: "",
    createTime: "",
  });
  const handleChange = (e) => {
    setPosts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(posts);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // const currentTime = new Date().toLocaleTimeString();
      setPosts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      console.log("這是posts")
      console.log(posts)
      await axios.post("http://localhost:3000/posts", posts);
      // await axios.post("http://localhost:3000/posts", {data:posts});
      console.log("上傳成功123");
      console.log(posts); 
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button className="postBtn mt-4 px-5 fz-3" onClick={handleShow}>
        <div className="d-flex p-4 justify-content-between">
          <img
            className="userImg d-flex align-items-center"
            src="./img/forum/userImg.svg"
            alt=""
          />
          <div className="articleShare d-flex align-items-center p-2 pr-1">
            想和大家分享些...
          </div>
          <div className="articleBtn p-2">我要發文</div>
        </div>
      </button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>我要發文</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center">
            <div id="memberpic" />
            <div id="memberid" className="ms-2 ">
              韭菜是我
            </div>
          </div>
          <div className="mt-4 d-flex">
            <form action="" className="col-2 ">
              <select
                className="form-select"
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
                <option>閒聊</option>
                <option>新聞</option>
                <option>標的</option>
                <option>請益</option>
                <option>情報</option>
                <option>心得</option>
                <option>其他</option>
              </select>
            </form>
          </div>
          <form action="">
            <label htmlFor="postTitle" className="m-2 fw-bold " />
            <input
              type="text"
              className="form-control"
              id="postTitle"
              placeholder="標題"
              name="fatitle"
              onChange={handleChange}
            />
          </form>
          {/* 圖片上傳 */}
          <div className="upload__box mt-4">
            <div className="upload__btn-box">
              <label className="upload__btn">
                <p>上傳圖片</p>
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
            <div className="upload__img-wrap" />
          </div>
          <Form>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows={10}
                cols={50}
                className="form-control mt-4"
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
          <div className=" d-flex">
            <input
              type="text"
              defaultValue="#"
              className="col-2 m-2"
              id="hashtag"
            />
            {/* <Button
              type="button"
              className="btn m-2 hashtagbtn"
              variant="secondary"
            >
              99台積電
            </Button>
            <Button
              type="button"
              className="btn m-2 hashtagbtn"
              variant="secondary"
            >
              賺爛了
            </Button>
            <Button
              type="button"
              className="btn m-2 hashtagbtn"
              variant="secondary"
            >
              公園留位置給我
            </Button> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"  onClick={handleClick}>提交</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PostBtn;
