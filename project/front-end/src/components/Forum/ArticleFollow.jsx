import React from "react";
import Billboard from "./Billboard";
import ArticlePart from "./ArticlePart";
import "../../styles/forum_main_right.css";

function ArticleFollow() {
  return (
    <div className="articlePopular mt-4">
      <Billboard />
      <hr className="forumHr mx-4" />
      <ArticlePart />
    </div>
  );
}

export default ArticleFollow;
