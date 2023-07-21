// 看板輪播
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import HelpIcon from "@mui/icons-material/Help";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { Button, CardHeader } from "@mui/material";
import "../../styles/forum_main_right.css";
import "../../styles/forum_main.css";

const Billboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerPage = 4;
  const totalItems = 7; // 根據需要的總數量進行調整
  let navigate = useNavigate();

  function handleDownClick() {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalItems);
  }

  function getItems() {
    const startIndex = currentSlide % totalItems;
    const endIndex = (startIndex + itemsPerPage) % totalItems;

    const items = [
      {
        icon: (
          <QuestionAnswerIcon
            style={{ color: "#FFC857", fontSize: 48 }}
            onClick={() => navigate("/forum/chats")}
          />
        ),
        label: "閒聊",
      },
      {
        icon: (
          <NewspaperIcon
            style={{ color: "#119DA4", fontSize: 48 }}
            onClick={() => navigate("/forum/news")}
          />
        ),
        label: "新聞",
      },
      {
        icon: (
          <AdsClickIcon
            style={{ color: "#FF6B6B", fontSize: 48 }}
            onClick={() => navigate("/forum/targets")}
          />
        ),
        label: "標的",
      },
      {
        icon: (
          <HelpIcon
            style={{ color: "#4ECDC4", fontSize: 48 }}
            onClick={() => navigate("/forum/questions")}
          />
        ),
        label: "請益",
      },
      {
        icon: (
          <QueryStatsIcon
            style={{ color: "#FFB86F", fontSize: 48 }}
            onClick={() => navigate("/forum/notes")}
          />
        ), label: "情報"
      },
      {
        icon: (
          <TipsAndUpdatesIcon
            style={{ color: "#845EC2 ", fontSize: 48 }}
            onClick={() => navigate("/forum/thoughts")}
          />
        ), label: "心得"
      },
      {
        icon: (
          <ReadMoreIcon
            style={{ color: "#FF869A", fontSize: 48 }}
            onClick={() => navigate("/forum/others")}
          />
        ), label: "其他"
      }
    ];

    if (startIndex < endIndex) {
      return items.slice(startIndex, endIndex);
    } else {
      return items.slice(startIndex).concat(items.slice(0, endIndex));
    }
  }

  return (
    <>
      <a href="#">
        {getItems().map((item, index) => (
          <div className="drop-shadow-10 d-flex justify-content-between align-items-center text-IronGray-Deep p-4 rounded-4 bg-white mb-3 fs-4 cursor-pointer" key={index}>
            {item.icon}
            {item.label}
          </div>
        ))}
      </a>
      <div className="d-flex justify-content-center">
        <Button onClick={handleDownClick}>
          <svg
            width="3rem"
            height="3rem"
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect
              x="33"
              y="33"
              width="33"
              height="33"
              rx="5"
              transform="rotate(180 33 33)"
              fill="#57687C" />
            <path
              d="M25 13L16.5 22L8 13"
              stroke="white"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </Button>
      </div>
    </>
  );
};

export default Billboard;
