import React, { useContext, useState } from "react";
import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import "../styles/checkout.css";
import { ShopContext } from "../../context/ShopContext";
import TWzipcode from "react-twzipcode";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { uid, name, email, photopath } = useContext(UserContext);
  console.log("這是checkout的uid：" + uid + "，沒有就代表沒登入");
  const { products, cartItems, calculateCartTotal } = useContext(ShopContext);
  const [address, setAddress] = useState("");

  // 要把cartItems的paccount不為0的pid抓出來後，拿去找products中的所有資料
  const filteredCartItems = Object.entries(cartItems).filter(
    (item) => item[1] !== 0
  );

  const handleAddressChange = (value) => {
    setAddress(value);
  };

  const [invoiceType, setInvoiceType] = useState(1);
  const [invoiceType2, setInvoiceType2] = useState(1);
  const handleInvoiceTypeChange = (e) => {
    setInvoiceType(parseInt(e.target.value));
  };
  const handleInvoiceTypeChange2 = (e) => {
    setInvoiceType2(parseInt(e.target.value));
  };

  return (
    <>
      <Navbar></Navbar>
      {/* 主要內容 */}
      <form action="http://localhost:7654/sendOrder" method="post">
        <div className="container checkoutContainer">
          {/* 結帳左邊 */}
          <div id="left" className="px-5 py-4">
            <div id="user" className="fw-bold">
              <input
                type="text"
                name="uid"
                value={uid}
                style={{ display: "none" }}
              />
              <img
                className="sidebar-userphoto"
                src="/public/img/memberimg/Mask Group.svg"
              />
              <p id="userName">{name}</p>
            </div>
            {/* 取貨姓名 */}
            <div className="mb-4">
              <label htmlFor="name" className="form-label">
                取貨姓名
              </label>
              <input
                type="text"
                className="form-control"
                name="userName"
                value={name}
              />
            </div>
            {/* 手機號碼 */}
            <div className="mb-4">
              <label htmlFor="phone" className="form-label">
                手機號碼
              </label>
              <input
                name="phoneNumber"
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
                name="email"
                type="email"
                className="form-control"
                id="email"
                placeholder="請輸入您的email"
                value={email}
              />
            </div>
            {/* 取貨資料 */}
            <div className="mb-4">
              <label className="form-label">寄送地址</label>
              {/* 超商取貨 */}
              {/* <div className="form-check">
                <input
                  className="form-check-input mx-4"
                  type="radio"
                  name="LogisticsType"
                  id="flexRadioDefault1"
                  defaultChecked
                  style={{ width: 30, height: 30 }}
                  value="conve"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  超商取貨
                </label>
              </div> */}
              {/* 超商取貨付款 */}
              {/* <div className="form-check my-3">
                <input
                  className="form-check-input mx-4"
                  type="radio"
                  name="LogisticsType"
                  id="flexRadioDefault2"
                  style={{ width: 30, height: 30 }}
                  value="convepay"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  超商取貨（取貨付款）
                </label>
              </div> */}
              {/* 選擇門市*/}
              <div className="form-group custom-select">
                <div className="row">
                  <TWzipcode
                    className="form-control"
                    countyFieldName="county"
                    districtFieldName="district"
                    addressFieldName="address"
                    handleChange={handleAddressChange}
                    required
                  />
                  <input
                    type="text"
                    name="address2"
                    className="form-control address2"
                    placeholder="路/巷/號/樓"
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
                  name="message"
                  id="message"
                  style={{ height: "100" }}
                  placeholder="留言給我們"
                />
              </div>
            </div>
            {/* 發票類型 */}
            <div className="mb-4">
              <label className="form-label">發票類型</label>
              <select
                className="form-select"
                value={invoiceType}
                onChange={handleInvoiceTypeChange}
                name="invoiceType"
              >
                <option value={1}>雲端發票</option>
                <option value={2}>捐贈發票</option>
                <option value={3}>公司戶紙本發票</option>
              </select>
            </div>
            {/* 載具 */}
            {invoiceType == 1 && (
              <div className="mb-4 fs-3 fw-bold">
                <label className="form-label">載具類型</label>
                <select
                  className="form-select"
                  value={invoiceType2}
                  onChange={handleInvoiceTypeChange2}
                  name="invoiceType2"
                >
                  <option value={1}>手機條碼</option>
                  <option value={2}>自然人憑證條碼</option>
                </select>
              </div>
            )}
            {/* 條碼  */}
            {invoiceType == 1 && invoiceType2 == 1 && (
              <div className="mb-4">
                <label htmlFor="code" className="form-label">
                  手機條碼
                </label>
                <input
                  type="text"
                  placeholder="請輸入手機條碼"
                  className="form-control"
                  id="code"
                  name="invoiceCode"
                />
              </div>
            )}
            {/* 自然人憑證條碼  */}
            {invoiceType == 1 && invoiceType2 == 2 && (
              <div className="mb-4">
                <label htmlFor="code" className="form-label">
                  自然人憑證條碼
                </label>
                <input
                  type="text"
                  placeholder="請輸入自然人憑證條碼"
                  className="form-control"
                  id="code"
                  name="naturalCode"
                />
              </div>
            )}
            {/* 捐贈碼 */}
            {invoiceType == 2 && (
              <div className="mb-4">
                <label htmlFor="donationCode" className="form-label">
                  捐贈碼
                </label>
                <input
                  type="text"
                  placeholder="請輸入捐贈碼"
                  className="form-control"
                  id="donationCode"
                  name="donationCode"
                />
              </div>
            )}
            {invoiceType == 3 && (
              <div className="mb-4">
                <label htmlFor="donationCode" className="form-label">
                  統一編號
                </label>
                <input
                  type="text"
                  placeholder="請輸入統一編號"
                  className="form-control"
                  name="uniNumber"
                />
                <label htmlFor="donationCode" className="form-label">
                  公司名稱
                </label>
                <input
                  type="text"
                  placeholder="請輸入公司名稱"
                  className="form-control"
                  name="companyName"
                />
              </div>
            )}
            {/* 付款方式 */}
            <div className="mb-4">
              <label className="form-label">付款方式</label>
              {/* 刷卡 */}
              <div className="form-check">
                <input
                  className="form-check-input mx-4"
                  type="radio"
                  name="ChoosePayment"
                  id="flexRadioDefault3"
                  style={{ width: 30, height: 30 }}
                  defaultChecked
                  value="linepay"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault3">
                  Line Pay
                </label>
              </div>
              {/* PayPal */}
              <div className="form-check my-3">
                <input
                  className="form-check-input mx-4"
                  type="radio"
                  name="ChoosePayment"
                  id="flexRadioDefault4"
                  style={{ width: 30, height: 30 }}
                  value="paypal"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault4">
                  PayPal
                </label>
              </div>
            </div>
          </div>
          {/* 結帳右邊 */}
          <div id="right" className="my-5">
            {filteredCartItems.map((item1) => {
              // console.log(item1);
              const pid = item1[0];
              const paccount = item1[1];
              // console.log(pid);
              const filteredProducts = products.filter(
                (product) => product.pid == pid
              );
              // console.log(filteredProducts);
              const pname = filteredProducts[0].pname;
              const pimage1 = filteredProducts[0].pimage1;
              const pdesc = filteredProducts[0].pdesc;
              const pprice = filteredProducts[0].pprice;
              // console.log(pname);
              // console.log(pimage);
              return (
                <>
                  <div
                    key={pid}
                    className="card d-flex flex-row align-items-start"
                  >
                    <input
                      type="text"
                      name="pid"
                      value={`${pid}:${paccount}`}
                      style={{ display: "none" }}
                    />
                    {/* 購物車 - 左 */}
                    <img src={pimage1} className="card-img-top" />
                    {/* 購物車 - 中 */}
                    <div className="card-body d-flex flex-column align-items-start mx-1">
                      <p className="card-title fw-bold">{pname}</p>
                      <p
                        className="card-text"
                        style={{
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                        }}
                      >
                        {pdesc}
                      </p>
                    </div>
                    {/* 購物車 - 右 */}
                    <div
                      className="d-flex flex-column justify-content-between align-items-end mt-3"
                      style={{ height: 140 }}
                    >
                      <div className="count d-flex fw-bold">
                        數量：
                        <p>{paccount}</p>
                      </div>
                      <div className="total fw-bold">
                        NT$ {paccount * pprice}
                      </div>
                    </div>
                  </div>
                  <hr />
                </>
              );
            })}
            {/* 價格 */}
            <div id="discount">
              <span>優惠碼</span>
              <input name="coupon" type="text" placeholder="請輸入優惠碼" />
              <span>-NT$ 60</span>
            </div>
            <div id="sum" className="price">
              <p>合計</p>
              <p>NT$ {calculateCartTotal()}</p>
            </div>
            <div id="fee" className="price">
              <p>運費</p>
              <p>NT$ 60</p>
            </div>
            <hr />
            <div id="finalSum" className="price">
              <p>總金額</p>
              <input
                name="totalAmount"
                value={`NT$ ${calculateCartTotal() - 60}`}
                style={{
                  border: "none",
                  backgroundColor: "#dddddd",
                  textAlign: "end",
                }}
              ></input>
            </div>
          </div>
        </div>
        <button id="sendOrderBtn" type="submit" className="btn fs-3 mt-5">
          <Link to="/shop/orderSuccess">送出訂單</Link>
        </button>
      </form>
      <Footer></Footer>
    </>
  );
};

export default Checkout;
