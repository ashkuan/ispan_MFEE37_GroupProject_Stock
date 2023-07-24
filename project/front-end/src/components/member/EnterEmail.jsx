import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "../../styles/loginpage.css";
import "../../styles/forum_main.css";
import { eyeOff } from "react-icons-kit/feather/eyeOff";

const EnterEmail = () => {
  const uid = sessionStorage.getItem("uid");
  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const photopath = sessionStorage.getItem("photopath");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleClose = () => {
    navigate("/loginpage");
  };
  const handlePass = () => {
    setEmailSent(true);
  };
  return (
    <>
      {!emailSent ? (
        <div className="mt-10_5rem d-flex align-items-center justify-content-center">
          <form id="memberLogin" className="card p-4 rounded-4 drop-shadow-20">
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
      ) : null}
    </>
  );
};

export default EnterEmail;
