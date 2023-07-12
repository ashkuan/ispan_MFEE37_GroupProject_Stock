import React,{useEffect,useState} from "react";
import axios from "axios";

const ArticleTitle = () => {
  const [titles,setTitles]=useState([])
  useEffect(()=>{
    const fetchAllArticle = async()=>{
      try{
        const res = await axios.get("http://localhost:3000/posts")
        setTitles(res.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchAllArticle()
  },[])
  return (
    <>
      {titles.map((title,index)=>(
        <div key={index}>
          {title.fatitle}
        </div>
      ))}
    </>
  )
  
};

export default ArticleTitle;
