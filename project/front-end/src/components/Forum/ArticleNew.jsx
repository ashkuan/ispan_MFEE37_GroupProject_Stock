import React from "react";
import Billboard from "./Billboard";
import Article from "./Article";
import "../../styles/forum_main_right.css";

function ArticleNew() {
  return (
    <div className="drop-shadow-20 rounded-4 bg-white mt-4">
      <Article />
    </div>
  );
}

export default ArticleNew;
