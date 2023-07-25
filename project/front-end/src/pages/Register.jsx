import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Nav";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../components/registerValidation";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "../styles/register.css";
import "../styles/loginpage.css";
import "../styles/forum_main.css";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import Glogin from "../components/glogin";
import { gapi } from 'gapi-script';
const clientId = "604786847308-qoj7mq9u9j3spdt0kbl0u1flgoe509p6.apps.googleusercontent.com"

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  // const [maleAvatar, setMaleAvatar] = useState("./img/memberimg/memoji/memo5.png");

  // const [gender, setGender] = useState("male");
  const showImgRef = useRef(null); // 添加ref
  useEffect(() => {
    if (values.avatar) {
      const imageUrl = URL.createObjectURL(values.avatar);
      const imgElement = document.querySelector(".showimg");
      if (imgElement) {
        imgElement.src = imageUrl;
      }
    }
  }, [values.avatar]);
  useEffect(() => {
    function start() {
      gapi.load('client:auth2', () => {
        gapi.client.init({
          clientId: clientId,
          scope: '',
        });
      });
    }
  
    start();
  }, []);

  const handleInput = (event) => {
    if (event.target.name === "avatar") {
      setValues((prev) => ({
        ...prev,
        avatar: event.target.files[0],
      }));
    } else {
      setValues((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }
  };
  // const handleGenderChange = (event) => {
  //   setGender(event.target.value);
  //   if (event.target.value === "male") {
  //     setValues((prev) => ({
  //       ...prev,
  //       avatar: null, // 清除先前選擇的檔案
  //     }));
  //   }
  // };
  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));

    if (errors.name === "" && errors.email === "" && errors.password === "") {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("avatar", values.avatar);

      axios
        .post("http://localhost:3000/register", formData)
        .then((res) => {
          console.log('註冊成功')
          // 註冊成功後會新增會員郵件和coupon資料
          const uid = res.data.uid;
          const name = values.name;
          const time = new Date().toLocaleString("zh-TW", { hour12: false });
          const message = `嗨! ${name}, 歡迎加入我們的股市網站會員！我們提供全面的股市資訊和專業的投資指引，讓您能夠更好地了解股市動態，做出明智的投資決策。不論您是股市新手還是經驗豐富的投資者，我們都致力於為您提供優質的服務和最新的市場分析報告。加入我們的會員，您將享受到定制化的投資組合建議、即時的股價更新、緊貼股市熱點的訊息推送，以及與其他投資者交流的機會。我們期待與您攜手合作，共同在股市中獲得成功！`;
          // 隨機得到10位數字英文代碼
          const code = generateRandomCode(10);
          const couponTime = new Date().toISOString();

          axios
            .post("http://localhost:3000/member/mail/addMail", {
              uid: uid,
              message: message,
              stats: null,
              time: time,
              code: code,
              couponTime: couponTime,
            })
            .then((res) => {
              console.log("會員郵件和 coupon資料新增成功");
              navigate("/");
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  // // 隨機得到10位數字英文代碼
  const generateRandomCode = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let code = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    return code;
  };

  return (
    <>
      <div className="mt-7rem d-flex align-items-center justify-content-center">
        <Form
          id="registerForm"
          onSubmit={handleSubmit}
          className="card p-3 rounded-4 drop-shadow-20">
          <div className="card-body px-5 text-IronGray-Deep fw-bold">
            <p className="text-center fs-2 fw-bold">會員註冊</p>
            <hr />
            <div className="row mt-4">
              <div className="col-9 fs-4">
                <div className="px-5 pt-3 rounded-4">
                  {/* 姓名 */}
                  <Form.Group
                    as={Row}
                    className="mb-4"
                    controlId="formHorizontalName">
                    <Form.Label
                      column
                      sm={4}
                      htmlFor="name">
                      姓名：
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        onChange={handleInput}
                        name="name"
                        type="text"
                        className="h-3rem"
                        placeholder="請輸入姓名" />
                      {errors.name && <div className="fz-3 fw-normal mt-1 ms-3 text-Red">{errors.name}</div>}
                    </Col>
                  </Form.Group>
                  {/* 性別 */}
                  <Form.Group
                    as={Row}
                    className="mb-2"
                    controlId="formHorizontalSex">
                    <Form.Label
                      column
                      sm={4}
                      htmlFor="name">
                      性別：
                    </Form.Label>
                    <Col sm={8}>
                      {['radio'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                          <Form.Check
                            inline
                            label="男"
                            name="sex"
                            value="male"
                            htmlFor="male"
                            type={type}
                            className="h-3rem"
                            id={`inline-${type}-1`}
                          />
                          <Form.Check
                            inline
                            label="女"
                            name="sex"
                            value="female"
                            htmlFor="female"
                            type={type}
                            id={`inline-${type}-2`}
                          />
                        </div>
                      ))}
                    </Col>
                  </Form.Group>
                  {/* 密碼 */}
                  <Form.Group
                    as={Row}
                    className="mb-4"
                    controlId="formHorizontalPassword">
                    <Form.Label
                      column
                      sm={4}
                      htmlFor="password">
                      密碼：
                    </Form.Label>
                    <Col sm={7}>
                      <Form.Control
                        onChange={handleInput}
                        name="password"
                        type={type}
                        className="h-3rem"
                        placeholder="至少 8 碼 (含大小寫英文 + 數字)" />
                      {errors.password && (
                        <div className="fz-3 fw-normal mt-1 ms-3 text-Red">{errors.password}</div>
                      )}
                    </Col>
                    <Col sm={1}>
                      <span
                        className=""
                        onClick={handleToggle}
                      >
                        <Icon
                          className=""
                          icon={icon}
                          size={25}
                        />
                      </span>
                    </Col>
                  </Form.Group>
                  {/* 確認密碼 */}
                  <Form.Group
                    as={Row}
                    className="mb-4"
                    controlId="formHorizontalPassword">
                    <Form.Label
                      column
                      sm={4}
                      htmlFor="password">
                      確認密碼：
                    </Form.Label>
                    <Col sm={7}>
                      <Form.Control
                        onChange={handleInput}
                        name="password"
                        type={type}
                        className="h-3rem"
                        placeholder="請確認密碼" />
                      {/* {errors.password && (
                        <div className="fz-3 fw-normal mt-1 ms-3 text-Red">{errors.password}</div>
                      )} */}
                    </Col>
                    <Col sm={1}>
                      <span
                        className=""
                        onClick={handleToggle}
                      >
                        <Icon
                          className=""
                          icon={icon}
                          size={25}
                        />
                      </span>
                    </Col>

                  </Form.Group>
                  {/* 電子信箱 */}
                  <Form.Group
                    as={Row}
                    className="mb-4"
                    controlId="formHorizontalEmail">
                    <Form.Label
                      column
                      sm={4}
                      htmlFor="email">
                      電子信箱：
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        onChange={handleInput}
                        name="email"
                        type="email"
                        className="h-3rem"
                        placeholder="請輸入信箱 ( eg. xx123@gmail.com )" />
                      {errors.email && <div className="fz-3 fw-normal mt-1 ms-3 text-Red">{errors.email}</div>}
                    </Col>
                  </Form.Group>
                  {/* 會員編號 */}
                  <Form.Group
                    as={Row}
                    className="mb-4 d-none"
                    controlId="formHorizontalUid">
                    <Form.Label
                      column
                      sm={4}
                      htmlFor="email">
                      會員編號：
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        className="h-3rem bg-Primary-Gray"
                        placeholder="註冊後由系統自動生成"
                        aria-label="Disabled input"
                        readOnly
                      />
                    </Col>
                  </Form.Group>
                </div>
              </div>
              <div className="col-3">
                {/* 上傳會員頭像 */}
                <div className="d-flex flex-wrap justify-content-center mt-2">
                  <div id="uploadImg">
                    <img
                      className="showimg text-danger"
                      ref={showImgRef}
                    />
                  </div>
                  <Form.Group
                    controlId="formFile"
                    className="my-4">
                    <Form.Label
                      id="uploadImgBtn"
                      className="fz-4 px-4 py-3 text-white rounded-4">
                      <svg
                        width="1.5rem"
                        height="1.5rem"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="me-3">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 10.0009C8.13261 10.0009 8.25979 9.94822 8.35355 9.85445C8.44732 9.76068 8.5 9.6335 8.5 9.50089V3.70789L10.646 5.85489C10.6925 5.90138 10.7477 5.93826 10.8084 5.96342C10.8692 5.98858 10.9343 6.00153 11 6.00153C11.0657 6.00153 11.1308 5.98858 11.1916 5.96342C11.2523 5.93826 11.3075 5.90138 11.354 5.85489C11.4005 5.80841 11.4374 5.75322 11.4625 5.69248C11.4877 5.63174 11.5006 5.56664 11.5006 5.50089C11.5006 5.43515 11.4877 5.37005 11.4625 5.30931C11.4374 5.24857 11.4005 5.19338 11.354 5.14689L8.354 2.14689C8.30755 2.10033 8.25238 2.06339 8.19163 2.03818C8.13089 2.01297 8.06577 2 8 2C7.93423 2 7.86911 2.01297 7.80837 2.03818C7.74762 2.06339 7.69245 2.10033 7.646 2.14689L4.646 5.14689C4.55211 5.24078 4.49937 5.36812 4.49937 5.50089C4.49937 5.63367 4.55211 5.76101 4.646 5.85489C4.73989 5.94878 4.86722 6.00153 5 6.00153C5.13278 6.00153 5.26011 5.94878 5.354 5.85489L7.5 3.70789V9.50089C7.5 9.6335 7.55268 9.76068 7.64645 9.85445C7.74021 9.94822 7.86739 10.0009 8 10.0009ZM1 12.5009C1 12.3683 1.05268 12.2411 1.14645 12.1473C1.24021 12.0536 1.36739 12.0009 1.5 12.0009H14.5C14.6326 12.0009 14.7598 12.0536 14.8536 12.1473C14.9473 12.2411 15 12.3683 15 12.5009C15 12.6335 14.9473 12.7607 14.8536 12.8544C14.7598 12.9482 14.6326 13.0009 14.5 13.0009H1.5C1.36739 13.0009 1.24021 12.9482 1.14645 12.8544C1.05268 12.7607 1 12.6335 1 12.5009Z" fill="white" />
                      </svg>
                      上傳會員頭像
                    </Form.Label>
                    <Form.Control
                      name="avatar"
                      onChange={handleInput}
                      type="file"
                      className="d-none"
                    />
                  </Form.Group>
                </div>
                {/* 快速註冊 */}
                <div className="">
                  <div className="fs-4 text-IronGray-Deep px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1.5rem"
                      viewBox="0 0 512 512"
                      className="fill-IronGray-Deep me-3">
                      <path d="M270.7 9.7C268.2 3.8 262.4 0 256 0s-12.2 3.8-14.7 9.7L197.2 112.6c-3.4 8-5.2 16.5-5.2 25.2v77l-144 84V280c0-13.3-10.7-24-24-24s-24 10.7-24 24v56 32 24c0 13.3 10.7 24 24 24s24-10.7 24-24v-8H192v32.7L133.5 468c-3.5 3-5.5 7.4-5.5 12v16c0 8.8 7.2 16 16 16h96V448c0-8.8 7.2-16 16-16s16 7.2 16 16v64h96c8.8 0 16-7.2 16-16V480c0-4.6-2-9-5.5-12L320 416.7V384H464v8c0 13.3 10.7 24 24 24s24-10.7 24-24V368 336 280c0-13.3-10.7-24-24-24s-24 10.7-24 24v18.8l-144-84v-77c0-8.7-1.8-17.2-5.2-25.2L270.7 9.7z" />
                    </svg>
                    快速註冊
                  </div>
                  <hr />
                  <div className="d-flex justify-content-around">
                    <Glogin></Glogin>
                    {/* <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        width="3rem"
                        height="3rem"
                        className="me-2"
                      >
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" /><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" /><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" /><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                      </svg>
                    </a>
                    <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        width="3rem"
                        height="3rem"
                        className="me-2"
                      >
                        <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z" />
                        <path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z" />
                      </svg>
                    </a>
                    <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        width="3rem"
                        height="3rem"
                        className=""
                      >
                        <path fill="#00c300" d="M12.5,42h23c3.59,0,6.5-2.91,6.5-6.5v-23C42,8.91,39.09,6,35.5,6h-23C8.91,6,6,8.91,6,12.5v23C6,39.09,8.91,42,12.5,42z" />
                        <path fill="#fff" d="M37.113,22.417c0-5.865-5.88-10.637-13.107-10.637s-13.108,4.772-13.108,10.637c0,5.258,4.663,9.662,10.962,10.495c0.427,0.092,1.008,0.282,1.155,0.646c0.132,0.331,0.086,0.85,0.042,1.185c0,0-0.153,0.925-0.187,1.122c-0.057,0.331-0.263,1.296,1.135,0.707c1.399-0.589,7.548-4.445,10.298-7.611h-0.001C36.203,26.879,37.113,24.764,37.113,22.417z M18.875,25.907h-2.604c-0.379,0-0.687-0.308-0.687-0.688V20.01c0-0.379,0.308-0.687,0.687-0.687c0.379,0,0.687,0.308,0.687,0.687v4.521h1.917c0.379,0,0.687,0.308,0.687,0.687C19.562,25.598,19.254,25.907,18.875,25.907z M21.568,25.219c0,0.379-0.308,0.688-0.687,0.688s-0.687-0.308-0.687-0.688V20.01c0-0.379,0.308-0.687,0.687-0.687s0.687,0.308,0.687,0.687V25.219z M27.838,25.219c0,0.297-0.188,0.559-0.47,0.652c-0.071,0.024-0.145,0.036-0.218,0.036c-0.215,0-0.42-0.103-0.549-0.275l-2.669-3.635v3.222c0,0.379-0.308,0.688-0.688,0.688c-0.379,0-0.688-0.308-0.688-0.688V20.01c0-0.296,0.189-0.558,0.47-0.652c0.071-0.024,0.144-0.035,0.218-0.035c0.214,0,0.42,0.103,0.549,0.275l2.67,3.635V20.01c0-0.379,0.309-0.687,0.688-0.687c0.379,0,0.687,0.308,0.687,0.687V25.219z M32.052,21.927c0.379,0,0.688,0.308,0.688,0.688c0,0.379-0.308,0.687-0.688,0.687h-1.917v1.23h1.917c0.379,0,0.688,0.308,0.688,0.687c0,0.379-0.309,0.688-0.688,0.688h-2.604c-0.378,0-0.687-0.308-0.687-0.688v-2.603c0-0.001,0-0.001,0-0.001c0,0,0-0.001,0-0.001v-2.601c0-0.001,0-0.001,0-0.002c0-0.379,0.308-0.687,0.687-0.687h2.604c0.379,0,0.688,0.308,0.688,0.687s-0.308,0.687-0.688,0.687h-1.917v1.23H32.052z" />
                      </svg>
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
            {/* 註冊鈕 */}
            <div className="d-flex mx-4">
              <div className="p-3 me-5">
                <Link to="/loginpage" className="notYetLogin py-2 fs-5 fw-normal">
                  已經有帳號了？請點此
                </Link>
              </div>
              <Button
                id="registerBtn"
                name="avatar"
                onChange={handleInput}
                // variant="primary"
                type="submit"
                className="ms-5 px-4 py-2 fs-4 rounded-4"
              >
                註&nbsp;&nbsp;&nbsp;冊
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
