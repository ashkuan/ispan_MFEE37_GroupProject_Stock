import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Footer from "../components/Footer.jsx";
import ForumIndividual from "../components/Forum/ForumIndividual";
import "../styles/forum_individual.css";
import SidebarTag from "../components/Forum/SidebarTag.jsx";
import SidebarNews from "../components/Forum/SidebarNews.jsx";
import Post from "../components/Forum/Post.jsx";
import ArticleSort from "../components/Forum/ArticleSort.jsx";

const Forum = () => {
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="forum">
        <div className="container mt-4">
          <div className="row d-flex justify-content-between">
            <div className="col-3">
              <SidebarTag />
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

export default Forum;
