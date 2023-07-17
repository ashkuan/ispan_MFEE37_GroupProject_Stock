import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../../context/ShopContext";
import { Link } from "react-router-dom";

export const Product = () => {
  const { products, totalAmount, cartItems } = useContext(ShopContext);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;
  const totalPages = Math.ceil(totalAmount / itemsPerPage);
  const [sortByPriceHigh, setSortByPriceHigh] = useState(false);
  const [sortByPriceLow, setSortByPriceLow] = useState(false);
  const [sortByDate, setSortByDate] = useState(false);

  console.log(products);
  const sortProducts = (products) => {
    if (sortByPriceHigh) {
      return products.sort((a, b) => a.pprice - b.pprice);
    } else if (sortByPriceLow) {
      return products.sort((a, b) => b.pprice - a.pprice);
    } else if (sortByDate) {
      return products.slice().sort((a, b) => {
        const dateA = new Date(a.ppublicationDate);
        const dateB = new Date(b.ppublicationDate);
        return dateB - dateA;
      });
    } else {
      return products;
    }
  };

  // 價格高排序
  const handleSortByPriceHigh = () => {
    setSortByPriceHigh(true);
    setSortByPriceLow(false);

    setSortByDate(false);
  };

  const handleSortByPriceLow = () => {
    setSortByPriceLow(true);
    setSortByPriceHigh(false);
    setSortByDate(false);
  };

  // 最新排序
  const handleSortByDate = () => {
    setSortByPriceLow(false);
    setSortByPriceHigh(false);
    setSortByDate(true);
  };

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
      <div className="smallbar">
        <div className="shopSorting">
          排列方式
          <button onClick={handleSortByPriceHigh}>價格低</button>
          <button onClick={handleSortByPriceLow}>價格高</button>
          <button onClick={handleSortByDate}>最新</button>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {/* 從陣列中選出頁面要顯示的商品資料範圍, 上一頁的商品數～這頁的商品數 */}
        {sortProducts(products)
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
                        <Link to={`/shop/Myproduct?pid=${pid}`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="35"
                            height="35"
                            fill="currentColor"
                            class="bi bi-bag-check"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                            />
                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                          </svg>
                          瀏覽商品
                        </Link>
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
