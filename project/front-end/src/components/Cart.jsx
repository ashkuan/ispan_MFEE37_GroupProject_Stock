import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

export const Cart = () => {
  const {
    products,
    totalAmount,
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
        {products.map((product) => {
          const { pid, pname, pimage, pprice, pdesc } = product;
          const cartItemAmount = cartItems[pid];
          return (
            cartItemAmount > 0 && (
              <>
                <div
                  className="card d-flex flex-row align-items-start"
                  style={{ border: "none" }}
                  id={pid}
                >
                  {/* 購物車 - 左邊圖*/}
                  <div className="d-flex align-items-center">
                    <img src={pimage} className="card-img-top" />
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
                          trashCan();
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
                          updateCartItemAmount(Number(e.target.value), pid);
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
                      <div
                        class="toast align-items-center"
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                      >
                        <div class="d-flex">
                          <div class="toast-body">
                            Hello, world! This is a toast message.
                          </div>
                          <button
                            type="button"
                            class="btn-close me-2 m-auto"
                            data-bs-dismiss="toast"
                            aria-label="Close"
                          ></button>
                        </div>
                      </div>
                    </div>
                    {/* 商品價格 */}
                    <div className="total fw-bold">
                      NT$ {cartItemAmount * pprice}
                    </div>
                  </div>
                </div>
                <hr />
              </>
            )
          );
        })}

        {/* 推薦商品 */}
        <div id="recommend-card">
          <p className="title">您可能也會喜歡：</p>
          <div className="d-flex justify-content-center">
            <div className="card">
              <img src="/public/img/shop/p02.png" />
              <p>推薦一</p>
              <button className="recommend-card-btn">加入購物車</button>
            </div>
            <div className="card">
              <img src="/public/img/shop/p03.png" />
              <p>推薦二</p>
              <button className="recommend-card-btn">加入購物車</button>
            </div>
            <div className="card">
              <img src="/public/img/shop/p04.png" />
              <p>推薦三</p>
              <button className="recommend-card-btn">加入購物車</button>
            </div>
          </div>
        </div>
        <div id="cartTotal">總金額： NT$ {calculateCartTotal()}</div>
      </div>
    </>
  );
};
