import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const TwindexPrice = () => {
  const [todayTradingAmount, setTodayTradingAmount] = useState("Loading...");
  const [showValue, setShowValue] = useState();

  useEffect(() => {
    const fetchTodayTradingAmount = async () => {
      try {
        const response = await axios.get("http://localhost:9453/price");
        const data = response.data;
        const lastValue = (data[data.length - 1].TradeValue / 1000000).toFixed(2);
        // console.log(lastValue)
        setShowValue(lastValue)
        setTodayTradingAmount(data.todayTradingAmount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchTodayTradingAmount();
  }, []);

  return (
    <div className="mb-4 text-IronGray-Deep text-center drop-shadow-20 bg-Primary-Gray rounded-4 p-4">
      <div
        className="fs-3 mb-2">
        今日成交金額
      </div>
      <div>
        <span
          className="fs-2 fw-bold">
          {showValue}
        </span>
        <span
          className="fs-4 ms-3">
          (百萬)
        </span>
      </div>
    </div>
  );
};

export default TwindexPrice;
