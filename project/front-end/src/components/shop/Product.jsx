import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../../context/ShopContext";
import { Link } from "react-router-dom";

export const Product = () => {
  const { products, totalAmount, cartItems, addToCart } =
    useContext(ShopContext);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(totalAmount / itemsPerPage);

  // 頁籤
  useEffect(() => {
    let pageNumbers = [];
    for (let i = 0; i < totalPages; i++) {
      pageNumbers.push(i + 1);
    }
    setPages(pageNumbers);
  }, [totalPages]);

  // 調整點擊頁面
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {/* <div className="smallbar">
        <div className="shopSorting">
          排序
          <button>價格高</button>
          <button>價格低</button>
          <button>最新</button>
        </div>
      </div> */}
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {/* 從陣列中選出頁面要顯示的商品資料範圍, 上一頁的商品數～這頁的商品數 */}
        {products
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((product) => {
            const { pid, pname, pimage1, pprice, pdesc } = product;
            const cartItemAmount = cartItems[pid];
            return (
              <div className="col" key={pid}>
                <div className="card">
                  <img src={pimage1} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title book-title">{pname}</h5>
                    <p className="card-text">${pprice}</p>
                    <div className="toggleBtn">
                      <button
                        type="button"
                        className="btn seeMoreBtn"
                        data-bs-toggle="modal"
                        data-bs-target={`#exampleModal-${pid}`}
                      >
                        <Link to={`/shop/Myproduct?pid=${pid}`}>瀏覽</Link>
                      </button>
                      <button
                        className="addInCartBtn"
                        onClick={() => {
                          addToCart(pid, 1);
                        }}
                      >
                        <svg
                          width="45"
                          height="40"
                          viewBox="0 0 46 41"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M40.3073 25.625H16.8964L17.4191 28.1875H38.8552C40.0852 28.1875 40.9968 29.3327 40.7242 30.5353L40.2836 32.4793C41.7763 33.2058 42.8056 34.7401 42.8056 36.5156C42.8056 39.0142 40.7676 41.0355 38.2675 40.9995C35.8858 40.9652 33.9271 39.0271 33.8628 36.6395C33.8277 35.3353 34.3488 34.1532 35.2047 33.3124H18.462C19.2907 34.1265 19.8056 35.2605 19.8056 36.5156C19.8056 39.0631 17.687 41.1146 15.1201 40.995C12.8409 40.8889 10.9872 39.0423 10.8674 36.7575C10.7749 34.9931 11.7009 33.4379 13.1076 32.6266L7.4976 5.125H1.91667C0.858108 5.125 0 4.26456 0 3.20312V1.92187C0 0.860439 0.858108 0 1.91667 0H10.1047C11.0152 0 11.8 0.642307 11.9825 1.5367L12.7145 5.125H44.0825C45.3125 5.125 46.2241 6.2702 45.9515 7.47281L42.1763 24.1291C41.978 25.0041 41.2022 25.625 40.3073 25.625ZM32.5833 13.4531H28.75V10.25C28.75 9.54235 28.178 8.96875 27.4722 8.96875H26.1945C25.4887 8.96875 24.9167 9.54235 24.9167 10.25V13.4531H21.0833C20.3776 13.4531 19.8056 14.0267 19.8056 14.7344V16.0156C19.8056 16.7233 20.3776 17.2969 21.0833 17.2969H24.9167V20.5C24.9167 21.2076 25.4887 21.7812 26.1945 21.7812H27.4722C28.178 21.7812 28.75 21.2076 28.75 20.5V17.2969H32.5833C33.2891 17.2969 33.8611 16.7233 33.8611 16.0156V14.7344C33.8611 14.0267 33.2891 13.4531 32.5833 13.4531Z"
                            fill="#ffffff"
                          />
                        </svg>

                        {cartItemAmount > 0 && (
                          <>
                            {" "}
                            <div className="cartItemAmount">
                              {cartItemAmount}{" "}
                            </div>
                          </>
                        )}
                      </button>
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
                className={` page-item ${page === currentPage ? "active" : ""}`}
                key={page}
              >
                <a
                  className="page-number page-link"
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
              currentPage == totalPages ? "disabled" : ""
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
    </>
  );
};
