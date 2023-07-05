import React from "react";
import "../../styles/forum_main_right.css";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import HelpIcon from "@mui/icons-material/Help";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

function Billboard() {
  return (
    <div className="billboard p-4 d-flex justify-content-between fz-2">
      <div className="board p-4">
        <QuestionAnswerIcon />
        閒聊
      </div>
      <div className="board p-4">
        <NewspaperIcon />
        新聞
      </div>
      <div className="board p-4">
        <AdsClickIcon />
        標的
      </div>
      <div className="board p-4">
        <HelpIcon />
        請益
      </div>
      <div className="board p-4">
        <QueryStatsIcon />
        情報
      </div>
      <div className="board p-4">
        <TipsAndUpdatesIcon />
        心得
      </div>
      <div className="board p-4">
        <ReadMoreIcon />
        其他
      </div>
    </div>
  );
}

export default Billboard;
