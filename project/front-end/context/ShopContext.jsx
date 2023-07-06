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

// 更新資料到資料庫
const updateCartItemsToDB = async (cartItems) => {
  console.log(cartItems);
  try {
    const res = await axios.post("http://localhost:3000/cart/edit", {
      data: cartItems,
    });
  } catch (error) {
    console.error("傳入後端失敗:", error);
  }
};

export const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartItems, setCartItems] = useState();

  // 載入所有書籍
  useEffect(() => {
    const fetchShop = async () => {
      try {
        // 商品
        const res = await axios.get(`http://localhost:3000/shop`);
        // console.log(res.data);
        setProducts(res.data); // 把後端所有商品資料放入state, 要傳到<Product>使用;
        setTotalAmount(res.data.length); // 商品總數, 要製作頁籤
        // console.log(cartItems);
      } catch (err) {
        console.log(err);
      }
    };
    fetchShop();
  }, []);

  // 載入購物車
  useEffect(() => {
    const fetchCart = async () => {
      try {
        // 商品
        const res = await axios.get(`http://localhost:3000/cart`);
        // console.log(res.data.length);
        // 如果資料庫都沒有資料，那就全部預設為0
        if (res.data.length == 0) {
          setCartItems(getDefaultCart()); // 一開始預設的商品和商品數
          console.log(cartItems);
        } else {
          // 如果資料庫有資料，就把有資料的部分替換
          // console.log(res.data);
          const items = res.data;
          const updatedCart = getDefaultCart();
          items.forEach((item) => {
            const { pid, paccount } = item;
            updatedCart[pid] = paccount;
          });
          setCartItems(updatedCart);
          console.log(cartItems);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchCart();
  }, []);

  const addToCart = (pid) => {
    console.log("新增cartItems");
    // 找到cartItems目前的值(預設為0) => 1. 顯示出所有cartItems  2. [將點擊的id]:原本的[商品]數量+1
    // 這是前端網頁要先減掉，會透過react傳送到其他地方，前端會即時更新
    setCartItems((cartItems) => ({ ...cartItems, [pid]: cartItems[pid] + 1 }));
    // 後端才去操作
    const updatedCartItems = { ...cartItems, [pid]: cartItems[pid] + 1 };
    updateCartItemsToDB(updatedCartItems);
  };

  const removeFromCart = (pid) => {
    console.log("刪除cartItems");
    setCartItems((cartItems) => ({ ...cartItems, [pid]: cartItems[pid] - 1 }));
    const updatedCartItems = { ...cartItems, [pid]: cartItems[pid] - 1 };
    updateCartItemsToDB(updatedCartItems);
  };

  const updateCartItemAmount = (newAmount, pid) => {
    setCartItems((cartItems) => ({ ...cartItems, [pid]: newAmount }));
  };

  const trashCan = (pid) => {
    // console.log("點擊垃圾桶");
    // console.log(pid);
    setCartItems((cartItems) => ({ ...cartItems, [pid]: 0 }));
    const updatedCartItems = { ...cartItems, [pid]: 0 };
    updateCartItemsToDB(updatedCartItems);
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

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
