import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import "../../styles/twindexprice.css";

const FrmsaPrice = () => {
  const [todayTradingAmount, setTodayTradingAmount] = useState("Loading...");
  const [showValue, setShowValue] = useState();
  const [rotate, setRotate] = useState();
  const [color, setColor] = useState();
  const [updown, setUpdown] = useState();

  useEffect(() => {
    const fetchTodayTradingAmount = async () => {
      try {
        const response = await axios.get("http://localhost:9453/price");
        const data = response.data;
        const lastValue = data[data.length - 1].FormosaIndex;
        // console.log(lastValue)
        const updown = data[data.length - 1].Change;
        // console.log(updown)
        setUpdown(updown);
        const rotate = updown >= 0 ? "rotate(360deg)" : "rotate(180deg)";
        setRotate(rotate);
        const color = updown >= 0 ? "#f17064" : "#77BE6B";
        setColor(color);
        setShowValue(lastValue);
        setTodayTradingAmount(data.todayTradingAmount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchTodayTradingAmount();
  }, []);

  return (
    <div className="mt-3 mb-3 containerrow d-flex">
      <div className="textcard">
        <div className="textbox text-center">寶島指數</div>
        <div className="textrow ">
          今日指數
          {showValue}
          &nbsp;&nbsp;&nbsp;
          <svg
            xmlns="http://www.w3.org/2000/svg"
            color="white"
            width={30}
            height={30}
            fill="currentColor"
            className="bi bi-arrow-up"
            viewBox="0 0 16 16"
            style={{ transform: rotate }}
          >
            <path
              fillRule="evenodd"
              color={color}
              d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
            />
          </svg>
          <span style={{ color: color }}>{updown}</span>
        </div>
      </div>
    </div>
  );
};

export default FrmsaPrice;
