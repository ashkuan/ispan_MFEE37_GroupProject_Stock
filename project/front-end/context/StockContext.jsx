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
  });

  return (
    <StockContext.Provider value={{ stockInfo, setStockInfo }}>
      {props.children}
    </StockContext.Provider>
  );
};
