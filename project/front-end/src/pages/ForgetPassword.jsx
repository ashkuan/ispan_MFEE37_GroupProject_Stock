import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import EnterCode from "../components/member/EnterCode";
import EnterEmail from "../components/member/EnterEmail";
import EditPassword from "../components/member/EditPassword";
import axios from "axios";

const ForgetPassword = () => {
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  const [click1, setClick1] = useState(false);
  const [click2, setClick2] = useState(false);

  const handleClose = () => {
    navigate("/loginpage");
  };
  const handlePass = () => {
    setEmailSent(true);
  };

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
    const isValidInput = /^[0-9]$/; // 使用正規表達式確認輸入的字符是否為數字
    // 確保只有數字和允許的特殊鍵可以被輸入
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
    // 移除非數字字符
    const input = event.target;
    const value = input.value;
    input.value = value.replace(/[^0-9]/g, "");
  };

  const fetchMessage = async () => {
    try {
      const res = await axios.get("http://localhost:3333/getMesFromBackend");
      const message = res.data.message;
      console.log(message);
      setMessage1(message);
    } catch (error) {
      console.log("無法取得後端資料", error);
    }
  };

  const fetchMessage2 = async () => {
    try {
      const res = await axios.get("http://localhost:3333/getMesFromBackend2");
      // console.log(res.data);
      const message = res.data.message;
      console.log(message);
      setMessage2(message);
    } catch (error) {
      console.log("無法取得後端資料", error);
    }
  };

  const handleClick1 = () => {
    setClick1(true);
  };
  const handleClick2 = () => {
    setClick2(true);
  };

  useEffect(() => {
    setMessage1("");
    setMessage2("");
  }, []);

  useEffect(() => {
    fetchMessage();
  }, [click1]);

  useEffect(() => {
    fetchMessage2();
  }, [click2]);

  return (
    <div style={{ marginTop: "120px" }}>
      {!emailSent ? (
        <div className="mt-10_5rem d-flex align-items-center justify-content-center">
          <form
            action="http://localhost:3333/sendEmail"
            method="post"
            id="memberLogin"
            className="card p-4 rounded-4 drop-shadow-20"
          >
            <div className="card-body fw-bold px-5 text-IronGray-Deep">
              <div className="">
                <label
                  htmlFor="email"
                  className="d-flex justify-content-center m-auto py-3 fs-3"
                >
                  忘記密碼
                </label>
                <input
                  type="email"
                  name="email"
                  className="member-inp border-1 rounded-2"
                  placeholder="請輸入 Email"
                />
              </div>
              <div className="d-flex flex-column justify-content-around">
                <button
                  type="submit"
                  onClick={handlePass}
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
      ) : (
        <div
          className="mt-10_5rem align-items-center justify-content-center"
          style={{ display: "none" }}
        >
          <form
            action="http://localhost:3333/sendEmail"
            method="post"
            id="memberLogin"
            className="card p-4 rounded-4 drop-shadow-20"
          >
            <div className="card-body fw-bold px-5 text-IronGray-Deep">
              <div className="">
                <label
                  htmlFor="email"
                  className="d-flex justify-content-center m-auto py-3 fs-3"
                >
                  忘記密碼
                </label>
                <input
                  type="email"
                  name="email"
                  className="member-inp border-1 rounded-2"
                  placeholder="請輸入 Email"
                />
              </div>
              <div className="d-flex flex-column justify-content-around">
                <button
                  type="submit"
                  onClick={handlePass}
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

      {message1 !== "" && message2 == "" ? (
        <div
          style={{
            width: "450px",
            height: "800px",
          }}
        >
          <form
            action="http://localhost:3333/sendCode"
            method="post"
            id="enterCode"
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
                  autoFocus
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
                  autoFocus
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
                  autoFocus
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
                  autoFocus
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
                  autoFocus
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
              onClick={handleClick1}
            >
              提交
            </button>
          </form>
        </div>
      ) : null}
      {message2 !== "" ? (
        <div className="mt-10_5rem d-flex align-items-center justify-content-center">
          <form
            action="http://localhost:3333/sendNewPassword"
            method="post"
            id="memberLogin"
            className="card p-4 rounded-4 drop-shadow-20"
          >
            <div className="card-body fw-bold px-5 text-IronGray-Deep">
              <div className="">
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
                />
              </div>
              <div className="d-flex flex-column justify-content-around">
                <button
                  type="submit"
                  className="btn btn-login py-2 mb-4 mt-4"
                  onClick={handleClick2}
                >
                  送出
                </button>
                <button className="btn btn-login py-2 mb-4">取消</button>
              </div>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default ForgetPassword;
