import React, { useState, useEffect } from "react";
import "../../styles/forum_main.css";
import axios from "axios";
const ArticleContent = (props) => {
  const [articles, setArticles] = useState([]);
  const faid = props.data;
  useEffect(() => {
    const fetchAllArticle = async () => {
      try {
        const res = await axios.post("http://localhost:5789/getFaid", {
          faid: faid,
        });
        // console.log(faidRes.data);
        // console.log(res.data);
        setArticles(res.data);
        // setPhotopath(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllArticle();
  }, []);
  return (
    <>
      {articles.map((article, index) => (
        <div key={"article" + index}>
          <p
            style={{ whiteSpace: " pre-wrap", wordWrap: "break-word" }}
            className="mb-5 fs-5"
          >
            {article.farticle}
          </p>
          {/* <img className="object-fit-cover" src={`/img/forum/post/${article.faimage}`} alt=""/> */}
          <img
            className="object-fit-cover"
            src={`http://localhost:5789/${article.faimage}`}
            alt=""
          />
        </div>
      ))}
    </>
  );
};

export default ArticleContent;
