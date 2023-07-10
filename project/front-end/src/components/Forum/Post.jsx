import React, { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../../styles/post.css";

const Post = () => {
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
  // const navigate = useNavigate()
  const handleChange = (e) => {
    setPosts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(posts);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const currentTime = new Date().toLocaleTimeString();
      setPosts((prev) => ({ ...prev, fadate: currentTime }));
      await axios.post("http://localhost:3000/posts", posts);
      handleClose();
      // navigate("/")
      console.log("上傳成功");
      console.log(posts);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div id="post" className="container mt-4">
        <svg
          onClick={handleShow}
          id="posticon"
          width={30}
          height={30}
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.79 3.285L16.418 4.755L13.562 1.695L14.934 0.225C15.2 -0.075 15.662 -0.075 15.942 0.225L17.79 2.205C18.07 2.505 18.07 3 17.79 3.285ZM12.582 2.745L15.438 5.805L6.856 15H4V11.94L12.582 2.745Z"
            fill="#D9D9D9"
          />
          <path
            d="M12.5 1H4C2.34315 1 1 2.34315 1 4V14C1 15.6569 2.34315 17 4 17H14C15.6569 17 17 15.6569 17 14V6"
            stroke="#D9D9D9"
          />
        </svg>
        點我發文
      </div>

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
            <Form.Group
            //   className="mb-3"
            //   controlId="exampleForm.ControlTextarea1"
            >
              {/* <Form.Label>Example textarea</Form.Label> */}
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
          {/* 標籤 */}
          <div className=" d-flex">
            <input
              type="text"
              defaultValue="#"
              className="col-2 m-2"
              id="hashtag"
              // name="fboard"
              // onChange={handleChange}
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
          <Button variant="primary" onClick={handleClick}>
            提交
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Post;
