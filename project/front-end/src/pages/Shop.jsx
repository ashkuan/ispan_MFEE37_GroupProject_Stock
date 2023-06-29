import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Background from "../img/navbar/background.svg";
import "../styles/shop.css";
import "bootstrap/dist/js/bootstrap";
import axios from "axios";

const Shop = () => {
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await axios.get(" http://localhost:3000/shop");
        console.log(res);
        // res.map((product) => {
        //   console.log(product);
        // });
      } catch (err) {
        console.log(err);
      }
    };
    fetchShop();
  }, []);

  return (
    <>
      <Sidebar></Sidebar>
      {/* 要引入資料庫商品 */}

      <div className="d-flex flex-column text-center main-content">
        <p id="title">商城</p>
        <hr />
        <div className="row row-cols-1 row-cols-md-4 g-4">
          <div className="col">
            <div className="card">
              <img src={Background} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">書籍名稱</h5>
                <p className="card-text">$300</p>
                {/* <!-- Button trigger modal --> */}
                <button
                  type="button"
                  className="btn btnRed"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  點我瀏覽
                </button>
                {/* <!-- Modal --> */}
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          瀏覽書籍
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        {/* <!-- card --> */}
                        <div className="card mx-5">
                          <img src={Background} className="card-img-top" />
                          <div className="card-body">
                            <h5 className="card-title">書籍名稱</h5>
                            <p className="card-text">書籍內容</p>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          取消
                        </button>
                        <button type="button" className="btn btnRed">
                          加入購物車
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 頁籤 */}
        <nav className="page mt-2" aria-label="Page navigation example">
          <ul className="pagination d-flex justify-content-center">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Shop;
