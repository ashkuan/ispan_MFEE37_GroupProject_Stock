import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "../../styles/member.css";
import "../../styles/forum_main.css";

const MemberInfo = () => {
  // 使用狀態來存放會員資訊
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

  return (
    <div className="mt-4 flex-column d-flex ms-5 fs-4 fw-bold">
      <Form>
        {/* 會員編號 */}
        <Form.Group as={Row} className="mb-2">
          <Form.Label column sm={3}>
            會員編號：
          </Form.Label>
          <Col sm={9}>
            <input
              className="h-3rem border-0 px-4 rounded-3"
              type="text"
              value={memberData.uid} // 使用狀態中的會員資料
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
              value={memberData.name} // 使用狀態中的會員資料
              readOnly
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
              value={memberData.email} // 使用狀態中的會員資料
              readOnly
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
              value={memberData.password} // 使用狀態中的會員資料
              readOnly
            />
          </Col>
        </Form.Group>
      </Form>
      <Link to="/member/edit">
        <button className="memberInfoEdit mt-5  border-0 d-flex justify-content-center align-items-center rounded-3 IronGray-Deep px-4 py-2">
          <span className="text-white fs-5">編輯資料</span>
        </button>
      </Link>
    </div>
  );
};

export default MemberInfo;
