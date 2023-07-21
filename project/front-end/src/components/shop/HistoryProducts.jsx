import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HistoryProducts = () => {
  const [historyData, setHistoryData] = useState("");
  const [totalAccount, setTotalAccount] = useState([]);
  const [firstPimg, setFirstPimg] = useState([]);
  const [firstPname, setFirstPname] = useState([]);
  //   const [indOrder, setIndOrder] = useState("");
  const uid = sessionStorage.getItem("uid");
  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const photopath = sessionStorage.getItem("photopath");
  const navigate = useNavigate();

  const handleHistoryIndOrder = (e) => {
    console.log(e.currentTarget.id);
    navigate(`/shop/historyIndOrder/?indOrder=${e.currentTarget.id}`);
  };

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
      {historyData !== "" && (
        <div>
          <div className="historyTitle">
            <div className="d-flex col-7 justify-content-start ps-5">商品</div>
            <div className="col-1">數量</div>
            <div className="col-3 ps-5">訂單金額</div>
            <div className="col-1"></div>
          </div>
          {historyData.map((data, index) => {
            return (
              <>
                <div className="row my-5 px-2" key={index}>
                  <div className="col-7 card">
                    {firstPimg[index] && (
                      <img src={firstPimg[index]} className="card-img-top" />
                    )}

                    <div className="card-body">
                      {firstPname[index] && (
                        <p className="card-title">{firstPname[index]}</p>
                      )}
                      {totalAccount[index] && (
                        <p className="amount">{totalAccount[index]}項商品</p>
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
                  <div className="col-1 d-flex flex-column align-items-center">
                    <button
                      className="editBtn"
                      id={data.oid}
                      key={data.oid}
                      onClick={handleHistoryIndOrder}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-pencil-square"
                        viewBox="0 -1 16 16"
                        style={{
                          marginRight: "5px",
                        }}
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                      edit
                    </button>
                  </div>
                </div>
                <hr />
              </>
            );
          })}
        </div>
      )}
    </>
  );
};

export default HistoryProducts;
