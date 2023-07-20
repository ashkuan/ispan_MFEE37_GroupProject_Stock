import React, { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import "../styles/history.css";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SideShopBar from "../components/shop/SideShopBar";

const History = () => {
  const [historyData, setHistoryData] = useState("");
  const [totalAccount, setTotalAccount] = useState([]);
  const [firstPimg, setFirstPimg] = useState([]);
  const [firstPname, setFirstPname] = useState([]);
  const { uid } = useContext(UserContext);
  const navigate = useNavigate();

  // 檢查是否有登入會員
  useEffect(() => {
    if (!uid) {
      console.log(uid);
      console.log("請先登入會員");
      navigate("/loginPage");
    }
  }, []);

  // 載入歷史訂單
  useEffect(() => {
    let total = [];
    let firstPimg = [];
    let firstPname = [];
    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://localhost:5566/shop/history");
        // console.log("這是歷史訂單");
        // console.log(res.data);
        res.data.map((d) => {
          let totalac = 0;
          // 訂單中的商品總數量
          d.pid.split(",").map((dd) => {
            // console.log(dd.split(":")[1]);
            totalac += Number(dd.split(":")[1]);
            // console.log(totalac);
          });
          total.push(totalac);
          setTotalAccount(total);

          // 訂單中第一個購買的商品
          let firstPid = d.pid.split(",")[0].split(":")[0];
          // console.log("每筆訂單第一個購買的商品id：" + firstPid);
          const fetchFirstPid = async () => {
            try {
              const res = await axios.post(
                "http://localhost:5566/shop/history/firstPid",
                { firstPid }
              );
              console.log("第一個商品的圖片獲取成功");
              // console.log(res.data);
              // console.log(res.data[0].pimage1);
              // console.log(res.data[0].pname);
              res.data.map((p) => {
                firstPimg.push(p.pimage1);
                firstPname.push(p.pname);
                setFirstPname([...firstPname]);
                setFirstPimg([...firstPimg]);
              });
            } catch (err) {
              console.log("第一個商品的圖片獲取失敗");
              console.log(err);
            }
          };
          fetchFirstPid();
        });
        setHistoryData(res.data);
      } catch (err) {
        console.log("歷史訂單載入失敗");
        console.log(err);
      }
    };
    fetchHistory();
  }, []);

  return (
    <>
      <Nav></Nav>
      {/* <!-- 主要內容 --> */}
      {historyData !== "" && (
        <div className="container history_container">
          <div>
            <p className="fs-5 pb-3 bread">
              <Link to="/shop">商城</Link> &gt; <Link to="#">歷史訂單</Link>
            </p>
            <p className="title">歷史訂單</p>
          </div>
          <div className="mainContent">
            <div className="left">
              <div className="historyTitle">
                <div className="d-flex col-8 justify-content-start ps-5">
                  <div>商品</div>
                </div>
                <div className="col-1">數量</div>
                <div className="col-3 ps-5">訂單金額</div>
              </div>
              {historyData.map((data, index) => {
                return (
                  <>
                    <div className="row my-5" key={index}>
                      <div className="col-8 card">
                        {firstPimg[index] && (
                          <img
                            src={firstPimg[index]}
                            className="card-img-top"
                          />
                        )}

                        <div className="card-body">
                          {firstPname[index] && (
                            <p className="card-title">{firstPname[index]}</p>
                          )}
                          {totalAccount[index] && (
                            <p className="amount">
                              {totalAccount[index]}項商品
                            </p>
                          )}
                          <p className="date">
                            購買日期：
                            {data.merchantTradeDate.slice(
                              0,
                              data.merchantTradeDate.length - 13
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="col-1">
                        {totalAccount[index] && (
                          <p className="totalAccount">{totalAccount[index]}</p>
                        )}
                      </div>
                      <div className="col-3 ps-5">
                        <span className="total">NT$ {data.totalAmount}</span>
                      </div>
                    </div>
                    <hr />
                  </>
                );
              })}
            </div>
            <SideShopBar></SideShopBar>
          </div>
        </div>
      )}
    </>
  );
};

export default History;
