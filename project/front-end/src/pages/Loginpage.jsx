import { Link, useNavigate } from "react-router-dom";
import Validation from "./loginValidation";
import axios from "axios";
import { useState } from "react";
import "../styles/loginpage.css";
import "../styles/forum_main.css";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import ForgetPassword from "./ForgetPassword";
const Loginpage = () => {
  const uid = sessionStorage.getItem("uid");
  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const photopath = sessionStorage.getItem("photopath");
  const [userIsLogin, setUserIsLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  // 會員
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
            console.log(res.data);
            // setUid(res.data);
            sessionStorage.setItem("uid", res.data.uid);
            sessionStorage.setItem("name", res.data.name);
            sessionStorage.setItem("email", res.data.email);
            sessionStorage.setItem("password", res.data.password);
            sessionStorage.setItem("photopath", res.data.photopath);
            const uid = sessionStorage.getItem("uid");
            const name = sessionStorage.getItem("name");
            const email = sessionStorage.getItem("email");
            const password = sessionStorage.getItem("password");
            const photopath = sessionStorage.getItem("photopath");
            // console.log("session的uid:" + uid);
            // console.log("session的name:" + name);
            // console.log("session的email:" + email);
            // console.log("session的password:" + password);
            // console.log("session的photopath:" + photopath);
            navigate("/");
          } else {
            alert("此帳號不存在");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  return (
    <>
      <div className="mt-10_5rem d-flex align-items-center justify-content-center">
        <form
          id="memberLogin"
          onSubmit={handleSubmit}
          className="card p-4 rounded-4 drop-shadow-20"
        >
          <div className="card-body fw-bold px-5 text-IronGray-Deep">
            <div className="">
              <label
                htmlFor="email"
                className="d-flex justify-content-center m-auto py-3 fs-3"
              >
                會員帳號
              </label>
              <input
                onChange={handleInput}
                type="email"
                name="email"
                className="member-inp border-1 rounded-2"
                placeholder="請輸入 Email"
              />
            </div>
            <div>
              {errors.email && (
                <p className="text-Red ps-3 fz-3">{errors.email}</p>
              )}
            </div>
            <div className="mt-3 mb-5">
              <label
                htmlFor="password"
                className="d-flex justify-content-center m-auto py-3 fs-3"
              >
                會員密碼
              </label>
              <input
                onChange={handleInput}
                type={type}
                name="password"
                className="member-inp border-1 rounded-2"
                placeholder="請輸入密碼"
              />
              <span className="" onClick={handleToggle}>
                <Icon className="ps-2" icon={icon} size={25} />
              </span>

              <div>
                {errors.password && (
                  <p className="text-Red ps-3 fz-3">{errors.password}</p>
                )}
              </div>
            </div>
            <div className="d-flex flex-column justify-content-around">
              <button type="submit" className="btn btn-login py-2 mb-4">
                登 入
              </button>
              <Link
                to="/register"
                className="notYetRegister fw-normal py-2 fs-5"
              >
                尚未註冊嗎？請點此
              </Link>
              <Link
                to="/forgetpassword"
                className="notYetRegister fw-normal py-2 fs-5"
              >
                忘記密碼嗎？請點此
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Loginpage;
