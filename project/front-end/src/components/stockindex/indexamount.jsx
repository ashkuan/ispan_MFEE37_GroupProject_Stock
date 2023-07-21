import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/twindexprice.css";

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
    <div className=" mt-3 mb-3 containerrow d-flex">
      <div className="textcard">
        <div className="textbox text-center">加權指數</div>
        <div className="textrow ">今日加權指數: <span style={{color:color}}>{lastPrice}</span> </div>
      </div>
    </div>
  );
};

export default IndexAmount;
