import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import AccordionOpen from "../components/rookie/AccordionOpen.jsx";
import "../styles/rookie.css";
import RookieOpenBank from "../components/rookie/RookieOpenBank.jsx";
import RookieListBtn from "../components/rookie/RookieListBtn.jsx";
import Footer from "../components/Footer.jsx";
import axios from "axios";
import AccordionStock from "../components/rookie/AccordionStock.jsx";
import AccordionEtf from "../components/rookie/AccordionEtf.jsx";
import RookieQuiz from "../components/rookie/RookieQuiz.jsx";
// import { useState } from "react";


const Rookie = () => {
  return (
    <>
      <div className="container mt-3">
        <h1 className="ml1 title d-flex justify-content-around ">
          <div id="rookie"> 新手上路</div>
        </h1>
        
        <div className="text-center m-45"><RookieQuiz/></div>
        <RookieListBtn />
        <span className="d-flex justify-content-around mt-5" id="openbank">
          <span className="titlebox " >證券開戶</span>
        </span>
        <div className="m-45">
          <AccordionOpen />
        </div>
        <span
          className="d-flex justify-content-around  "
          style={{ paddingTop: "10%", margin: 0 }}
          id="stockdoor"
        >
          <span className="titlebox">股票入門</span>
        </span>
        <div className="m-45">
          <AccordionStock />
        <div><img src="/public/" alt="" /></div>
        </div>
        
        <span
          className="d-flex justify-content-around  "
          style={{ paddingTop: "10%" }}
          
        >
          <span className="titlebox" id="etfdoor">ETF入門</span>
        </span>

        <div className="m-45"><AccordionEtf/></div>
      </div>
      <RookieOpenBank />
      <Footer />
    </>
  );
};

export default Rookie;
