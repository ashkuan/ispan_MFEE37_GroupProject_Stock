import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import "../../styles/twindexprice.css";

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
    <div className=" mt-3 mb-3 containerrow d-flex">
      <div className="textcard">
        <div className="textbox text-center">台股成交</div>
        <div className="textrow ">今日成交金額: {showValue} (百萬)</div>
      </div>
    </div>
  );
};

export default TwindexPrice;
