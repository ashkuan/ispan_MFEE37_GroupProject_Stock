import React,{useState} from "react";
import Navbar from "../components/Nav";
import "../styles/register.css";
import Sidebar from "../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../components/registerValidation";
import axios from "axios";


const Register = () => {
  const [values, setValues] = useState({
    name:"",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if(errors.name === '' && errors.email === '' && errors.password === ''){
      axios.post('http://localhost:3000/register',values)
      .then(res => {
        navigate('/')
      })
      .catch(err => console.log(err))
    }
  };

  return (
    <>
      <Navbar></Navbar>
      
      <form action="" onSubmit={handleSubmit}>
        <div className="register-area container">
          <p className="text-center register-title">會員註冊</p>
          <hr />
          <div className="text-center input-row">
            <label htmlFor="name">姓名:</label>
            <input className="regi-input"
              onChange={handleInput}
              name="name" 
              type="text" 
              placeholder="請輸入姓名" />
              {errors.name && (<p className="text-danger">{errors.name}</p>)}
          </div>
          <div className="text-center input-row-radio">
            <span>性別:</span>
            <div className="sexoption">
              <input
                className="inputradio inputradio-male"
                type="radio"
                defaultValue="male"
              />
              <label htmlFor="male">男</label>
              <input
                className="inputradio inputradio-female"
                type="radio"
                defaultValue="female"
              />
              <label htmlFor="female">女</label>
            </div>
          </div>
          <div className="text-center input-row">
            <span>帳號:</span>
            <input className="regi-input" type="text" />
          </div>
          <div className="text-center input-row">
            <label htmlFor="password">密碼:</label>
            <input className="regi-input" 
              onChange={handleInput}
              name="password"
              type="text" 
              placeholder="請輸入密碼"/>
            {errors.password && (<p className="text-danger">{errors.password}</p>)}
          </div>
          <div className="text-center input-row pwdc">
            <span>確認密碼:</span>
            <input className="regi-input" type="text" />
          </div>
          <div className="text-center input-row pwdc">
            <label htmlFor="email">電子信箱:</label>
            <input className="regi-input"
              onChange={handleInput}
              name="email" 
              type="email" 
              placeholder="請輸入信箱" />
            {errors.email && (<p className="text-danger">{errors.email}</p>)}
          </div>
          <div className="text-center">
            <button type="submit" className="register-btn">註冊</button>
          </div>
          <div className="register-fast">
            <div className="register-fast-row">
              <img src="./img/memberimg/google.svg" alt="" />
              <p>google</p>
            </div>
            <div className="register-fast-row">
              <img src="./img/memberimg/fb.svg" alt="" />
              <p>Facebook</p>
            </div>
            <div className="register-fast-row">
              <img src="./img/memberimg/line.svg" alt="" />
              <p>Line</p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;
