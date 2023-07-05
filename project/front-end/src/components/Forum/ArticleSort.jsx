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
      <div className="d-flex justify-content-end">
        <span className="fz-3 text-IronGray-Deep">文章排序依:</span>
        <MDBTabs pills className="mb-3 fz-3">
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
      <PostBtn />
      <MDBTabsContent className="mt-4">
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
