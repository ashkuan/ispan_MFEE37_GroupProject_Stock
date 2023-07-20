import React, { useContext } from "react";
import "../styles/shop.css";
import { Product } from "../components/shop/Product";

export const Shop = () => {
  return (
    <>
      <div className="d-flex flex-column text-center shop-main-content">
        <p id="title">商城</p>
        <Product></Product>
      </div>
    </>
  );
};

export default Shop;
