// 橫列發文鈕
// 文章排序依 熱門|最新|追蹤中 切換下方文章
import React, { useState } from "react";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import "../../styles/forum_sidebar.css";
import "../../styles/forum_main_right.css";
import "../../styles/forum_individual.css";
import ArticlePopular from "../Forum/ArticlePopular";
import ArticleNew from "../Forum/ArticleNew";
import ArticleFollow from "../Forum/ArticleFollow";
import PostBtn from "./PostBtn";

export default function ArticleSort() {
  const [basicActive, setBasicActive] = useState("tab1");

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  return (
    <>
      <PostBtn />
      <div className="d-flex justify-content-end align-items-center my-4">
        <span className="fs-5 text-IronGray-Deep">文章排序依:</span>
        <MDBTabs pills className="fs-5">
          <MDBTabsItem>
            <MDBTabsLink
              className="articleSort mx-2"
              onClick={() => handleBasicClick("tab1")}
              active={basicActive === "tab1"}
            >
              熱門
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              className="articleSort mx-2"
              onClick={() => handleBasicClick("tab2")}
              active={basicActive === "tab2"}
            >
              最新
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              className="articleSort mx-2"
              onClick={() => handleBasicClick("tab3")}
              active={basicActive === "tab3"}
            >
              追蹤中
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>
      </div>
      <MDBTabsContent className="">
        <MDBTabsPane show={basicActive === "tab1"}>
          <ArticlePopular />
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "tab2"}>
          <ArticleNew />
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "tab3"}>
          <ArticleFollow />
        </MDBTabsPane>
      </MDBTabsContent>
    </>
  );
}
