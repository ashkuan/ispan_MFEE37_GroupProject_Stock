// //全部顯示
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import cycle from "/public/img/sidesbar/rotate-left-solid.svg";

// const SidebarTag = () => {
//   const [tags, setTags] = useState([]);

//   useEffect(() => {
//     const fetchAllTag = async () => {
//       try {
//         const res = await axios.get('http://localhost:5789/tags');
//         setTags(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchAllTag();
//   }, []);

//   // 隨機排陣列
//   const shuffleTags = () => {
//     const shuffledTags = tags.slice(); // 複製一份 tags 陣列
//     for (let i = shuffledTags.length - 1; i > 0; i--) {
//       const k = Math.floor(Math.random() * (i + 1));
//       [shuffledTags[i], shuffledTags[k]] = [shuffledTags[k], shuffledTags[i]];
//     }
//     return shuffledTags;
//   };

//   return (
//     <div className="card rounded-4" style={{ filter: "drop-shadow(0px 20px 30px rgba(0, 0, 0, 0.1))" }}>
//       <div className="card-title IronGray-Deep rounded-top-xl p-2">
//         <a className="d-flex text-decoration-none text-white px-3 py-2 fs-4 align-items-center" href="#">
//           熱門關鍵字 ;
//         </a>
//       </div>
//       <div className="card-body">
//         {tags.length > 0 ? (
//           <ul className="cloud p-2" role="navigation" aria-label="Webdev tag cloud">
//             {shuffleTags().map((tag, index) => (
//               <li key={index}>
//                 <a href="#" data-weight={tag.count}>
//                   {tag.fhashtag}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SidebarTag;

import React, { useState, useEffect } from "react";
import axios from "axios";
import renewWhite from "/public/img/sidesbar/arrow-renew-White.svg";

const SidebarTag = () => {
  const [tags, setTags] = useState([]);
  const [randomTags, setRandomTags] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchAllTag = async () => {
      try {
        const res = await axios.get("http://localhost:5789/tags");
        setTags(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTag();
  }, []);

  useEffect(() => {
    setRandomTags(shuffleTags());
  }, [tags]);

  // 隨機排序 tags 陣列
  const shuffleTags = () => {
    // 複製一份 tags 陣列
    const shuffledTags = tags.slice();
    for (let i = shuffledTags.length - 1; i > 0; i--) {
      const k = Math.floor(Math.random() * (i + 1));
      [shuffledTags[i], shuffledTags[k]] = [shuffledTags[k], shuffledTags[i]];
    }
    return shuffledTags;
  };

  // 切換顯示下一組隨機 tag
  const changeTags = () => {
    //更新current的值 要讓每次傳換都有上一個內容的話就在prevIndex後+5
    setCurrent((prevIndex) => prevIndex % tags.length);
    setRandomTags(shuffleTags());
  };

  return (
    <div
      className="card rounded-4"
      style={{ filter: "drop-shadow(0px 20px 30px rgba(0, 0, 0, 0.05))" }}
    >
      <div className="card-title d-flex IronGray-Deep rounded-top-xl ps-3 pe-4 py-2">
        <a
          className="d-flex text-decoration-none text-white m-2 fs-4 align-items-center"
          href="#"
        >
          熱門關鍵字
        </a>
        <img
          onClick={changeTags}
          className="ms-auto"
          style={{ width: "30px", cursor: "pointer" }}
          src={renewWhite}
          alt=""
        />
      </div>
      <div className="card-body">
        {/* ?避免為null or undefined */}
        {randomTags.length > 0 ? (
          <ul
            className="cloud p-2"
            role="navigation"
            aria-label="Webdev tag cloud"
          >
            {randomTags.slice(current, current + 12).map((tag, index) => (
              <li key={index}>
                <a href="#" data-weight={tag.count+1}>
                  {tag.fhashtag.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default SidebarTag;
