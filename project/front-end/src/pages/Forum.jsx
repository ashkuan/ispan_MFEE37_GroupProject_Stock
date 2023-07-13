import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Footer from "../components/Footer.jsx";
import ForumIndividual from "../components/Forum/ForumIndividual";
import "../styles/forum_individual.css";
import SidebarTag from "../components/Forum/SidebarTag.jsx";
import SidebarNews from "../components/Forum/SidebarNews.jsx";
import Post from "../components/Forum/Post.jsx";
import ArticleSort from "../components/Forum/ArticleSort.jsx";
import LineChart from "../components/linechart";

const Forum = () => {
  return (
    <>
      <div className="forum" style={{ paddingTop: "180px" }}>
        <div className="container mt-4">
          <div className="row d-flex justify-content-center g-5">
            <div className="col-4">
              <SidebarTag />

              {/* <div style={{width:"10px"}} ><LineChart/></div> */}

              <SidebarNews />
            </div>
            <div className="col-8">
              <ArticleSort />
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
