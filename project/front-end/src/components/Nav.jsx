import React, { useContext, useEffect, useState } from "react";
import "../styles/nav.css";
import "../styles/forum_main.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Cart } from "./shop/Cart";
import { ShopContext } from "../../context/ShopContext";
import Validation from "./loginValidation";
import axios from "axios";
import NavSearch from "../components/IndStock/NavSearch";
import { UserContext } from "../../context/UserContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import LoginBtn from "./loginbtn";

const Navbar = () => {
  const { uid } = useContext(UserContext);

  // 購物車
  const { totalCartItemAmount } = useContext(ShopContext);

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
  function handleClick() {
    // 觸發ESC按鈕的按下事件
    console.log("123");
    var escapeEvent = new KeyboardEvent("keydown", {
      key: "Escape",
      keyCode: 27,
    });
    document.dispatchEvent(escapeEvent);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg" id="navbar">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand logoName" href="#">
            <svg
              width="60"
              height="60"
              viewBox="0 0 40 57"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="7" y="29.5273" width="5" height="7" fill="#F58B82" />
              <rect x="14" y="26.5273" width="5" height="10" fill="#F58B82" />
              <rect x="21" y="22.5273" width="5" height="14" fill="#F58B82" />
              <rect x="28" y="18.5273" width="5" height="18" fill="#F58B82" />
              <path
                id="navbar-brand-img"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.998112 34.8662C0.967175 34.8208 0.904987 34.8096 0.860147 34.8414C0.836459 34.8581 0.821399 34.8845 0.819098 34.9135C0.797449 35.1858 0.781191 35.4597 0.770434 35.7351C0.344999 46.6287 8.68585 55.7988 19.4002 56.2173C30.1146 56.6357 39.1452 48.144 39.5707 37.2504C39.631 35.7056 39.5151 34.1955 39.2411 32.7401C39.2335 32.7001 39.1784 32.6957 39.1644 32.7339C39.1568 32.7547 39.1337 32.7655 39.1129 32.7578L35.1404 31.305C35.0019 31.2543 34.8471 31.3119 34.7753 31.4407L32.2083 36.0494L32.0701 36.2976C31.9691 36.4789 31.7189 36.5054 31.5822 36.3491L31.3952 36.1353L28.5957 32.9353C28.4712 32.793 28.2476 32.7999 28.1322 32.9498L25.8866 35.8659L25.6845 36.1284C25.5468 36.3072 25.2683 36.2756 25.1741 36.0704L25.036 35.7693L23.0652 31.4735C22.9747 31.2761 22.7109 31.2373 22.5674 31.4004L20.7952 33.4138L20.6546 33.5736C20.5403 33.7035 20.3401 33.71 20.2176 33.5878L20.0668 33.4375L15.9621 29.3437C15.8329 29.2149 15.6195 29.2302 15.5101 29.3763L11.0853 35.2824L10.8836 35.5515C10.7472 35.7336 10.4657 35.7035 10.3709 35.4968L10.2307 35.1911L8.141 30.6362C8.06357 30.4674 7.85294 30.4088 7.69945 30.5133L1.20873 34.9339C1.14665 34.9761 1.06206 34.9601 1.01978 34.898L0.998112 34.8662Z"
                fill="#EEEEEE"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.84407 20.7353C3.85278 20.9917 4.16037 21.111 4.34324 20.931L9.56315 15.7925L9.73802 15.6203C9.87343 15.487 10.0971 15.5116 10.2003 15.6711L10.3337 15.8771L12.6635 19.4767C12.7896 19.6715 13.0797 19.6555 13.1836 19.4479L16.0871 13.6462L16.1944 13.4319C16.2781 13.2646 16.493 13.2139 16.6427 13.3263L16.8344 13.4701L21.1875 16.7367C21.3296 16.8434 21.5329 16.8038 21.6245 16.6515L23.0798 14.2339L23.245 13.9594C23.3594 13.7694 23.6333 13.7649 23.7538 13.9511L23.9279 14.22L26.2691 17.8372C26.3943 18.0306 26.6817 18.0166 26.7875 17.8119L28.1841 15.1098L28.3005 14.8847C28.3895 14.7124 28.6161 14.6686 28.763 14.7953L28.9549 14.9608L31.7982 17.4135C31.9589 17.552 32.2087 17.4846 32.2778 17.284L33.746 13.0233L33.8033 12.8572C33.8524 12.7148 33.9995 12.6308 34.1471 12.6611L34.3192 12.6964L37.7693 13.4037C38.0051 13.452 38.1976 13.2171 38.099 12.9976C34.846 5.75063 27.4862 1.12803 19.5892 2.09063C10.31 3.2217 3.51639 11.0792 3.84407 20.7353Z"
                fill="#EEEEEE"
              />
            </svg>
            {/* <span className="fw-normal fs-2">股估績</span> */}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link" aria-current="page" href="#">
                  首頁
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/stock-index" className="nav-link pagetitle" href="#">
                  大盤產業
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/forum" className="nav-link" href="#">
                  討論區
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/rookie" className="nav-link" href="#">
                  新手上路
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span style={{ fontSize: "1.6rem", fontWeight: "normal" }}>
                    購物商城
                  </span>
                </Link>
                <ul className="dropdown-menu text-center">
                  <li>
                    <Link className="dropdown-item fs-4 fw-light" to="/shop">
                      購物商城
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item fs-4 fw-light" href="#">
                      訂單狀況
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item fs-4 fw-light" to="/shop/history">
                      歷史訂單
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            {/*右邊*/}
            <div className="d-flex align-items-center">
              <NavSearch />
              <div className="ms-4 cart-icon">
                <button
                  id="cartBtn"
                  type="button"
                  className="btn"
                  data-bs-toggle="modal"
                  data-bs-target="#cartModal"
                >
                  <svg
                    width="45"
                    height="40"
                    viewBox="0 0 45 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M40.3073 25.625H16.8964L17.4191 28.1875H38.8552C40.0852 28.1875 40.9968 29.3327 40.7242 30.5353L40.2836 32.4793C41.7763 33.2058 42.8056 34.7401 42.8056 36.5156C42.8056 39.0142 40.7676 41.0355 38.2675 40.9995C35.8858 40.9652 33.9271 39.0271 33.8628 36.6395C33.8277 35.3353 34.3488 34.1532 35.2047 33.3124H18.462C19.2907 34.1265 19.8056 35.2605 19.8056 36.5156C19.8056 39.0631 17.687 41.1146 15.1201 40.995C12.8409 40.8889 10.9872 39.0423 10.8674 36.7575C10.7749 34.9931 11.7009 33.4379 13.1076 32.6266L7.4976 5.125H1.91667C0.858108 5.125 0 4.26456 0 3.20312V1.92187C0 0.860439 0.858108 0 1.91667 0H10.1047C11.0152 0 11.8 0.642307 11.9825 1.5367L12.7145 5.125H44.0825C45.3125 5.125 46.2241 6.2702 45.9515 7.47281L42.1763 24.1291C41.978 25.0041 41.2022 25.625 40.3073 25.625ZM32.5833 13.4531H28.75V10.25C28.75 9.54235 28.178 8.96875 27.4722 8.96875H26.1945C25.4887 8.96875 24.9167 9.54235 24.9167 10.25V13.4531H21.0833C20.3776 13.4531 19.8056 14.0267 19.8056 14.7344V16.0156C19.8056 16.7233 20.3776 17.2969 21.0833 17.2969H24.9167V20.5C24.9167 21.2076 25.4887 21.7812 26.1945 21.7812H27.4722C28.178 21.7812 28.75 21.2076 28.75 20.5V17.2969H32.5833C33.2891 17.2969 33.8611 16.7233 33.8611 16.0156V14.7344C33.8611 14.0267 33.2891 13.4531 32.5833 13.4531Z"
                      fill="#F3F3F3"
                    />
                  </svg>
                  {uid ? (
                    <>
                      {/* {console.log(uid)} */}
                      {totalCartItemAmount > 0 && (
                        <div className="totalCartItemAmount">
                          {totalCartItemAmount}
                        </div>
                      )}
                    </>
                  ) : null}
                </button>
              </div>
              <div className="ms-1 nav-member-icon">
                <button
                  type="button"
                  className="btn"
                  data-bs-toggle={isLoggedIn ? "" : "modal"}
                  data-bs-target={isLoggedIn ? "" : "#memberModal"}
                  onClick={() => {
                    if (isLoggedIn) {
                      navigate("/member");
                    }
                  }}
                >
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 43 43"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.5 0C9.62298 0 0 9.62298 0 21.5C0 33.377 9.62298 43 21.5 43C33.377 43 43 33.377 43 21.5C43 9.62298 33.377 0 21.5 0ZM21.5 8.32258C25.7133 8.32258 29.129 11.7383 29.129 15.9516C29.129 20.1649 25.7133 23.5806 21.5 23.5806C17.2867 23.5806 13.871 20.1649 13.871 15.9516C13.871 11.7383 17.2867 8.32258 21.5 8.32258ZM21.5 38.1452C16.4111 38.1452 11.851 35.8391 8.7994 32.2327C10.4292 29.1637 13.6196 27.0484 17.3387 27.0484C17.5468 27.0484 17.7548 27.0831 17.9542 27.1438C19.0813 27.5079 20.2603 27.7419 21.5 27.7419C22.7397 27.7419 23.9274 27.5079 25.0458 27.1438C25.2452 27.0831 25.4532 27.0484 25.6613 27.0484C29.3804 27.0484 32.5708 29.1637 34.2006 32.2327C31.149 35.8391 26.5889 38.1452 21.5 38.1452Z"
                      fill="#F3F3F3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* 購物車的彈跳視窗 */}
      <div
        className="modal fade"
        id="cartModal"
        tabIndex={-1}
        aria-labelledby="cartModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-scrollable top-15">
          <div className="modal-content rounded-4">
            <div className="modal-header IronGray-Deep px-5 py-4">
              <div className="modal-title fs-2 py-1 text-white" id="cartModalLabel">
                您的購物車
              </div>
              <button
                type="button"
                className="btn-close btn-close-white fs-4"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            {uid ? (
              <>
                <Cart key="1sdgw549ye0grja"></Cart>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    關閉
                  </button>
                  <button id="payBtn" type="button" className="btn mx-3">
                    <Link
                      to="/shop/checkout"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      結帳 →
                    </Link>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div id="myCart" className="modal-body d-flex flex-column align-items-center py-5 my-5">
                  <p className="fs-3 text-IronGray-Deep mb-5 fw-bold">請先登入會員，再查看購物車!</p>
                  <LoginBtn />
                  {/* <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    關閉
                  </button> */}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 會員登入的彈跳視窗 */}
      <div
        className="modal fade"
        id="memberModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content d-flex justify-content align-items">
            <div className="modal-header member-spacing ">
              <p className="modal-title jump-title" id="exampleModalLabel">
                會員登入
              </p>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-white ">
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
                    {errors.email && (
                      <p className="text-danger">{errors.email}</p>
                    )}
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
                      onClick={handleClick}
                    >
                      註冊
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
