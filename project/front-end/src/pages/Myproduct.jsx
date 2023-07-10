import React, { useContext } from "react";
import Footer from "../components/Footer";
import { ShopContext } from "../../context/ShopContext";
import { Product } from "./Product";

const Myproduct = (props) => {
  const { products } = useContext(ShopContext);

  // 抓出url，找到pid參數的值
  const queryParams = new URLSearchParams(window.location.search);
  const pid = queryParams.get("pid");
  console.log(pid);

  products.map((product) => {
    // console.log(product);
    const { pid, pname, pimage, pprice, pdesc } = product;
    // console.log(pid);
    // console.log(pname);
    // console.log(pname);
  });

  return (
    <>
      <div id="myproductContainer" className="container">
        <div className="d-flex" id="myproduct">
          <div id="myproductLeft" className="d-flex">
            <div id="myproductLeftSmall">
              <div className="imageBox">
                <img src="/img/shop/p01.png" />
              </div>
              <div className="imageBox">
                <img src="/img/shop/p01.png" />
              </div>
              <div className="imageBox">
                <img src="/img/shop/p01.png" />
              </div>
            </div>
            <img src="/img/shop/p01.png" width="500px" />
          </div>
          <div id="myproductRight">
            <p className="fs-2 fw-bold">
              史上最強股票大作手操盤術: 巴菲特指定教科書
            </p>
            <p className="fs-5">作 者： 傑西．李佛摩</p>
            <p className="fs-5">譯 者： 榮千</p>
            <p className="fs-5">出 版 社： 海鷹文化</p>
            <p className="fs-5">出 版 日 期： 2021/01/07</p>
            <hr />
            <p className="fs-5 fw-bold">數量：</p>
            <div id="amount">
              <button id="plusBtn">+</button>
              <input
                className="text-center"
                type="text"
                id=""
                defaultValue={1}
              />
              <button id="minusBtn">-</button>
            </div>
            <div
              className="fs-3 fw-bold d-flex justify-content-end"
              style={{ width: "100%" }}
            >
              NT$ 350
            </div>
            <div className="fs-4 fw-bold d-flex justify-content-end">
              <button id="addInCart">加入購物車</button>
            </div>
          </div>
        </div>
        <div id="desc">
          <p className="fs-3 fw-bold">內容介紹</p>
          <hr />
          <pre>
            {"          "}◎ 傑西‧李佛摩（Jesse Lauriston{"\n"}
            {"          "}Livermore），《紐約時報》票選「百年美股第一人」{"\n"}
            {"          "}
            20世紀初期，李佛摩透過投機股票，在一個月的交易中，賺取1,000萬美元的巨額利潤；甚至在3個小時的市場搏殺中，賺進20萬美元——這在當時來說是一個天文數字，因為那個時候美國人的年平均收入只有1,000美元。
            {"\n"}
            {"          "}
            李佛摩最著名的一次投資是在1929年，在美國股市崩盤即將來臨之際，他大肆賣空股票，大多數投資者的巨額財富化為烏有的時候，他卻狂賺1億美元。
            {"\n"}
            {"          "}◎ 彼得‧林區、索羅斯點評版，傑西‧李佛摩唯一著作{"\n"}
            {"          "}
            這本書是李佛摩歷經40年股市沉浮以後給世人留下的寶貴經驗，從中我們可以看到他對自己投機經驗的總結和昇華：他對市場的領悟、對趨勢的研判、對交易手段的掌握、對資金的掌控……他的交易時機技巧、實用的操盤方法、簡明的交易準則，以及高效的股票與商品交易方法極具革命性。
            {"\n"}
            {"        "}
          </pre>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Myproduct;
