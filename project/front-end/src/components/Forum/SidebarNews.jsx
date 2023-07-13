//

import React, { useState, useEffect } from "react";
import "../../styles/forum_sidebar.css";
import axios from "axios";
import cycle from "/public/img/sidesbar/rotate-left-solid.svg";

function SidebarNews() {
  const [data, setData] = useState([]);
  const auth =
    "https://newsapi.org/v2/top-headlines?country=tw&category=business&apiKey=f374144203e945949ad1d7bcb499deef";

  // 定義 shuffle 函式
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const search = async (url) => {
    let result = await axios.get(url, {
      //獲取服務器的授權訪問權限
      headers: { Authorization: auth },
    });
    console.log(result);

    // 使用 shuffle 函式進行隨機排序並選取前 3 篇文章
    setData(shuffle(result.data.articles).slice(0, 3));
    console.log(result.data.articles);
  };

  useEffect(() => {
    search(auth);
  }, []);

  return (
    <div
      className="card mt-4 rounded-4 IronGray"
      style={{ filter: "drop-shadow(0px 20px 30px rgba(0, 0, 0, 0.1))" }}
    >
      <div className="card-title bg-Primary-Gray rounded-top-xl p-3">
        <a className="d-flex text-decoration-none text-IronGray-Deep fz-2 align-items-center">
          今日要聞{" "}
          <img
            onClick={() => search(auth)}
            className="ms-auto"
            style={{ width: "30px", cursor: "pointer" }}
            src={cycle}
            alt=""
          />
        </a>
      </div>
      <div className="card-body">
        {data.map((article, index) => (
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            <div
              key={index}
              className="bg-Primary-Gray rounded-3 p-3 m-1"
              style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
            >
              <div className="fz-3">{article.title}</div>
              <div className="fz-4 pt-3">
                {article.source.author} · {article.publishedAt.substr(0, 10)}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default SidebarNews;
