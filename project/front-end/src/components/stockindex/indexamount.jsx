import React, { useState, useEffect } from "react";
import axios from "axios";

const IndexAmount = () => {
  const [todayTradingAmount, setTodayTradingAmount] = useState("Loading...");
  const [showValue, setShowValue] = useState();
  const [lastPrice, setLastPrice] = useState();
  const [color, setColor] = useState();

  useEffect(() => {
    const fetchTodayTradingAmount = async () => {
      try {
        const response = await axios.get("http://localhost:9453/index");
        const Prices = response.data.indicators.adjclose[0].adjclose;
        const LastPrice = parseFloat(Prices[Prices.length - 1]).toFixed(2);
        // console.log(LastPrice)
        setLastPrice(LastPrice)
        const lasttwoprice = parseFloat(Prices[3]).toFixed(2);
        // console.log(lasttwoprice)
        const color = (LastPrice - lasttwoprice) >= 0 ? "#f17064" : "#77BE6B"
        setColor(color)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchTodayTradingAmount();
  }, []);

  return (
    <div className="mb-4 text-center drop-shadow-20 bg-Primary-Gray rounded-4 p-4">
      <div
        className="fs-3 mb-2 text-IronGray-Deep">
        今日加權指數
      </div>
      <div
        style={{ color: color }}
        className="fs-2 fw-bold">
        {lastPrice}
      </div>
    </div>
  );
};

export default IndexAmount;
