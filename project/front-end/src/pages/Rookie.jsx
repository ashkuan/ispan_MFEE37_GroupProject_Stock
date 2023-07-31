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


const Rookie = () => {
  return (
    <>

      <div className="container mt-2">
        <h1 id="rookie" className="ml1 title mb-5 d-flex justify-content-center text-IronGray-Deep">
          新手上路
        </h1>
        <div className="text-center mb-5"><RookieQuiz /></div>
        <div className="d-flex justify-content-center mt-3 mb-5">
          <RookieListBtn />
        </div>
        <span className="d-flex justify-content-around mt-5" id="openbank">
          <span className="titlebox py-2 text-IronGray-Deep" >證券開戶</span>
        </span>
        <div className="row d-flex justify-content-center">
          <div className="col-9 m-1">
            <AccordionOpen />
          </div>
        </div>
        <span className="d-flex justify-content-around mt-5" id="stockdoor">
          <span className="titlebox py-2 text-IronGray-Deep">股票入門</span>
        </span>
        <div className="row d-flex justify-content-center">
          <div className="col-9 m-1">
            <AccordionStock />
          </div>
        </div>
        <div className="d-flex justify-content-around mt-5" id="etfdoor">
          <span className="titlebox py-2 text-IronGray-Deep">ETF入門</span>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-9 m-1">
            <AccordionEtf />
          </div>
        </div>
      </div>
      <RookieOpenBank />
      <Footer />
    </>
  );
};

export default Rookie;
