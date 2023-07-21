import React from "react";
import Footer from "../Footer";
import ForumIndividual from "../Forum/ForumIndividual";
import SidebarTag from "../Forum/SidebarTag.jsx";
import SidebarNews from "../Forum/SidebarNews.jsx";
import Post from "../Forum/Post.jsx";
import ArticleSort from "../Forum/ArticleSort.jsx";
import LineChart from "../linechart";
import Article from "./Article";
import Billboard from "./Billboard.jsx";
import PostBtn from "./PostBtn";
import { useNavigate } from "react-router-dom";
import ChartArticle from "./ChatArticle";
import "bootstrap/dist/css/bootstrap.css";
import "../../styles/forum_main_right.css";
import "../../styles/forum_individual.css";

const Chats = () => {
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
              <div className="fs-3 fw-bolder px-3 pt-2 pb-1 my-3 text-IronGray-Deep">閒聊版</div>
              <div className="BArticle">
                <ChartArticle />
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

export default Chats;
