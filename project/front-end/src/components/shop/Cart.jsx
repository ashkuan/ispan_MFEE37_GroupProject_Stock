import React, { useContext } from "react";
import { ShopContext } from "../../../context/ShopContext";
import { RecommendShop } from "./RecommendShop";

export const Cart = () => {
  const {
    products,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemAmount,
    trashCan,
    calculateCartTotal,
  } = useContext(ShopContext);

  return (
    <>
      <div id="myCart" className="modal-body d-flex flex-column">
        {/* 購物車內容(卡片) */}
        {products.map((product, index) => {
          const { pid, pname, pimage1, pprice, pdesc } = product;
          const cartItemAmount = cartItems[pid];
          return (
            cartItemAmount > 0 && (
              <div
                key={pid}
                className="card d-flex flex-row align-items-start mt-5"
                style={{ border: "none" }}
              >
                {/* 購物車 - 左邊圖*/}
                <div className="d-flex align-items-center">
                  <img src={pimage1} className="card-img-top" />
                </div>
                {/* 購物車 - 中間文字*/}
                <div className="card-body d-flex flex-column align-items-start mx-2">
                  <p className="card-title fs-4 fw-bold">{pname}</p>
                  <p className="card-text">{pdesc}</p>
                  {/* 垃圾桶 */}
                  <div className="d-flex justify-content-first">
                    <button
                      className="btn deleteBtn"
                      onClick={() => {
                        trashCan(pid);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="bi bi-trash3-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* 購物車 - 右邊價格和數量 */}
                <div className="cart-right d-flex flex-column justify-content-between mt-2">
                  {/* 商品數量 */}
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic mixed styles example"
                  >
                    <button
                      type="button"
                      className=" minusBtn btn btn-outline-secondary fs-4"
                      onClick={() => {
                        removeFromCart(pid);
                      }}
                    >
                      -
                    </button>
                    <input
                      className="amount"
                      style={{ width: 50 }}
                      value={cartItemAmount}
                      onChange={(e) => {
                        if (e.target.value !== "") {
                          updateCartItemAmount(Number(e.target.value), pid);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace") {
                          e.target.value = ""; // 清空輸入框的值
                        }
                      }}
                    ></input>
                    <button
                      type="button"
                      className="addBtn btn btn-outline-secondary fs-4"
                      onClick={() => {
                        addToCart(pid, 1);
                      }}
                    >
                      +
                    </button>
                  </div>
                  {/* 商品價格 */}
                  <div className="total fw-bold">
                    NT$ {cartItemAmount * pprice}
                  </div>
                </div>
              </div>
            )
          );
        })}
        <RecommendShop></RecommendShop>
        <div id="cartTotal" className="mt-5">
          總金額： NT$ {calculateCartTotal()}
        </div>
      </div>
    </>
  );
};
