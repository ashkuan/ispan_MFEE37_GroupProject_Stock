import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/forgetPassword.css";
import "animate.css";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [emailMessage, setEmailMessage] = useState("");
  const [pwdMessage, setPwdMessage] = useState("");
  const [email, setEmail] = useState("");
  const [pwd1, setPwd1] = useState("");
  const [pwd2, setPwd2] = useState("");

  const handleClose = () => {
    navigate("/loginpage");
  };

  useEffect(() => {
    setEmailMessage("");
    setPwdMessage("");
  }, []);

  // 1.寄送Email到後端
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3333/sendEmail", {
        email,
      });
      const message = res.data.message;
      console.log(message);
      if (message == "email寄送成功") {
        setEmailMessage(message);
      }
    } catch (error) {
      console.log("無法連接到伺服器", error);
    }
  };

  // 2.寄送驗證碼到後端
  const inputRefs = useRef([]);
  const handleInputChange = (index, event) => {
    const input = event.target;
    const value = input.value;
    if (value.length >= 1) {
      const nextIndex = index + 1;
      if (nextIndex < inputRefs.current.length) {
        inputRefs.current[nextIndex].focus();
      }
    }
  };
  const onKeyDown = (event) => {
    // 攔截輸入的字符，確保只能輸入數字
    const isValidInput = /^[0-9]$/;
    const isAllowedKey =
      isValidInput.test(event.key) || // 數字鍵
      event.key === "Backspace" || // 刪除鍵 (backspace)
      event.key === "Tab" || // 制表鍵 (tab)
      event.key === "ArrowLeft" || // 左箭頭鍵
      event.key === "ArrowRight"; // 右箭頭鍵

    if (!isAllowedKey) {
      event.preventDefault();
    }
  };
  const onInput = (event) => {
    const input = event.target;
    const value = input.value;
    input.value = value.replace(/[^0-9]/g, "");
  };
  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    const codeInput1 = Number(inputRefs.current[0].value);
    const codeInput2 = Number(inputRefs.current[1].value);
    const codeInput3 = Number(inputRefs.current[2].value);
    const codeInput4 = Number(inputRefs.current[3].value);
    const codeInput5 = Number(inputRefs.current[4].value);
    const codeInput6 = Number(inputRefs.current[5].value);
    const code = `${codeInput1}${codeInput2}${codeInput3}${codeInput4}${codeInput5}${codeInput6}`;
    try {
      console.log(code);
      const res = await axios.post("http://localhost:3333/sendCode", {
        code,
      });
      const message = res.data.message;
      console.log(message);
      if (message == "驗證碼匹配成功") {
        setPwdMessage(message);
      }
    } catch (error) {
      console.log("無法連接到伺服器", error);
    }
  };

  // 3.更新密碼
  const handlecheckPWD1 = (e) => {
    console.log(e.target.value);
    setPwd1(e.target.value);
  };
  const handlecheckPWD2 = (e) => {
    console.log(e.target.value);
    setPwd2(e.target.value);
  };
  const handlePWDSubmit = async (e) => {
    e.preventDefault();
    if (pwd1 == pwd2) {
      console.log("密碼相符");
      const res = await axios.post("http://localhost:3333/sendNewPassword", {
        pwd1,
      });
      console.log(res.data.message);
      const message = res.data.message;
      if (message == "密碼更新成功") {
        navigate("/loginpage");
      }
    } else {
      alert("請輸入相符的密碼");
    }
  };

  return (
    <div style={{ marginTop: "120px" }}>
      <div
        className="emailBox 
           animate__animated animate__fadeInRight
        "
      >
        {emailMessage == "" && (
          <div className=" d-flex align-items-center justify-content-center">
            <form
              onSubmit={handleEmailSubmit}
              id="memberLogin"
              className="card p-4 rounded-4 drop-shadow-20"
            >
              <div className="card-body fw-bold px-5 text-IronGray-Deep">
                <label
                  htmlFor="email"
                  className="d-flex justify-content-center m-auto py-3 fs-3"
                >
                  忘記密碼
                </label>
                <input
                  value={email}
                  onChange={handleEmailChange}
                  type="email"
                  name="email"
                  className="member-inp border-1 rounded-2"
                  placeholder="請輸入 Email"
                />
                <div className="d-flex flex-column justify-content-around">
                  <button
                    type="submit"
                    // onClick={handlePass}
                    className="btn btn-login py-2 mb-4 mt-4"
                  >
                    發送驗證信
                  </button>
                  <button
                    onClick={handleClose}
                    className="btn btn-login py-2 mb-4"
                  >
                    取消
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
      <div
        className={`codeBox ${
          emailMessage !== "" && pwdMessage == ""
            ? "animate__animated animate__fadeInRight"
            : "animate__animated animate__fadeOutLeft"
        }`}
      >
        {emailMessage !== "" && pwdMessage == "" && (
          <div
            style={{
              width: "450px",
            }}
          >
            <form
              onSubmit={handleCodeSubmit}
              className="card rounded-4 drop-shadow-20"
              style={{ padding: "60px" }}
            >
              <div className="card-body fw-bold px-5 text-IronGray-Deep">
                <label className="d-flex justify-content-center m-auto py-3 fs-3 mb-3">
                  驗證碼
                </label>
                <div className="d-flex gap-3 justify-content-center">
                  <input
                    ref={(ref) => (inputRefs.current[0] = ref)}
                    onChange={(e) => handleInputChange(0, e)}
                    onKeyDown={onKeyDown}
                    onInput={onInput}
                    type="text"
                    maxLength="1"
                    pattern="[0-9]"
                    required
                    autoFocus
                    style={{ width: "50px" }}
                    className="py-2 fs-1 text-center"
                    name="certi1"
                  />
                  <input
                    ref={(ref) => (inputRefs.current[1] = ref)}
                    onChange={(e) => handleInputChange(1, e)}
                    onKeyDown={onKeyDown}
                    onInput={onInput}
                    type="text"
                    maxLength="1"
                    pattern="[0-9]"
                    required
                    style={{ width: "50px" }}
                    className="py-2 fs-1 text-center"
                    name="certi2"
                  />
                  <input
                    ref={(ref) => (inputRefs.current[2] = ref)}
                    onChange={(e) => handleInputChange(2, e)}
                    onKeyDown={onKeyDown}
                    onInput={onInput}
                    type="text"
                    maxLength="1"
                    pattern="[0-9]"
                    required
                    style={{ width: "50px" }}
                    className="py-2 fs-1 text-center"
                    name="certi3"
                  />
                  <input
                    ref={(ref) => (inputRefs.current[3] = ref)}
                    onChange={(e) => handleInputChange(3, e)}
                    onKeyDown={onKeyDown}
                    onInput={onInput}
                    type="text"
                    maxLength="1"
                    pattern="[0-9]"
                    required
                    style={{ width: "50px" }}
                    className="py-2 fs-1 text-center"
                    name="certi4"
                  />
                  <input
                    ref={(ref) => (inputRefs.current[4] = ref)}
                    onChange={(e) => handleInputChange(4, e)}
                    onKeyDown={onKeyDown}
                    onInput={onInput}
                    type="text"
                    maxLength="1"
                    pattern="[0-9]"
                    required
                    style={{ width: "50px" }}
                    className="py-2 fs-1 text-center"
                    name="certi5"
                  />
                  <input
                    ref={(ref) => (inputRefs.current[5] = ref)}
                    onChange={(e) => handleInputChange(5, e)}
                    onKeyDown={onKeyDown}
                    onInput={onInput}
                    type="text"
                    maxLength="1"
                    pattern="[0-9]"
                    required
                    style={{ width: "50px" }}
                    className="py-2 fs-1 text-center"
                    name="certi6"
                  />
                </div>
              </div>
              <button
                type="submit"
                style={{
                  backgroundColor: "#2c3e50",
                  color: "white",
                  border: "none",
                  fontSize: "1.5rem",
                  padding: "8px",
                  borderRadius: "5px",
                  marginTop: "30px",
                }}
              >
                提交
              </button>
            </form>
          </div>
        )}
      </div>
      <div
        className={`passwordBox ${
          pwdMessage !== ""
            ? "animate__animated animate__fadeInRight"
            : "animate__animated animate__fadeOutLeft"
        }`}
      >
        {pwdMessage !== "" && (
          <div className="d-flex align-items-center justify-content-center">
            <form
              onSubmit={handlePWDSubmit}
              id="memberLogin"
              className="card p-4 rounded-4 drop-shadow-20"
            >
              <div className="card-body fw-bold px-5 text-IronGray-Deep">
                <label
                  htmlFor="email"
                  className="d-flex justify-content-center m-auto py-3 fs-3"
                >
                  請輸入新密碼
                </label>
                <input
                  type="password"
                  name="password"
                  className="member-inp border-1 rounded-2"
                  placeholder="請輸入新密碼"
                  onChange={handlecheckPWD1}
                  value={pwd1}
                />
                <label
                  htmlFor="email"
                  className="d-flex justify-content-center m-auto py-3 fs-3"
                >
                  請再輸入一次新密碼
                </label>
                <input
                  type="password"
                  className="member-inp border-1 rounded-2"
                  placeholder="請再輸入一次新密碼"
                  onChange={handlecheckPWD2}
                  value={pwd2}
                />
                <div className="d-flex flex-column justify-content-around">
                  <button
                    type="submit"
                    className="btn btn-login py-2 mb-4 mt-4"
                  >
                    送出
                  </button>
                  <button className="btn btn-login py-2 mb-4">取消</button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
