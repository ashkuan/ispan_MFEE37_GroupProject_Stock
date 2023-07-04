import React,{useState,useEffect} from "react";
import "../../styles/forum_sidebar.css";
import axios from "axios";


function SidebarNews() {
  const [data, setData] = useState([]);
  const auth =
    "https://newsapi.org/v2/top-headlines?country=tw&category=business&apiKey=f374144203e945949ad1d7bcb499deef";
  const search = async (url) => {
    let result = await axios.get(url, {
      //獲取伺服器的授權訪問權限
      headers: { Authorization: auth },
    });
    console.log(result);
    //抓api前3筆資料
    setData(result.data.articles.slice(0, 3)); 
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
        <a
          className="d-flex text-decoration-none text-IronGray-Deep fz-2 align-items-center"
          href="#"
        >
          今日要聞 &gt;
        </a>
      </div>
      <div className="card-body">
        {/* <div
          className="bg-Primary-Gray rounded-3 p-3"
          style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
        >
          <div className="fz-3">台積電等大廠股東會、台塑四寶營收...</div>
          <div className="fz-4 pt-3">Yahoo奇摩股市 · 5 小時前</div>
        </div>
        <div
          className="bg-Primary-Gray rounded-3 p-3 mt-3"
          style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
        >
          <div className="fz-3">仁寶5月接急單 看好下半年4大產品線成長...</div>
          <div className="fz-4 pt-3">Yahoo奇摩股市 · 2 小時前</div>
        </div>
        <div
          className="bg-Primary-Gray rounded-3 p-3 mt-3 mb-3"
          style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
        >
          <div className="fz-3">普丁政權若被推翻 這些股票可能會飆升...</div>
          <div className="fz-4 pt-3">鉅亨網 · 1 小時前</div>
        </div> */}
        {data.map((article, index) => (
          <a href={article.url} target="_blank">
            <div
              key={index}
              className="bg-Primary-Gray rounded-3 p-3 m-1"
              style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
            >
              <div className="fz-3">{article.title}</div>
              <div className="fz-4 pt-3">
               {article.publishedAt}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default SidebarNews;
