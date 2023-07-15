import React, { createContext, useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/shop.css";
import { Product } from "../components/shop/Product";
import { ShopContext } from "../../context/ShopContext";

export const Shop = () => {
  return (
    <>
      <Sidebar></Sidebar>
      <div className="d-flex flex-column text-center main-content">
        <p id="title">商城</p>
        <Product></Product>
      </div>
    </>
  );
};

export default Shop;
