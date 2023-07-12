import React, { useState,useEffect } from 'react';
import axios from 'axios';
const ArticleContent = () => {
    const [articles,setArticles]=useState([])
    useEffect(()=>{
        const fetchAllArticle = async()=>{
            try{
                const res = await axios.get("http://localhost:3000/posts")
                setArticles(res.data)
            }catch(err){
                console.log(err);
            }
        }
        fetchAllArticle()
    },[])
    return (
        <>
            {articles.map((article,index)=>(
               <div key={index}>
               <p className="mb-4">
                {article.farticle}
            </p>
            <div className="d-flex justify-content-center">
                <img src="./img/forum/article-content-img.svg" alt="" />
            </div>
               </div>
            ))}
           
        </>
    )
}

export default ArticleContent;