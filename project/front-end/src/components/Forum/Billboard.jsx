import "../../styles/forum_main_right.css";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import HelpIcon from "@mui/icons-material/Help";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { Button } from "@mui/material";
import React, { useState } from "react";

const Billboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerPage = 5;
  const totalItems = 7; // 根据需要的总数量进行调整

  function handleRightClick() {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalItems);
  }

  function getItems() {
    const startIndex = currentSlide % totalItems;
    const endIndex = (startIndex + itemsPerPage) % totalItems;
    const items = [
      {
        icon: <QuestionAnswerIcon sx={{ color: "#FFC857", fontSize: 48 }} />,
        label: "閒聊",
      },
      {
        icon: <NewspaperIcon sx={{ color: "#119DA4", fontSize: 48 }} />,
        label: "新聞",
      },
      {
        icon: <AdsClickIcon sx={{ color: "#FF6B6B", fontSize: 48 }} />,
        label: "標的",
      },
      {
        icon: <HelpIcon sx={{ color: "#4ECDC4", fontSize: 48 }} />,
        label: "請益",
      },
      {
        icon: <QueryStatsIcon sx={{ color: "#FFB86F", fontSize: 48 }} />,
        label: "情報",
      },
      {
        icon: <TipsAndUpdatesIcon sx={{ color: "#845EC2 ", fontSize: 48 }} />,
        label: "心得",
      },
      {
        icon: <ReadMoreIcon sx={{ color: "#FF869A", fontSize: 48 }} />,
        label: "其他",
      },
    ];

    if (startIndex < endIndex) {
      return items.slice(startIndex, endIndex);
    } else {
      return items.slice(startIndex).concat(items.slice(0, endIndex));
    }
  }

  return (
    <div className="carousel">
      <div className="carousel-items">
        {getItems().map((item, index) => (
          <div className="board p-4" key={index}>
            {item.icon}
            {item.label}
          </div>
        ))}
      </div>
      <Button className="carousel-arrow" onClick={handleRightClick}>
        <img className="arrowRight" src="./img/forum/arrow-right.svg" alt="" />
      </Button>
    </div>
  );
};

export default Billboard;
