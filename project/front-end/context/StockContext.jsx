import React, { createContext, useState } from "react";

export const StockContext = createContext();

export const StockContextProvider = (props) => {
  const [stockInfo, setStockInfo] = useState({
    inputValue: "",
    shortname: "",
    website: "",
    regularMarketOpen: "",
    regularMarketDayHigh: "",
    regularMarketDayLow: "",
    regularMarketPrice: "",
    regularMarketVolume: "",
    regularMarketPreviousClose: "",
    averageDailyVolume3Month: "",
    averageDailyVolume10Day: "",
    regularMarketChangePercent: "",
  });

  return (
    <StockContext.Provider
      value={{
        stockInfo,
        setStockInfo,
      }}
    >
      {props.children}
    </StockContext.Provider>
  );
};
