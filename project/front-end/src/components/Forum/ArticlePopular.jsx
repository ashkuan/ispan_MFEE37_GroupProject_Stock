import React from "react";
import Billboard from "./Billboard";
import Article from "./Article";
import "../../styles/forum_main_right.css";

function ArticlePopular() {
  return (
    <div className="articlePopular mt-4">
      <div className="mt-4 p-4">
        <span className="p-2 fz-2">看版分類</span>
        <div className="m-2 pt-4 fz-2">
          <Billboard />
        </div>
      </div>
      <hr className="forumHr mx-4" />
      <Article />
    </div>
  );
}

export default ArticlePopular;
