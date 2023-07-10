import React, { useContext } from "react";
import Footer from "../components/Footer";
import { ShopContext } from "../../context/ShopContext";
import { Product } from "./Product";

const Myproduct = (props) => {
  const { products } = useContext(ShopContext);

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
          const { pid, pname, pimage, pprice, pdesc } = product;
          console.log(pid);
          console.log(pimage);
          return (
            <>
              <div className="d-flex" id="myproduct" key={pid}>
                <div id="myproductLeft" className="d-flex">
                  <div id="myproductLeftSmall">
                    <div className="imageBox">
                      <img src={pimage} />
                    </div>
                    <div className="imageBox">
                      <img src={pimage} />
                    </div>
                    <div className="imageBox">
                      <img src={pimage} />
                    </div>
                  </div>
                  <img src={pimage} width="500px" />
                </div>
                <div id="myproductRight">
                  <p className="fs-2 fw-bold">{pname}</p>
                  <p className="fs-5">作 者： 傑西．李佛摩</p>
                  <p className="fs-5">譯 者： 榮千</p>
                  <p className="fs-5">出 版 社： 海鷹文化</p>
                  <p className="fs-5">出 版 日 期： 2021/01/07</p>
                  <hr />
                  <p className="fs-5 fw-bold">數量：</p>
                  <div id="amount">
                    <button id="plusBtn">+</button>
                    <input
                      className="text-center"
                      type="text"
                      id=""
                      defaultValue={1}
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
                    <button id="addInCart">加入購物車</button>
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
