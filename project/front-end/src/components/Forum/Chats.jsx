import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Footer from "../Footer";
import ForumIndividual from "../Forum/ForumIndividual";
import "../../styles/forum_individual.css";
import SidebarTag from "../Forum/SidebarTag.jsx";
import SidebarNews from "../Forum/SidebarNews.jsx";
import Post from "../Forum/Post.jsx";
import ArticleSort from "../Forum/ArticleSort.jsx";
import LineChart from "../linechart";

const Chats = () => {
  return (
    <>
      <div className="forum" style={{ paddingTop: "180px" }}>
        <div className="container mt-4">
          <div className="row d-flex justify-content-between">
            <div className="col-3">
              <SidebarTag />

              {/* <div style={{width:"10px"}} ><LineChart/></div> */}

              <SidebarNews />
            </div>
            <div className="col-8">
              <ArticleSort />
            </div>
          </div>
        </div>
        {/* <ForumIndividual /> */}
        {/* <Post/> */}
      </div>
      <Footer />
    </>
  );
};

export default Chats;
