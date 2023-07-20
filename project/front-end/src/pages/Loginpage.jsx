import { Link, Navigate, useNavigate } from "react-router-dom";
import Validation from "./loginValidation";
import axios from "axios";
import NavSearch from "../components/IndStock/NavSearch";
import { UserContext } from "../../context/UserContext";
import { useContext, useState } from "react";
import "../styles/loginpage.css";
import "../styles/forum_main.css";

const Loginpage = () => {
  const { uid,setUid } = useContext(UserContext);
  // 會員
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [values, setValues] = useState({
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
    if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:3000", values, { withCredentials: true })
        .then((res) => {
          if (res.data !== "") {
            // 變更登入狀態
            console.log(res.data)
            setUid(res.data)
            // setIsLoggedIn(true);
            navigate("/");
          } else {
            alert("此帳號不存在");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <div className="mt-8rem d-flex align-items-center justify-content-center">
        <form id="memberLogin" onSubmit={handleSubmit} className="card p-4 rounded-4 drop-shadow-20">
          <div className="card-body px-5 text-IronGray-Deep">
            <div className="">
              <label htmlFor="email" className="d-flex justify-content-center m-auto py-3 fs-2">
                會員信箱
              </label>
              <input
                onChange={handleInput}
                type="email"
                name="email"
                className="member-inp"
                placeholder="請輸入您的信箱"
              />
            </div>
            <div>
              {errors.email && (
                <p className="text-Red ps-3 fz-3">{errors.email}</p>
              )}
            </div>
            <div className="mt-3 mb-5">
              <label htmlFor="password" className="d-flex justify-content-center m-auto py-3 fs-2">
                會員密碼
              </label>
              <input
                onChange={handleInput}
                type="password"
                name="password"
                className="member-inp"
                placeholder="請輸入您的密碼"
              />
              <div>
                {errors.password && (
                  <p className="text-Red ps-3 fz-3">{errors.password}</p>
                )}
              </div>
            </div>
            <div className="d-flex flex-column justify-content-around">
              <button
                type="submit"
                className="btn btn-login py-2 mb-4"
              >
                登 入
              </button>
              <Link
                to="/register"
                className="notYetRegister py-2 fs-5"
              >
                尚未註冊嗎？請點此
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Loginpage;
