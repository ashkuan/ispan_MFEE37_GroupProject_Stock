import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import { ShopContext } from "../../context/ShopContext";
import { Toast } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import uuid4 from "uuid4";

const Myproduct = () => {
  const { products, addToCart } = useContext(ShopContext);
  const { uid } = useContext(UserContext);
  const [quantity, setQuantity] = useState(1);
  // const [inputValue, setInputValue] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleButtonClick = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  // 抓出url，找到pid參數的值
  const queryParams = new URLSearchParams(window.location.search);
  const URLpid = queryParams.get("pid");
  // console.log(URLpid);

  // 找出與資料庫products pid相符的資料
  const filteredProducts = products.filter((product) => product.pid == URLpid);

  return (
    <div>
      <div id="myproductContainer" key={uuid4()} className="container">
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
                    <img src={currentImage} width="500px" height="550px" />
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
                            alert("請先登入會員");
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
