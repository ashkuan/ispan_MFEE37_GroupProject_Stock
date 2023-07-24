import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/historyIndOrder.css";
import axios from "axios";
import SideShopBar from "../components/shop/SideShopBar";
import Footer from "../components/Footer";

const HistoryIndOrder = () => {
  // 抓出url，找到oid參數的值
  const queryParams = new URLSearchParams(window.location.search);
  const URLoid = queryParams.get("indOrder");
  //   console.log(URLoid);
  const [indOrderData, setIndOrderData] = useState("");
  const [indProducts, setIndProducts] = useState([]);

  useEffect(() => {
    let myIndProducts = [];
    const fetchMyOrder = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5566/shop/historyIndOrder",
          { URLoid }
        );
        // console.log(res.data[0]);
        setIndOrderData(res.data[0]);
        const myIndProducts = await Promise.all(
          res.data[0].pid.split(",").map(async (data) => {
            //   console.log(data.split(":")[0]);
            const pid = data.split(":")[0];
            //   const fetchProduts = async () => {
            try {
              const res = await axios.post(
                "http://localhost:5566/shop/historyIndProducts",
                { pid }
              );
              //   console.log(res.data[0]);
              return res.data[0];
              //   myIndProducts.push(res.data[0]);
            } catch (err) {
              console.log(err);
              return null;
            }
            //   };
          })
        );
        // console.log("myIndProducts:", myIndProducts); // 確認 myIndProducts 是否包含資料
        setIndProducts(myIndProducts.filter((product) => product !== null));
      } catch (err) {
        console.log(err);
      }
    };
    fetchMyOrder();
  }, []);

  return (
    <>
      <div className="historyIndOrder_container">
        <p className="pb-5 bread">
          <Link to="/shop">商城</Link> &gt;{" "}
          <Link to="/shop/history">歷史訂單</Link> &gt; <a>訂單編號-{URLoid}</a>
        </p>
        {indOrderData && (
          <>
            <p className="title" style={{ letterSpacing: "1.5px" }}>
              訂單編號 #{URLoid}
            </p>
            <div
              style={{
                fontSize: "1.7rem",
                color: "gray",
                marginBottom: "50px",
                marginTop: "-30px",
              }}
            >
              訂單 #{URLoid} 已於 <span></span>
              {indOrderData.merchantTradeDate.slice(
                0,
                indOrderData.merchantTradeDate.length - 4
              )}
              <span> </span>訂購完成
              <div style={{ fontSize: "1.3rem", marginTop: "10px" }}>
                如果有任何問題，請儘速
                <a
                  href="mailto:mfee37_no2@gmail.com"
                  style={{ color: "#f58b82" }}
                >
                  聯繫我們
                </a>
                ，謝謝！
              </div>
            </div>
            <div className="main_container">
              <div className="left">
                <div className="historyTitle">
                  <div className="d-flex col-6 justify-content-start ps-5">
                    商品
                  </div>
                  <div className="col-2">價格</div>
                  <div className="col-2">數量</div>
                  <div className="col-2">金額</div>
                </div>
                {indOrderData.pid.split(",").map((data, index) => {
                  return (
                    <div key={index} className="historyTitle2">
                      {indProducts.length > 0 && indProducts[index] ? (
                        <>
                          <div className="d-flex col-6 justify-content-start ps-5">
                            <img
                              src={indProducts[index].pimage1}
                              style={{ width: "20%" }}
                            />
                            <div
                              style={{
                                width: "75%",
                                padding: "20px 0 0 30px",
                              }}
                            >
                              {indProducts[index].pname}
                            </div>
                          </div>
                          <div className="col-2">
                            NT$ {indProducts[index].pprice}
                          </div>
                          <div className="col-2 px-3">{data.split(":")[1]}</div>
                          <div className="col-2">
                            NT$ {indProducts[index].pprice * data.split(":")[1]}
                          </div>
                        </>
                      ) : null}
                    </div>
                  );
                })}

                <br />
                <div className="historyTitle mt-5">
                  <div className="col-5 ps-5">地址</div>
                  <div className="col-2">訂單時間</div>
                  <div className="col-2  mx-5">手機</div>
                  <div className="col-2">總金額</div>
                </div>
                <div className="historyTitle2">
                  <div className="col-5 ps-5">
                    {indOrderData.userCountry +
                      indOrderData.userDistrict +
                      indOrderData.userAddress}
                  </div>
                  <div className="col-2">
                    {indOrderData.merchantTradeDate.slice(
                      0,
                      indOrderData.merchantTradeDate.length - 13
                    )}
                  </div>
                  <div className="col-2 mx-5">{indOrderData.userPhone}</div>
                  <div className="col-2">NT$ {indOrderData.totalAmount}</div>
                </div>
              </div>
              <div className="right">
                <SideShopBar></SideShopBar>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer></Footer>
    </>
  );
};

export default HistoryIndOrder;
