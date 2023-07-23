import React, { useContext, useEffect } from "react";
import "../styles/shop.css";
import { Product } from "../components/shop/Product";
import Footer from "../components/Footer";

export const Shop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <div className="d-flex flex-column text-center shop-main-content">
        <p id="title">商城</p>
        <Product></Product>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Shop;
