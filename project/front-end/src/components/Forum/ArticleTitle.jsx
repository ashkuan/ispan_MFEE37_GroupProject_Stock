import React,{useEffect,useState} from "react";
import axios from "axios";

const ArticleTitle = (props) => {
  const [titles,setTitles]=useState([])
  const faid = props.data;
  useEffect(()=>{
    const fetchAllArticle = async()=>{
      try {
        const res = await axios.post("http://localhost:5789/getFaid", {
          faid: faid,
        });
        // console.log(res.data);
        setTitles(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllArticle()
  },[])
  return (
    <>
      {titles.map((title,index)=>(
        <div className="fs-3 fw-bold mb-4" key={index}>
          {title.fatitle}
        </div>
      ))}
    </>
  )
  
};

export default ArticleTitle;
