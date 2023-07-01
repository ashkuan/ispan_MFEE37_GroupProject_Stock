import React from "react";
import Navbar from "../components/Nav";
import "../styles/checkout.css";

const Checkout = () => {
  return (
    <>
      <Navbar></Navbar>
      {/* 主要內容 */}
      <div className="container checkoutContainer">
        {/* 結帳左邊 */}
        <div id="left" className="px-5 py-4">
          <div id="user" className="fw-bold">
            <img
              className="sidebar-userphoto"
              src="/public/img/memberimg/Mask Group.svg"
            />
            <p id="userName">AR Jakir</p>
          </div>
          <form>
            {/* 手機號碼 */}
            <div className="mb-4">
              <label htmlFor="phone" className="form-label">
                手機號碼
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="請輸入您的手機號碼"
              />
            </div>
            {/* email */}
            <div className="mb-4">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="請輸入您的email"
              />
            </div>
            {/* 取貨資料 */}
            <div className="mb-4">
              <label className="form-label">取貨資料</label>
              {/* 超商取貨 */}
              <div className="form-check">
                <input
                  className="form-check-input mx-4"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  defaultChecked
                  style={{ width: 30, height: 30 }}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  超商取貨
                </label>
              </div>
              {/* 超商取貨付款 */}
              <div className="form-check my-3">
                <input
                  className="form-check-input mx-4"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  style={{ width: 30, height: 30 }}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  超商取貨（取貨付款）
                </label>
              </div>
              {/* 選擇門市*/}
              <div className="my-3">
                <select className="form-select">
                  <option disabled selected>
                    請選擇門市
                  </option>
                  <option value={1}>One</option>
                  <option value={2}>Two</option>
                  <option value={3}>Three</option>
                </select>
              </div>
              {/* 姓名 */}
              <div className="row mb-4">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="名字"
                    aria-label="First name"
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="姓氏"
                    aria-label="Last name"
                  />
                </div>
              </div>
              {/* 訂單備註 */}
              <div>
                <label htmlFor="message" className="form-label">
                  訂單備註
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="message"
                  style={{ height: "100", color: "gray" }}
                  defaultValue="留言給我們"
                />
              </div>
            </div>
            {/* 發票類型 */}
            <div className="mb-4">
              <label className="form-label">發票類型</label>
              <select className="form-select">
                <option value={1}>雲端發票</option>
                <option value={2}>捐贈發票</option>
                <option value={3}>公司戶紙本發票</option>
              </select>
            </div>
            {/* 載具 */}
            <div className="mb-4 fs-3 fw-bold">
              <label className="form-label">載具類型</label>
              <select className="form-select">
                <option value={1}>手機條碼</option>
                <option value={2}>會員載具（發票資訊會寄到您的電郵）</option>
                <option value={3}>自然人憑證條碼</option>
              </select>
            </div>
            {/* 條碼  */}
            <div className="mb-4">
              <label htmlFor="code" className="form-label">
                手機條碼
              </label>
              <input
                type="text"
                placeholder="請輸入手機條碼"
                className="form-control"
                id="code"
              />
            </div>
            {/* 付款方式 */}
            <div className="mb-4">
              <label className="form-label">付款方式</label>
              {/* 刷卡 */}
              <div className="form-check">
                <input
                  className="form-check-input mx-4"
                  type="radio"
                  name="flexRadioDefault2"
                  id="flexRadioDefault2"
                  style={{ width: 30, height: 30 }}
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  刷卡
                </label>
              </div>
              {/* PayPal */}
              <div className="form-check my-3">
                <input
                  className="form-check-input mx-4"
                  type="radio"
                  name="flexRadioDefault2"
                  id="flexRadioDefault2"
                  style={{ width: 30, height: 30 }}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  PayPal
                </label>
              </div>
            </div>
            <button id="sendOrderBtn" type="submit" className="btn fs-3 mt-5">
              送出訂單
            </button>
          </form>
        </div>
        {/* 結帳右邊 */}
        <div id="right" className="my-5">
          <div className="card d-flex flex-row align-items-start">
            {/* 購物車 - 左 */}
            {/* 購物車內容-圖 */}
            <img src="/public/img/shop/p01.png" className="card-img-top" />
            {/* 購物車 - 中 */}
            {/* 購物車內容-文字 */}
            <div className="card-body d-flex flex-column align-items-start mx-1">
              <p className="card-title fw-bold">全方位股票分析法</p>
              <p
                className="card-text"
                style={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                }}
              >
                積極主動地追求高效率投資，就是學習專業的股票分析師手法，掌握關鍵的分析面向：基本面找到體質優良的好公司，技術面找到蓄勢待發動能充沛的起漲股，籌碼面找到大戶吃貨主力鎖碼的口袋股，這堂課讓投資人實戰演練面面俱到。
              </p>
            </div>
            {/* 購物車 - 右 */}
            <div
              className="d-flex flex-column justify-content-between align-items-end mt-3"
              style={{ height: 140 }}
            >
              {/* 商品數量 */}
              <div className="count d-flex fw-bold">
                數量：
                <p>1</p>
              </div>
              {/* 商品價格 */}
              <div className="total fw-bold">NT$ 399</div>
            </div>
          </div>
          <hr />
          {/* 價格 */}
          <div id="discount">
            <span>優惠碼</span>
            <input type="text" placeholder="請輸入優惠碼" />
            <span style={{ color: "red" }}>-NT$ 60</span>
          </div>
          <div id="sum" className="price">
            <p>合計</p>
            <p>NT$ 399</p>
          </div>
          <div id="fee" className="price">
            <p>運費</p>
            <p>NT$ 60</p>
          </div>
          <hr />
          <div id="finalSum" className="price">
            <p>總金額</p>
            <p>NT$ 399</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
