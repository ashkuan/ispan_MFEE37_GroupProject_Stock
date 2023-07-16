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
    const res = await axios.post("http://localhost:5566/cart/edit", {
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
  const [dataLoaded, setDataLoaded] = useState(false); //判斷資料是否加載完成
  const [quantity, setQuantity] = useState(1);
  const [stockData, setStockData] = useState({}); // 存個股資訊
  const [totalCartItemAmount, setTotalCartItemAmount] = useState(0); //計算購物車總數

  // 載入所有書籍
  useEffect(() => {
    const fetchShop = async () => {
      try {
        // 商品
        const res = await axios.get(`http://localhost:5566/shop`);
        // console.log(res.data);
        setProducts(res.data); // 把後端所有商品資料放入state, 要傳到<Product>使用;
        setTotalAmount(res.data.length); // 商品總數, 要製作頁籤
      } catch (err) {
        console.log("商城初始化載入失敗" + err);
      }
    };
    fetchShop();
  }, []);

  // 載入購物車
  useEffect(() => {
    const fetchCart = async () => {
      try {
        // 商品
        const res = await axios.get(`http://localhost:5566/cart`);
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
            // console.log(item);
            updatedCart[pid] = paccount;
          });
          setCartItems(updatedCart);
          setDataLoaded(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchCart();
    // console.log(cartItems);
  }, []);

  const addToCart = (pid, quantity) => {
    console.log(quantity);
    console.log("新增cartItems");
    // 找到cartItems目前的值(預設為0) => 1. 顯示出所有cartItems  2. [將點擊的id]:原本的[商品]數量+1
    // 這是前端網頁要先減掉，會透過react傳送到其他地方，前端會即時更新
    setCartItems((cartItems) => ({
      ...cartItems,
      [pid]: cartItems[pid] + quantity,
    }));
    // 後端才去操作
    const updatedCartItems = {
      ...cartItems,
      [pid]: cartItems[pid] + quantity,
    };
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
    const updatedCartItems = { ...cartItems, [pid]: newAmount };
    updateCartItemsToDB(updatedCartItems);
  };

  const trashCan = (pid) => {
    setCartItems((cartItems) => ({ ...cartItems, [pid]: 0 }));
    const updatedCartItems = { ...cartItems, [pid]: 0 };
    updateCartItemsToDB(updatedCartItems);
  };

  // 計算總額
  const calculateCartTotal = () => {
    let cartTotal = 0;
    products.forEach((product) => {
      const { pid, pprice } = product;
      const cartItemAmount = cartItems[pid];
      // console.log(cartItemAmount);
      cartTotal += cartItemAmount * pprice;
    });
    return cartTotal;
  };

  // 計算購物車總數
  useEffect(() => {
    let totalAmount = 0;
    products.map((product) => {
      const { pid } = product;
      const cartItemAmount = cartItems[pid];
      totalAmount += cartItemAmount;
    });
    setTotalCartItemAmount(totalAmount);
  }, [cartItems]);

  const contextValue = {
    products,
    totalAmount,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemAmount,
    trashCan,
    calculateCartTotal,
    stockData,
    totalCartItemAmount,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {dataLoaded ? props.children : <div>Loading...</div>}
    </ShopContext.Provider>
  );
};
