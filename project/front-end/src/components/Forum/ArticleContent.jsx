// import React, { useState,useEffect } from 'react';
// import axios from 'axios';
// const ArticleContent = (props) => {
//     const [articles,setArticles]=useState([])
//     const [photopath,setPhotopath]=useState("")
//     const faid = props.data;
//     useEffect(()=>{
//         const fetchAllArticle = async()=>{
//             try {
//                 const res = await axios.post("http://localhost:5789/getFaid", {
//                   faid: faid,
//                 });
//                 // console.log(faidRes.data);
//                 console.log(res.data);
//                 setArticles(res.data)
//               } catch (err) {
//                 console.log(err);
//               }
//             };
//         fetchAllArticle()
//     },[])
//     return (
//         <>
//             {articles.map((article,index)=>(
//                <div key={index}>
//                <p className="mb-4">
//                 {article.farticle}
//             </p>
//             <div className="d-flex justify-content-center">
//                 <img src={`http://localhost:3000/${photopath}`} alt="" />
//             </div>
//                </div>
//             ))}
           
//         </>
//     )
// }

// export default ArticleContent;


import React, { useState,useEffect } from 'react';
import axios from 'axios';
const ArticleContent = (props) => {
    const [articles,setArticles]=useState([])
    const faid = props.data;
    useEffect(()=>{
        const fetchAllArticle = async()=>{
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
                <img src={`http://localhost:5789/${article.faimage}`} alt="" />
            </div>
               </div>
            ))}
           
        </>
    )
}

export default ArticleContent;