import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Footer from "../components/Footer.jsx";
import ForumIndividual from "../components/Forum/ForumIndividual";
import "../styles/forum_individual.css";


const Forum = () => {
  return (
    <>
      <br /><br /><br /><br /><br />
      <div className="container">
        <ForumIndividual />
      </div>
      <Footer />
    </>
  );
};

export default Forum;
