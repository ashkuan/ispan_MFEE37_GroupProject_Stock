import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/shop.css";
import axios from "axios";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = 24 / itemsPerPage;

  // 購物車
  const [cart, setCart] = useState({});

  useEffect(() => {
    const fetchShop = async () => {
      try {
        // 商品
        const res = await axios.get(`http://localhost:3000/shop`);
        console.log(res.data); // 所有商品
        setProducts(res.data); // 把後端所有商品資料放入state;
        // 頁籤
        let pageNumbers = [];
        for (let i = 0; i < totalPages; i++) {
          pageNumbers.push(i + 1);
        }
        setPages(pageNumbers);
      } catch (err) {
        console.log(err);
      }
      console.log("這是所有商品");
      console.log(products);
      console.log("這是頁籤");
      console.log(pages);
    };
    fetchShop();
  }, []);

  // 調整點擊頁面
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Sidebar></Sidebar>
      {/* 要引入資料庫商品 */}
      <div className="d-flex flex-column text-center main-content">
        <p id="title">商城</p>
        <hr />
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {/* 從陣列中選出頁面要顯示的商品資料範圍, 上一頁的商品數～這頁的商品數 */}
          {products
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((product) => {
              const { pid, pname, pimage, pprice, pdesc } = product;
              return (
                <div className="col" key={pid}>
                  <div className="card">
                    <img src={pimage} className="card-img-top" />
                    <div className="card-body">
                      <h5 className="card-title book-title">{pname}</h5>
                      <p className="card-text">${pprice}</p>
                      <button
                        type="button"
                        className="btn btnRed"
                        data-bs-toggle="modal"
                        data-bs-target={`#exampleModal-${pid}`}
                      >
                        點我瀏覽
                      </button>
                      {/* <!-- Modal --> */}
                      <div
                        className="modal fade"
                        id={`exampleModal-${pid}`}
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-lg">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                              >
                                書籍瀏覽
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
                                <img src={pimage} className="card-img-top" />
                                <div className="card-body">
                                  <h5 className="card-title">{pname}</h5>
                                  <p
                                    className="card-text"
                                    style={{ height: "200px" }}
                                  >
                                    {pdesc}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btnGray btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                取消
                              </button>
                              <button
                                type="button"
                                className="btn btnRed addIntoCartBtn"
                              >
                                加入購物車
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* 頁籤 */}
        <nav className="page mt-2" aria-label="Page navigation example">
          <ul className="pagination d-flex justify-content-center">
            {/* 上一頁, 如果現在頁面是第一頁，就不能點擊上一頁(disabled) */}
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              {/* 點擊後執行handlePageClick到上一頁 */}
              <a
                className="page-link"
                onClick={() => handlePageClick(currentPage - 1)}
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {pages.map((page) => {
              return (
                // 如果是在目前頁面, 就設active換style
                <li
                  className={`page-item ${
                    page === currentPage ? "active" : ""
                  }`}
                  key={page}
                >
                  <a
                    className="page-link"
                    onClick={() => handlePageClick(page)}
                  >
                    {page}
                  </a>
                </li>
              );
            })}
            {/* 如果目前頁面是最後一頁的話就不能點 */}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              {/* 點擊後執行handlePageClick到下一頁 */}
              <a
                className="page-link"
                onClick={() => handlePageClick(currentPage + 1)}
              >
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
