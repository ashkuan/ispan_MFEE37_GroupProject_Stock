import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import { ShopContext } from "../../context/ShopContext";
import { Toast } from "react-bootstrap";
import uuid4 from "uuid4";
import { Alert } from "@mui/material";
import { AlertTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Myproduct = () => {
  const navigate = useNavigate();
  const { products, addToCart } = useContext(ShopContext);
  const uid = sessionStorage.getItem("uid");
  const [quantity, setQuantity] = useState(1);
  // const [inputValue, setInputValue] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [pwdSuccess, setPwdSuccess] = useState(false);

  const handleButtonClick = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const handleButtonClick2 = () => {
    setPwdSuccess(true);
    setTimeout(() => {
      navigate("/loginpage");
    }, 3000);
  };

  // 抓出url，找到pid參數的值
  const queryParams = new URLSearchParams(window.location.search);
  const URLpid = queryParams.get("pid");
  // console.log(URLpid);

  // 找出與資料庫products pid相符的資料
  const filteredProducts = products.filter((product) => product.pid == URLpid);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div>
      <div id="myproductContainer" key={uuid4()} className="container">
        {pwdSuccess && (
          <div className="d-flex justify-content-center">
            <Alert
              className="py-3 "
              icon={false}
              style={{
                backgroundColor: "rgba(40, 178, 79, 0.777)",
                color: "white",
                width: "50%",
                zIndex: "100",
                position: "fixed",
                top: "300px",
              }}
            >
              <AlertTitle className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  class="bi bi-check-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                </svg>
                <span className="fs-3 ms-4">請先登入會員</span>
              </AlertTitle>
              <span className="fs-5" style={{ marginLeft: "65px" }}>
                登入後才可加入購物車 — <strong>跳轉至登入頁面中</strong>
              </span>
            </Alert>
          </div>
        )}

        {filteredProducts.map((product) => {
          const {
            pid,
            pname,
            pimage1,
            pimage2,
            pimage3,
            pimage4,
            pprice,
            pdesc,
            pauthor,
            ptranslator,
            ppublisher,
            ppublicationDate,
          } = product;

          const [currentImage, setCurrentImage] = useState(pimage1);
          const handleImage = (newImage) => {
            setCurrentImage(newImage);
          };
          return (
            <div>
              <div key={pid}>
                <div className="d-flex" id="myproduct" key={pid}>
                  <div id="myproductLeft" className="d-flex">
                    <img
                      id="bigImg"
                      src={currentImage}
                      width="400px"
                      height="450px"
                    />
                    <div id="myproductLeftSmall">
                      <div className="imageBox">
                        <img
                          src={pimage1}
                          onClick={() => handleImage(pimage1)}
                          className={currentImage === pimage1 ? "active" : ""}
                          key="1"
                        />
                      </div>
                      <div className="imageBox">
                        <img
                          src={pimage2}
                          onClick={() => handleImage(pimage2)}
                          className={currentImage === pimage2 ? "active" : ""}
                          key="2"
                        />
                      </div>
                      <div className="imageBox">
                        <img
                          src={pimage3}
                          onClick={() => handleImage(pimage3)}
                          className={currentImage === pimage3 ? "active" : ""}
                          key="3"
                        />
                      </div>
                      <div className="imageBox">
                        <img
                          src={pimage4}
                          onClick={() => handleImage(pimage4)}
                          className={currentImage === pimage4 ? "active" : ""}
                          key="4"
                        />
                      </div>
                    </div>
                  </div>
                  <div id="myproductRight">
                    <p className="title fw-bold">{pname}</p>
                    <p>作 者： {pauthor}</p>
                    {ptranslator && <p>譯 者： {ptranslator}</p>}
                    <p>出 版 社： {ppublisher}</p>
                    <p>出 版 日 期： {ppublicationDate}</p>
                    <hr />
                    <p className="fs-5 fw-bold">數量：</p>
                    <div id="amount">
                      <button
                        onClick={() => {
                          if (quantity > 1) {
                            setQuantity(quantity - 1);
                          }
                        }}
                        id="plusBtn"
                      >
                        -
                      </button>
                      <input
                        className="text-center"
                        type="text"
                        value={quantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value)) {
                            setQuantity(value);
                          }
                        }}
                      />
                      <button
                        id="minusBtn"
                        onClick={() => {
                          setQuantity(quantity + 1);
                        }}
                      >
                        +
                      </button>
                    </div>
                    <div
                      className="fs-3 fw-bold d-flex justify-content-end"
                      style={{ width: "100%" }}
                    >
                      NT$ {pprice * quantity}
                    </div>
                    <div className="fs-4 fw-bold d-flex justify-content-end">
                      <button
                        id="addToCart"
                        onClick={() => {
                          if (uid) {
                            addToCart(pid, Number(quantity));
                            handleButtonClick();
                          } else {
                            handleButtonClick2();
                          }
                        }}
                      >
                        加入購物車
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <Toast
                id="toast"
                show={showToast}
                onClose={() => setShowToast(false)}
                key="1"
              >
                <Toast.Header
                  style={{ backgroundColor: "#b4c7dd", border: "none" }}
                >
                  <strong className="me-auto"></strong>
                </Toast.Header>
                <Toast.Body>
                  <b>{pname}</b>，已加入購物車。
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "gray",
                      textAlign: "right",
                      paddingTop: "30px",
                    }}
                  >
                    可至右上角購物車查看
                  </p>
                </Toast.Body>
              </Toast>
              <div id="desc">
                <p className="fs-2 fw-bold">內容介紹</p>
                <hr />
                <br />
                <pre>{pdesc}</pre>
              </div>
            </div>
          );
        })}
      </div>
      <Footer></Footer>
    </div>
  );
};
export default Myproduct;
