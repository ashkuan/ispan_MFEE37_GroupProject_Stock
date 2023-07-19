import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Nav";
import "../styles/register.css";
import Sidebar from "../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../components/registerValidation";
import axios from "axios";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
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
              couponTime: couponTime
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
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div className="register-area container">
          <p className="text-center register-title">會員註冊</p>
          <hr />
          <div className="member-photo">
            <div className="photo-container">
              <input type="file" name="avatar" onChange={handleInput} className="inputfile" />

              <img className="showimg text-danger text-center" src="" alt="請上傳圖片" ref={showImgRef}/>
              {/* {gender === "male" ? (
                <img
                  className="photo"
                  src="./img/memberimg/memoji/memo5.png"
                  alt="Male Avatar"
                />
              ) : (
                <img
                  className="photo"
                  src="./img/memberimg/memoji/memo7.png"
                  alt="Female Avatar"
                />
              )} */}
              <h4 className="text-center">用戶大頭照</h4>
              
            </div>
          </div>
          <div className="text-center input-row">
            <label className="short-lab" htmlFor="name">姓名:</label>
            
            <input
              className="regi-input"
              onChange={handleInput}
              name="name"
              type="text"
              placeholder="請輸入姓名"
            />
            {errors.name && <p className="text-danger">{errors.name}</p>}
          </div>
          <div className="text-center input-row-radio">
            <label>性別:</label>
            <div className="sexoption">
              <input
                className="inputradio inputradio-male"
                type="radio"
                name="sex"
                value="male"
                // checked={gender === "male"}
                // onChange={handleGenderChange}
              />
              <label htmlFor="male">男</label>
              <input
                className="inputradio inputradio-female"
                type="radio"
                name="sex"
                value="female"
                // checked={gender === "female"}
                // onChange={handleGenderChange}
              />
              <label htmlFor="female">女</label>
            </div>
          </div>
          <div className="text-center input-row">
            <label className="short-lab ">編號:</label>
            <input className="regi-input numinput" type="text" placeholder="此欄位請勿填寫,由系統生成" readOnly />
          </div>
          <div className="text-center input-row">
            <label className="short-lab" htmlFor="password">密碼:</label>
            <input
              className="regi-input"
              onChange={handleInput}
              name="password"
              type="password"
              placeholder="請輸入密碼(須大小英文+數字總共8位數以上)"
            />
            {errors.password && (
              <p className="text-danger">{errors.password}</p>
            )}
          </div>
          <div className="text-center input-row pwdc">
            <label>確認密碼:</label>
            <input className="regi-input" type="password" placeholder="請確認密碼" />
          </div>
          <div className="text-center input-row pwdc">
            <label htmlFor="email">電子信箱:</label>
            <input
              className="regi-input"
              onChange={handleInput}
              name="email"
              type="email"
              placeholder="請輸入信箱(eg.xxxxx@xxx.xxx)"
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </div>
          <div className="text-center">
            <button type="submit" className="register-btn">
              註冊
            </button>
            <div className="register-fast d-flex">
              <div className="register-fast-row">
                <img src="./img/memberimg/google.svg" alt="" />
                
              </div>
              <div className="register-fast-row">
                <img src="./img/memberimg/fb.svg" alt="" />
                
              </div>
              <div className="register-fast-row">
                <img src="./img/memberimg/line.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;
