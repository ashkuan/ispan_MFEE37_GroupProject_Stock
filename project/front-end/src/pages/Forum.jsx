import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/forum_individual.css";
import Footer from "../components/Footer.jsx";
import ForumIndividual from "../components/Forum/ForumIndividual";
import SidebarTag from "../components/Forum/SidebarTag.jsx";
import SidebarNews from "../components/Forum/SidebarNews.jsx";
import Post from "../components/Forum/Post.jsx";
import ArticleSort from "../components/Forum/ArticleSort.jsx";
import Billboard from "../components/Forum/Billboard.jsx";
import LineChart from "../components/linechart";
import PostSuccess from "../components/Forum/PostSuccess";

const Forum = () => {
  return (
    <>
      <div className="forum" style={{ paddingTop: "180px" }}>
        <div className="container mt-4">
          <div className="row g-5">
            <div className="col-2">
              <Billboard />
            </div>
            <div className="col-7">
              <ArticleSort />
            </div>
            <div className="col-3">
              <SidebarTag />
              {/* <div style={{width:"10px"}} ><LineChart/></div> */}
              <SidebarNews />
            </div>
          </div>
        </div>
        {/* <Post/> */}
      </div>
      <Footer />
    </>
  );
};

export default Forum;
