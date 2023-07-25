import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../../context/ShopContext";
import { Link } from "react-router-dom";

export const Product = () => {
  const { products, totalAmount } = useContext(ShopContext);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(totalAmount / itemsPerPage);
  const [sortOption, setSortOption] = useState("預設");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]); //過濾後的商品列表存儲在filteredProducts中
  const [selectedCategory, setSelectedCategory] = useState(null);

  // 篩選要的商品, selectedCategory有值的話就執行商品過濾
  const filteredByCategory = selectedCategory
    ? filteredProducts.filter((product) => product.ptype === selectedCategory)
    : filteredProducts;

  // 查詢商品，如果searchKeyword沒有輸入內容，filtered的值就是原本的products，因為空字串會被視為包含在任何字串中
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.pname.includes(searchKeyword)
    );
    setFilteredProducts(filtered);
  }, [products, searchKeyword]);

  // 排列方式
  function sortProducts(products) {
    const sortedProducts = [...products]; // 創建products的新陣列，防止原本的被更改
    switch (sortOption) {
      case "預設":
        return sortedProducts;
      case "價錢 ∙ 由低到高":
        return sortedProducts.sort((a, b) => a.pprice - b.pprice);
      case "價錢 ∙ 由高到低":
        return sortedProducts.sort((a, b) => b.pprice - a.pprice);
      case "出版日期 ∙ 從新到舊":
        return sortedProducts
          .slice()
          .sort(
            (a, b) =>
              new Date(b.ppublicationDate) - new Date(a.ppublicationDate)
          );
      case "出版日期 ∙ 從舊到新":
        return sortedProducts
          .slice()
          .sort(
            (a, b) =>
              new Date(a.ppublicationDate) - new Date(b.ppublicationDate)
          );
      default:
        return sortedProducts;
    }
  }

  // 分類
  const handleCategoryClick = (category) => {
    updatePageNumbers(filteredByCategory);
    setSelectedCategory(category);
  };

  // 頁籤
  useEffect(() => {
    let pageNumbers = [];
    for (let i = 0; i < totalPages; i++) {
      pageNumbers.push(i + 1);
    }
    setPages(pageNumbers);
  }, [totalPages]);

  const updatePageNumbers = (filteredProducts) => {
    const newTotalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    let pageNumbers = [];
    for (let i = 0; i < newTotalPages; i++) {
      pageNumbers.push(i + 1);
    }
    setPages(pageNumbers);
  };

  return (
    <div id="shop">
      <div className="shopSidebar">
        <div className="shopSidebarSearch">
          <p className="mb-3 shopTitle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 19"
              style={{ marginRight: "12px" }}
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
            查詢商品
          </p>
          <input
            type="text"
            placeholder="搜尋書籍"
            value={searchKeyword}
            onInput={(e) => setSearchKeyword(e.target.value)}
          />
          <hr />
        </div>
        <div className="shopSorting mt-2">
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="bi bi-filter-left mb-2"
              viewBox="0 0 15 15"
            >
              <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
            </svg>
            <span> 排列方式</span>
          </p>
          <select
            className="sortBtn"
            onChange={(e) => {
              setSortOption(e.target.value);
              updatePageNumbers(filteredByCategory);
            }}
          >
            <option value="預設">預設</option>
            <option value="價錢 ∙ 由低到高">價錢 ∙ 由低到高</option>
            <option value="價錢 ∙ 由高到低">價錢 ∙ 由高到低</option>
            <option value="出版日期 ∙ 從新到舊">出版日期 ∙ 從新到舊</option>
            <option value="出版日期 ∙ 從舊到新">出版日期 ∙ 從舊到新</option>
          </select>
        </div>
        <hr />
        <div className="shopType mt-2">
          <p className="shopTitle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              className="bi bi-tag-fill"
              viewBox="0 0 16 16"
              style={{ marginRight: "10px" }}
            >
              <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            </svg>
            分類
          </p>
          <div className="shopTypeBtn">
            <button
              onClick={() => {
                handleCategoryClick(null);
              }}
            >
              所有商品
            </button>
            <hr />
            <button
              onClick={() => {
                handleCategoryClick("股估績推薦");
              }}
            >
              股估績推薦
            </button>
            <hr />
            <button onClick={() => handleCategoryClick("新手推薦")}>
              新手推薦
            </button>
            <hr />
            <button onClick={() => handleCategoryClick("K線圖分析")}>
              K線圖分析
            </button>
            <hr />
          </div>
        </div>
      </div>

      <div>
        <div
          style={{
            textAlign: "left",
            margin: "0 0 20px 0",
            fontSize: "1.5rem",
            color: "gray",
            fontWeight: "450",
          }}
        >
          商城 {sortOption !== "預設" ? ` > ${sortOption} ` : null}
          {selectedCategory ? `> ${selectedCategory}` : null}
        </div>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {/* 從陣列中選出頁面要顯示的商品資料範圍, 上一頁的商品數～這頁的商品數 */}
          {sortProducts(filteredByCategory)
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((product) => {
              const { pid, pname, pimage1, pprice } = product;
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
                              className="bi bi-bag-check"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
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
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {pages.map((page) => {
              return (
                // 如果是在目前頁面, 就設active換style
                <li
                  className={` page-item ${
                    page === currentPage ? "active" : ""
                  }`}
                  key={page}
                >
                  <a
                    className="page-number page-link"
                    onClick={() => setCurrentPage(page)}
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
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
