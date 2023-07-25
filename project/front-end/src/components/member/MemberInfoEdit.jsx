import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "../../styles/member.css";
import "../../styles/register.css";
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
        <>
            <div className="px-5 py-4 mx-5">
                <p className="text-IronGray-Deep fs-4 fw-bold pb-2 border-bottom">編輯會員資料</p>
                <div className="mt-3 mx-3 row">
                    {/* 編輯會員資料 */}
                    <div className="col-8">
                        <Form className="fs-5">
                            {/* 姓名 */}
                            <Form.Group
                                as={Row}
                                className="mb-2">
                                <Form.Label
                                    column
                                    sm={4}>
                                    姓名：
                                </Form.Label>
                                <Col sm={8}>
                                    <input
                                        className="h-2_75rem border-0 px-4 rounded-3"
                                        type="text"
                                        name="name"
                                        value={memberData.name}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>
                            {/* 帳號 (電子信箱) */}
                            <Form.Group
                                as={Row}
                                className="mb-2">
                                <Form.Label
                                    column
                                    sm={4}>
                                    帳號：
                                </Form.Label>
                                <Col sm={8}>
                                    <input
                                        className="h-2_75rem border-0 px-4 rounded-3"
                                        type="text"
                                        name="email"
                                        value={memberData.email}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>
                            {/* 新密碼 */}
                            <Form.Group
                                as={Row}
                                className="mb-2">
                                <Form.Label
                                    column
                                    sm={4}>
                                    新密碼：
                                </Form.Label>
                                <Col sm={8}>
                                    <input
                                        className="h-2_75rem border-0 px-4 rounded-3"
                                        type="text"
                                        name="password"
                                        value={memberData.password}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>
                            {/* 確認密碼 */}
                            <Form.Group
                                as={Row}
                                className="mb-2">
                                <Form.Label
                                    column
                                    sm={4}>
                                    確認密碼：
                                </Form.Label>
                                <Col sm={8}>
                                    <input
                                        className="h-2_75rem border-0 px-4 rounded-3"
                                        type="text"
                                        name="password_confirmation"
                                        value={memberData.password_confirmation}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                    {/* 上傳會員頭像 */}
                    <div className="col-4">
                        <div className="flex-wrap">
                            <div className="d-flex justify-content-center">
                                <div id="updateImg">
                                    <img
                                        className="showimg text-danger"
                                    // ref={showImgRef}
                                    />
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <Form.Group
                                    controlId="formFile"
                                    className="mt-3">
                                    <Form.Label
                                        id="updateImgBtn"
                                        className="fz-4 px-3 py-2 text-white rounded-3">
                                        <svg
                                            width="1.2rem"
                                            height="1.2rem"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="me-3">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 10.0009C8.13261 10.0009 8.25979 9.94822 8.35355 9.85445C8.44732 9.76068 8.5 9.6335 8.5 9.50089V3.70789L10.646 5.85489C10.6925 5.90138 10.7477 5.93826 10.8084 5.96342C10.8692 5.98858 10.9343 6.00153 11 6.00153C11.0657 6.00153 11.1308 5.98858 11.1916 5.96342C11.2523 5.93826 11.3075 5.90138 11.354 5.85489C11.4005 5.80841 11.4374 5.75322 11.4625 5.69248C11.4877 5.63174 11.5006 5.56664 11.5006 5.50089C11.5006 5.43515 11.4877 5.37005 11.4625 5.30931C11.4374 5.24857 11.4005 5.19338 11.354 5.14689L8.354 2.14689C8.30755 2.10033 8.25238 2.06339 8.19163 2.03818C8.13089 2.01297 8.06577 2 8 2C7.93423 2 7.86911 2.01297 7.80837 2.03818C7.74762 2.06339 7.69245 2.10033 7.646 2.14689L4.646 5.14689C4.55211 5.24078 4.49937 5.36812 4.49937 5.50089C4.49937 5.63367 4.55211 5.76101 4.646 5.85489C4.73989 5.94878 4.86722 6.00153 5 6.00153C5.13278 6.00153 5.26011 5.94878 5.354 5.85489L7.5 3.70789V9.50089C7.5 9.6335 7.55268 9.76068 7.64645 9.85445C7.74021 9.94822 7.86739 10.0009 8 10.0009ZM1 12.5009C1 12.3683 1.05268 12.2411 1.14645 12.1473C1.24021 12.0536 1.36739 12.0009 1.5 12.0009H14.5C14.6326 12.0009 14.7598 12.0536 14.8536 12.1473C14.9473 12.2411 15 12.3683 15 12.5009C15 12.6335 14.9473 12.7607 14.8536 12.8544C14.7598 12.9482 14.6326 13.0009 14.5 13.0009H1.5C1.36739 13.0009 1.24021 12.9482 1.14645 12.8544C1.05268 12.7607 1 12.6335 1 12.5009Z" fill="white" />
                                        </svg>
                                        更改會員頭像
                                    </Form.Label>
                                    <Form.Control
                                        name="avatar"
                                        // onChange={handleInput}
                                        type="file"
                                        className="d-none"
                                    />
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="d-flex ms-16rem">
                    <Link
                        to="/member">
                        <button
                            className="memberInfoEdit border-0 d-flex justify-content-center align-items-center rounded-3 IronGray-Deep px-4 py-2"
                            onClick={handleUpdateMember}>
                            <span className="text-white fs-5">儲存編輯</span>
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default MemberInfoEdit;
