import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < 19; i++) {
    cart[`p${i + 1}`] = 0; //i+1直接等於id
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    const fetchShop = async () => {
      try {
        // 商品
        const res = await axios.get(`http://localhost:3000/shop`);
        setProducts(res.data); // 把後端所有商品資料放入state;
        setTotalAmount(res.data.length); // 商品總數
        setCartItems(getDefaultCart()); // 一開始預設的商品和商品數
      } catch (err) {
        console.log(err);
      }
    };
    fetchShop();
  }, []);

  const addToCart = (pid) => {
    // 找到cartItems目前的值(預設為0) => 1. 顯示出所有cartItems  2. [將點擊的id]:原本的[商品]數量+1
    setCartItems((prev) => ({ ...prev, [pid]: prev[pid] + 1 }));
  };

  const removeFromCart = (pid) => {
    setCartItems((prev) => ({ ...prev, [pid]: prev[pid] - 1 }));
  };

  const updateCartItemAmount = (newAmount, pid) => {
    setCartItems((prev) => ({ ...prev, [pid]: newAmount }));
  };

  const contextValue = {
    products,
    totalAmount,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemAmount,
  };

  // console.log(cartItems);

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
