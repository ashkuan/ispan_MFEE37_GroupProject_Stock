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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalItems = 7; // 根據需要的總數量調整
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  function handleRightClick() {
    setCurrentPage((prevPage) => {
      if (prevPage === totalPages) {
        return 1; // 返回到第一頁
      } else {
        return prevPage + 1; // 前進到下一頁
      }
    });
  }

  function getItems() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const data = [
      { icon: <QuestionAnswerIcon />, label: "閒聊" },
      { icon: <NewspaperIcon />, label: "新聞" },
      { icon: <AdsClickIcon />, label: "標的" },
      { icon: <HelpIcon />, label: "請益" },
      { icon: <QueryStatsIcon />, label: "情報" },
      { icon: <TipsAndUpdatesIcon />, label: "心得" },
      { icon: <ReadMoreIcon />, label: "其他" },
    ];

    return data.slice(startIndex, endIndex).map((item, index) => (
      <div className="board p-4" key={index}>
        {item.icon}
        {item.label}
      </div>
    ));
  }

  return (
    <div className="carousel">
      <div className="carousel-items">{getItems()}</div>
      <Button className="carousel-arrow" onClick={handleRightClick}>
        <img className="arrowRight" src="./img/forum/arrow-right.svg" alt="" />
      </Button>
    </div>
  );
};

export default Billboard;
