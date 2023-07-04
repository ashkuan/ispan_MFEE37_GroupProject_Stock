import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/shop.css";
import axios from "axios";
import { Product } from "./Product";

const Shop = () => {
  const [products, setProducts] = useState([]);

  // 購物車
  const [cart, setCart] = useState({});

  useEffect(() => {
    const fetchShop = async () => {
      try {
        // 商品
        const res = await axios.get(`http://localhost:3000/shop`);
        setProducts(res.data); // 把後端所有商品資料放入state;
      } catch (err) {
        console.log(err);
      }
    };
    fetchShop();
  }, []);

  return (
    <>
      <Sidebar></Sidebar>
      <div className="d-flex flex-column text-center main-content">
        <p id="title">商城</p>
        <hr />
        <Product data={{ products }}></Product>
      </div>
    </>
  );
};

export default Shop;
