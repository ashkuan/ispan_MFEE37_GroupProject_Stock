import React from "react";
import Billboard from "./Billboard";
import ArticleNewest from "./ArticleNewest";
import "../../styles/forum_main_right.css";

function ArticleNew() {
  return (
    <div className="drop-shadow-20 rounded-4 bg-white mt-4">
      <ArticleNewest/>
    </div>
  );
}

export default ArticleNew;

