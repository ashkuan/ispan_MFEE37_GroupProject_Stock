import React, { useContext } from "react";
import "../styles/shop.css";
import { Product } from "../components/shop/Product";
import { UserContext } from "../../context/UserContext";

export const Shop = () => {
  // const { uid } = useContext(UserContext);
  // console.log("這是uid：" + uid + "，沒有就代表沒登入");
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
