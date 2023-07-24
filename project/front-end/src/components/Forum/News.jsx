import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Footer from "../Footer";
import "../../styles/forum_individual.css";
import SidebarTag from "../Forum/SidebarTag.jsx";
import SidebarNews from "../Forum/SidebarNews.jsx";
import Billboard from "./Billboard.jsx";
import PostBtn from "./PostBtn";
import { useNavigate } from "react-router-dom";
import NewsArticle from "./NewsArticle";

const News = () => {
  let navigate = useNavigate();
  return (
    <>
         <div className="forum" style={{ paddingTop: "9rem" }}>
        <div className="container mt-4">
          <div className="row g-5">
            <div className="col-2 text-center">
              <button
                className="backBtn border-0 rounded-3 IronGray text-white px-3 py-2 fs-5 mb-4"
                onClick={() => navigate("/forum")}>
                返回討論主頁
              </button>
              <Billboard />
            </div>
            <div className="col-7">
              <PostBtn className="mt-4" />
              <div className="fs-3 fw-bolder px-3 pt-2 pb-1 my-3 text-IronGray-Deep">新聞版</div>
              <div className="BArticle">
                <NewsArticle />
              </div>
            </div>
            <div className="col-3">
              <SidebarTag />
              <SidebarNews />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default News;
