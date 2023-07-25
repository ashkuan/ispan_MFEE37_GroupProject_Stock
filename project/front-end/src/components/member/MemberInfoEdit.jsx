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
  const navigate = useNavigate();

  const [memberData, setMemberData] = useState({
    uid: "",
    name: "",
    email: "",
    password: "",
    photopath: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/member", { withCredentials: true })
      .then((res) => {
        // 成功取得會員資訊後，將資料設定到狀態中
        setMemberData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMemberData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

const handleUpdateMember = () => {
  // 發送更新請求給後端
  axios
    .put(
      "http://localhost:3000/member/edit",
      {
        uid,
        name: memberData.name,
        email: memberData.email,
        password: memberData.password,
        photopath: memberData.photopath,
      },
      { withCredentials: true }
    )
    .then((res) => {
      // 成功處理更新回應
      console.log("更新成功");
      navigate("/");
      alert("會員資料更新成功");

      // 更新前端資料狀態
      setMemberData(res.data);
    })
    .catch((err) => {
      console.log("更新錯誤", err);
    });
};

  return (
    <div className="mt-4 flex-column d-flex ms-5 fs-4 fw-bold">
      <p>編輯會員</p>
      <hr />
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
              defaultValue={memberData.photopath}
              onChange={handleChange}
            />
            <img
              className="photoedit"
              src={`http://localhost:3000/${memberData.photopath}`}
              alt="123"
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
              value={memberData.name}
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
              value={memberData.email}
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
              value={memberData.password}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        {/* 確認密碼 */}
        <Form.Group as={Row} className="mb-2">
          <Form.Label column sm={3}>
            確認密碼：
          </Form.Label>
          <Col sm={9}>
            <input
              className="h-3rem border-0 px-4 rounded-3"
              type="text"
              name="password_confirmation"
              value={memberData.password_confirmation}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
      </Form>
      <Link to="/member/edit">
        <button
          className="memberInfoEdit mt-5  border-0 d-flex justify-content-center align-items-center rounded-3 IronGray-Deep px-4 py-2 savebtn"
          onClick={handleUpdateMember}
        >
          <span className="text-white fs-5 ">儲存更新</span>
        </button>
      </Link>
    </div>
  );
};

export default MemberInfoEdit;