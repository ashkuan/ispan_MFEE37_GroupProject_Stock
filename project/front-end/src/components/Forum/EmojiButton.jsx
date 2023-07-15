// import React, { useState, useEffect } from "react";
// import axios from "axios";
// const EmojiButton = () => {
//   const [heart, setHeart] = useState(0);
//   const [count, setCount] = useState(0);
//   const [initialLike, setInitialLike] = useState(0);
//   const [likeCount, setLikeCount] = useState(0);

//   //請求以獲取按讚數量
//   const getLikeCount = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/posts/likeCount");
//       const likeCount = response.data.likeCount;
//       setLikeCount(likeCount);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   //按讚狀態判斷為哪個img
//   const getLikeStatus = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/posts/likeCount"
//       );
//       const likeStatus = response.data.likeStatus;
//       // console.log(likeStatus);
//       //追蹤按讚數量
//       setLikeCount(likeStatus);
//       //判斷按讚圖片為何
//       // 1按讚 0取消
//       setHeart(likeStatus !== 0 ? 1 : 0);
//       //計算按讚次數
//       setCount(likeStatus !== 0 ? 1 : 0);
//       localStorage.setItem("likeStatus", likeStatus);
//       document.querySelector(".aaa").src =
//         likeStatus !== 0
//           ? "public/img/forum/likeClick.svg"
//           : "public/img/forum/like.svg";
//     } catch (err) {
//       // console.log(err);
//     }
//   };

//   //初始按讚數量
//   useEffect(() => {
//     getLikeCount();
//     setLikeCount(likeCount);
//   }, []);

//   //用 localStorage 來檢查並設定初始的按讚狀態 然後調用 getLikeStatus 函式以獲取按讚狀態。
//   useEffect(() => {
//     const storedLikeStatus = localStorage.getItem("likeStatus");
//     if (storedLikeStatus !== null) {
//       setInitialLike(parseInt(storedLikeStatus));
//     }
//     getLikeStatus();
//   }, []);

//   const handleClick = async (e) => {
//     e.preventDefault();
//     if (heart === 0) {
//       setHeart(1);
//       setCount(count + 1);
//       document.querySelector(".aaa").src = "public/img/forum/likeClick.svg";
//       setLikeCount(likeCount + 1);
//       localStorage.setItem("likeStatus", 1); // 存按讚為1
//     } else {
//       setHeart(0);
//       setCount(count - 1);
//       document.querySelector(".aaa").src = "public/img/forum/like.svg";
//       setLikeCount(likeCount - 1);
//       localStorage.setItem("likeStatus", 0); // 取消按讚為0
//     }
//     try {
//       // 用post更新按讚狀態
//       await axios.post("http://localhost:5789/posts/like", {
//         likeCount: heart === 0 ? 1 : -1,
//       });

//       console.log("Like count updated successfully");
//       // 更新按讚狀態成功後上傳
//       getLikeStatus();
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   return (
//     <>
//       <span className="">
//         <img
//           className="aaa"
//           src={
//             initialLike !== 0
//               ? "public/img/forum/likeClick.svg"
//               : "public/img/forum/like.svg"
//           }
//           name="likeCount"
//           onClick={handleClick}
//         />
//       </span>
//       <span className="hello">{likeCount}</span>
//     </>
//   );
// };
// export default EmojiButton;


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const EmojiButton = (props) => {
//   const [heart, setHeart] = useState(0);
//   const [count, setCount] = useState(0);
//   const [likeCount, setLikeCount] = useState(0);
//   const faid = props.data;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.post(`http://localhost:5789/getFaid`,{
//           faid: faid,
//         });
//         const data = res.data;
//         console.log("按讚啦"+res)
//         setLikeCount(data.likeCount);
//         setHeart(data.heart);
//         setCount(data.count);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleClick = async (e) => {
//     e.preventDefault();
//     if (heart === 0) {
//       setHeart(1);
//       setCount(count + 1);
//       setLikeCount(likeCount + 1);
//     } else {
//       setHeart(0);
//       setCount(count - 1);
//       setLikeCount(likeCount - 1);
//     }
//     try {
//       await axios.post(`http://localhost:5789/posts/like`, {
//         likeCount: heart === 0 ? likeCount + 1 : likeCount - 1,
//       });
//       console.log("Like count updated successfully");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <>
//       <span className="">
//         <img
//           className="aaa"
//           src={
//             heart !== 0
//               ? "public/img/forum/likeClick.svg"
//               : "public/img/forum/like.svg"
//           }
//           name="likeCount"
//           onClick={handleClick}
//         />
//       </span>
//       <span className="hello">{likeCount}</span>
//     </>
//   );
// };

// export default EmojiButton;


import React, { useState, useEffect } from "react";
import axios from "axios";

const KeepButton = (props) => {
  const [keeps, setKeeps] = useState([]);
  const [counts, setCounts] = useState(null);

  const faid = props.data;

  useEffect(() => {
    const fetchAllKeep = async () => {
      try {
        const res = await axios.post("http://localhost:5789/getFaid", {
          faid: faid,
        });
        setKeeps(res.data);
        setCounts(res.data.collect);
      } catch (err) {
        console.log("Error in fetchAllKeep: ", err);
      }
    };

    fetchAllKeep();
  }, [faid]);

  const collectClick = async (e) => {
    e.preventDefault();

    try {
      const LikeCounts = counts === 0 || counts === null ? 1 : 0;
      setCounts(LikeCounts);

      await axios.put(`http://localhost:5789/like/${faid}`, {
        faid: faid,
        likeCount: LikeCounts,
      });

      // Update the keeps array with the new collect value
      setKeeps((prevKeeps) => {
        return prevKeeps.map((keep) => {
          if (keep.faid === faid) {
            return {
              ...keep,
              likeCount: LikeCounts,
            };
          }
          return keep;
        });
      });
    } catch (err) {
      console.log("Error in collectClick: ", err);
    }
  };

  return (
    <>
      {keeps.map((keep, index) => (
        <a className="text-decoration-none ms-2" href="#" key={index}>
          <div onClick={collectClick}>
            {keep.collect === 0 ? (
              <img src="./img/forum/likeClick.svg" alt="" />
            ) : (
              <img src="./img/forum/like.svg" alt="" />
            )}
          </div>
        </a>
      ))}
    </>
  );
};

export default KeepButton;