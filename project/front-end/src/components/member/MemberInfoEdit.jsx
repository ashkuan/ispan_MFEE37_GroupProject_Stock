import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../../styles/member.css";
import "../../styles/forum_main.css";

const MemberInfoEdit = () => {
  const uid = sessionStorage.getItem("uid");
  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const photopath = sessionStorage.getItem("photopath");
  const password = sessionStorage.getItem("password");
  const navigate = useNavigate();

  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [newPwd, setNewPwd] = useState(password);
  const [newPhotoPath, setNewPhotoPath] = useState(photopath);

  const handleChange = (event) => {
    if (event.target.name === "name") {
      setNewName(event.target.value);
    } else if (event.target.name === "email") {
      setNewEmail(event.target.value);
    } else if (event.target.name === "password") {
      setNewPwd(event.target.value);
    } else if (event.target.name === "photopath") {
      setNewPhotoPath(event.target.value);
    }
  };
  const handleUpdateMember = () => {
    // 發送更新請求給後端
    axios
      .put(
        "http://localhost:3000/member/edit",
        {
          uid,
          name: newName,
          email: newEmail, // 將newEmail的狀態傳遞給後端
          password: newPwd, // 將newPwd的狀態傳遞給後端
          photopath: newPhotoPath,
        },
        { withCredentials: true }
      )
      .then((res) => {
        // 成功處理更新回應
        console.log("更新成功");
        navigate("/");
        alert("會員資料更新成功");
      })
      .catch((err) => {
        console.log("更新錯誤", err);
      });
  };

  return (
    <div className="mt-4 flex-column d-flex ms-5 fs-4 fw-bold">
      <Form>
        {/* 會員大頭照 */}
        <Form.Group className="d-flex justify-content-center align-items-center">
          <Form.Label column sm={3}>
            會員照片：
          </Form.Label>
          <Col sm={9}>
            <input
              className="h-3rem border-0 px-4 rounded-3"
              type="file"
              name="photopath"
              //   defaultValue={photopath}
            //   value={newPhotoPath}
              onChange={handleChange}
            />
            <img
              className="photoedit"
              src={`http://localhost:3000/${photopath}`}
              alt="123"
            />
          </Col>
        </Form.Group>
        {/* 會員編號 */}
        <Form.Group as={Row} className="mb-2">
          <Form.Label column sm={3}>
            會員編號：
          </Form.Label>
          <Col sm={9}>
            <input
              className="h-3rem border-0 px-4 rounded-3"
              type="text"
              defaultValue={uid}
              readOnly
            />
          </Col>
        </Form.Group>
        {/* 姓名 */}
        <Form.Group as={Row} className="mb-2">
          <Form.Label column sm={3}>
            姓名：
          </Form.Label>
          <Col sm={9}>
            <input
              className="h-3rem border-0 px-4 rounded-3"
              type="text"
              name="name"
              defaultValue={name}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        {/* 帳號 (電子信箱) */}
        <Form.Group as={Row} className="mb-2">
          <Form.Label column sm={3}>
            帳號：
          </Form.Label>
          <Col sm={9}>
            <input
              className="h-3rem border-0 px-4 rounded-3"
              type="text"
              name="email"
              defaultValue={email}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        {/* 密碼 */}
        <Form.Group as={Row} className="mb-2">
          <Form.Label column sm={3}>
            密碼：
          </Form.Label>
          <Col sm={9}>
            <input
              className="h-3rem border-0 px-4 rounded-3"
              type="text"
              name="password"
              defaultValue={password}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
      </Form>
      <Link to="/member/edit">
        <button className="memberInfoEdit mt-5  border-0 d-flex justify-content-center align-items-center rounded-3 IronGray-Deep px-4 py-2 savebtn">
          <span className="text-white fs-5 " onClick={handleUpdateMember}>
            儲存更新
          </span>
        </button>
      </Link>
    </div>
  );
};

export default MemberInfoEdit;
