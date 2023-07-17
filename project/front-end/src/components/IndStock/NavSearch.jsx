import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { StockContext } from "../../../context/StockContext";
import axios from "axios";

const NavSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [redirectToIndStock, setRedirectToIndStock] = useState(false);
  const { setStockInfo } = useContext(StockContext);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputSubmit = (e) => {
    e.preventDefault();
    // console.log(inputValue);
    if (inputValue !== "") {
      axios
        .post("http://localhost:5678/stock", { data: inputValue })
        .then((res) => {
          setRedirectToIndStock(true);
          // console.log(res.data);
          const shortname = res.data.price.shortName;
          const website = res.data.summaryProfile.website;
          const regularMarketOpen = res.data.price.regularMarketOpen.fmt;
          const regularMarketDayHigh = res.data.price.regularMarketDayHigh.fmt;
          const regularMarketDayLow = res.data.price.regularMarketDayLow.fmt;
          const regularMarketPrice = res.data.price.regularMarketPrice.fmt;
          const regularMarketVolume = res.data.price.regularMarketVolume.fmt;
          const regularMarketPreviousClose =
            res.data.price.regularMarketPreviousClose.fmt;
          const averageDailyVolume3Month =
            res.data.price.averageDailyVolume3Month.longFmt;
          const averageDailyVolume10Day =
            res.data.price.averageDailyVolume10Day.longFmt;
          const regularMarketChangePercent =
            res.data.price.regularMarketChangePercent.fmt;

          // console.log(shortname);
          setStockInfo({
            inputValue,
            shortname,
            website,
            regularMarketOpen,
            regularMarketDayHigh,
            regularMarketDayLow,
            regularMarketPrice,
            regularMarketVolume,
            regularMarketPreviousClose,
            averageDailyVolume3Month,
            averageDailyVolume10Day,
            regularMarketChangePercent,
          });
        })
        .catch((err) => {
          console.log("stock傳送失敗");
          console.log(err);
        });
    } else {
      alert("請輸入股票代碼");
    }
  };

  if (redirectToIndStock) {
    return <Navigate to="/indStock" />;
  }

  return (
    <form id="navSearch" onSubmit={handleInputSubmit}>
      <input
        type="text"
        className="search__input"
        placeholder="搜尋台股代號/名稱"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button type="submit" className="search__button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </button>
    </form>
  );
};

export default NavSearch;
