import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Footer from "../Footer";
import "../../styles/forum_individual.css";
import SidebarTag from "../Forum/SidebarTag.jsx";
import SidebarNews from "../Forum/SidebarNews.jsx";
import Post from "../Forum/Post.jsx";
import ArticleSort from "../Forum/ArticleSort.jsx";
import LineChart from "../linechart";
import ArticlePart from "./ArticlePart";
import PostBtn from "./PostBtn";
import { useNavigate } from "react-router-dom";

const Questions = () => {
  let navigate = useNavigate();
  return (
    <>
      <div className="forum" style={{ paddingTop: "180px" }}>
        <div className="container mt-4">
          <div className="row d-flex justify-content-between">
            <div className="col-3">
              <SidebarTag />
              <SidebarNews />
            </div>
            <div className="col-8">
              <div className="d-flex justify-content-between mb-3">
                <p className="baf fz-2 pt-2 fw-bolder">請益版</p>
                <button
                  className="baBtn fz-3 p-2 px-3"
                  onClick={() => navigate("/forum")}
                >
                  回討論區
                </button>
              </div>

              <PostBtn className="mt-4" />
              <div className="BArticle mt-4 pt-4">
                <ArticlePart />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Questions;
