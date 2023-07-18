import { Link, Navigate, useNavigate } from "react-router-dom";

import Validation from "./loginValidation";
import axios from "axios";
import NavSearch from "../components/IndStock/NavSearch";
import { UserContext } from "../../context/UserContext";
import { useState } from "react";

const loginPage = () => {
  // 會員
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
          if (res.data === "success") {
            // 變更登入狀態
            setIsLoggedIn(true);
            navigate("/member");
          } else {
            alert("此帳號不存在");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className="text-center m-3">
          <div>
            <label htmlFor="emial" className="m-3">
              會員信箱
            </label>
            <p></p>
            <input
              onChange={handleInput}
              type="email"
              name="email"
              className="member-inp"
              placeholder="輸入您的信箱"
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="m-3">
              會員密碼
            </label>
            <p></p>
            <input
              onChange={handleInput}
              type="password"
              name="password"
              className="member-inp"
              placeholder="輸入您的密碼"
            />
            {errors.password && (
              <p className="text-danger">{errors.password}</p>
            )}
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-login">
              登入
            </button>
            <Link
              to="/register"
              className="btn btn-register"
              
            >
              註冊
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default loginPage;
