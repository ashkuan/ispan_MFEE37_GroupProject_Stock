import React, { useState } from "react";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import "../../styles/forum_sidebar.css";
import ArticlePopular from "../Forum/ArticlePopular";
import ArticleNew from "../Forum/ArticleNew";
import ArticleFollow from "../Forum/ArticleFollow";

export default function ArticleSort() {
  const [basicActive, setBasicActive] = useState("tab1");

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  return (
    <div className="d-flex justify-content-end fz-4">
      <MDBTabs pills className="mb-3">
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab1")}
            active={basicActive === "tab1"}
          >
            熱門
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab2")}
            active={basicActive === "tab2"}
          >
            最新
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab3")}
            active={basicActive === "tab3"}
          >
            追蹤中
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
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
    </div>
  );
}
