import React, { useContext, useState } from "react";
import Footer from "../components/Footer";
import { ShopContext } from "../../context/ShopContext";
import { Product } from "./Product";

const Myproduct = (props) => {
  const { products, addToCart } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);

  // 抓出url，找到pid參數的值
  const queryParams = new URLSearchParams(window.location.search);
  const URLpid = queryParams.get("pid");
  console.log(URLpid);

  // 找出與資料庫products pid相符的資料
  const filteredProducts = products.filter((product) => product.pid == URLpid);

  return (
    <>
      <div id="myproductContainer" className="container">
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
            <>
              <div className="d-flex" id="myproduct" key={pid}>
                <div id="myproductLeft" className="d-flex">
                  <div id="myproductLeftSmall">
                    <div className="imageBox">
                      <img
                        src={pimage1}
                        onClick={() => handleImage(pimage1)}
                        className={currentImage === pimage1 ? "active" : ""}
                      />
                    </div>
                    <div className="imageBox">
                      <img
                        src={pimage2}
                        onClick={() => handleImage(pimage2)}
                        className={currentImage === pimage2 ? "active" : ""}
                      />
                    </div>
                    <div className="imageBox">
                      <img
                        src={pimage3}
                        onClick={() => handleImage(pimage3)}
                        className={currentImage === pimage3 ? "active" : ""}
                      />
                    </div>
                    <div className="imageBox">
                      <img
                        src={pimage4}
                        onClick={() => handleImage(pimage4)}
                        className={currentImage === pimage4 ? "active" : ""}
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
                    <button id="plusBtn">+</button>
                    <input
                      className="text-center"
                      type="text"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    <button id="minusBtn">-</button>
                  </div>
                  <div
                    className="fs-3 fw-bold d-flex justify-content-end"
                    style={{ width: "100%" }}
                  >
                    NT$ {pprice}
                  </div>
                  <div className="fs-4 fw-bold d-flex justify-content-end">
                    <button
                      id="addToCart"
                      onClick={() => {
                        addToCart(pid, Number(quantity));
                      }}
                    >
                      加入購物車
                    </button>
                  </div>
                </div>
              </div>
              <div id="desc">
                <p className="fs-3 fw-bold">內容介紹</p>
                <hr />
                <pre>{pdesc}</pre>
              </div>
            </>
          );
        })}
      </div>
      <Footer></Footer>
    </>
  );
};
export default Myproduct;
