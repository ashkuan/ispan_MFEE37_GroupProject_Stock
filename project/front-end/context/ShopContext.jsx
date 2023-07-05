import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

// 設定商品和商品數預設值
const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < 19; i++) {
    cart[`p${i + 1}`] = 0; //i+1直接等於id
  }
  return cart;
};

// 傳入後端
const addItemsToDB = async (cartItems) => {
  console.log("執行addItemsToDB()");
  console.log(cartItems);
  try {
    // 執行fetch請求將cartItems傳送到後端API進行資料庫儲存
    const res = await axios.post("http://localhost:3000/shop/cart/add", {
      data: cartItems,
    });
  } catch (error) {
    console.error("傳入後端失敗:", error);
  }
};
const removeItemsFromDB = async (cartItems) => {
  console.log("執行removeItemsFromDB()");
  console.log(cartItems);
  try {
    // 執行fetch請求將cartItems傳送到後端API進行資料庫儲存
    const res = await axios.delete("http://localhost:3000/shop/cart", {
      data: cartItems,
    });
  } catch (error) {
    console.error("傳入後端失敗:", error);
  }
};

export const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [DBItems, setDBItems] = useState([]);

  // select from
  useEffect(() => {
    const fetchShop = async () => {
      try {
        // 商品
        const res = await axios.get(`http://localhost:3000/shop`);
        setProducts(res.data); // 把後端所有商品資料放入state;
        setTotalAmount(res.data.length); // 商品總數
        // setCartItems(getDefaultCart()); // 一開始預設的商品和商品數
        console.log(cartItems);
      } catch (err) {
        console.log(err);
      }
    };
    fetchShop();
  }, []);

  // insert into；cartItems更新時要執行以下，但無法成功執行，因此改為設定定時更新
  // useEffect(() => {
  // console.log(cartItems);
  // cartItems是物件，所以要用entries和forEach抓出key和value
  // Object.entries(cartItems).forEach(([pid, paccount]) => {
  //   const item = [pid, paccount];
  //   DBItems.push(item); // [key,value]
  //   setDBItems(DBItems);
  // });

  // 設定定時更新
  // const saveInterval = setInterval(() => {
  // saveCartItemsToDB(DBItems);
  // }, 1000);
  //  定時功能在元件渲染時執行，等元件卸載時就清除
  // return () => {
  // clearInterval(saveInterval);
  // };
  // }, [cartItems]);

  const addToCart = (pid) => {
    console.log("點擊新增按鈕");
    // 找到cartItems目前的值(預設為0) => 1. 顯示出所有cartItems  2. [將點擊的id]:原本的[商品]數量+1
    setCartItems((prev) => ({ ...prev, [pid]: prev[pid] + 1 }));
    console.log("新增cartItems");
    const updatedCartItems = { ...cartItems, [pid]: cartItems[pid] + 1 };
    addItemsToDB(updatedCartItems);
  };

  const removeFromCart = (pid) => {
    console.log("點擊刪除按鈕");
    setCartItems((prev) => ({ ...prev, [pid]: prev[pid] - 1 }));
    console.log("刪除cartItems");
    const updatedCartItems = { ...cartItems, [pid]: cartItems[pid] - 1 };
    removeItemsFromDB(updatedCartItems);
  };

  const updateCartItemAmount = (newAmount, pid) => {
    setCartItems((prev) => ({ ...prev, [pid]: newAmount }));
  };

  const trashCan = (pid) => {
    setCartItems((prev) => ({ ...prev, [pid]: 0 }));
  };

  const contextValue = {
    products,
    totalAmount,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemAmount,
    trashCan,
  };

  // console.log(cartItems);

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
