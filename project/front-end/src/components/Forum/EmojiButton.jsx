import React, { useState, useEffect } from "react";
import axios from "axios";

const EmojiButton = (props) => {
  const [keeps, setKeeps] = useState([]);
  const [likeCount, setLikeCount] = useState(0); // Set initial state to 0
  const [totalLikes, setTotalLikes] = useState(0);

  const faid = props.data;

  useEffect(() => {
    const fetchAllKeep = async () => {
      try {
        const res = await axios.post("http://localhost:5789/getFaid", {
          faid: faid,
        });
        setKeeps(res.data);
        setLikeCount(res.data.likedByUser);
      } catch (err) {
        console.log("Error in fetchAllKeep: ", err);
      }
    };

    fetchAllKeep();
  }, [faid]);

  useEffect(() => {
    // Calculate the total likes whenever keeps or likeCount changes
    const calculateTotalLikes = () => {
      const total = keeps.reduce((sum, keep) => sum + keep.likeByUser, 0);
      setTotalLikes(total);
    };
    calculateTotalLikes();
  }, [keeps, likeCount]);

  const collectClick = async (e) => {
    e.preventDefault();

    try {
      const newLikeStatus = likeCount === 0 || likeCount === null ? 1 : 0;
      setLikeCount(newLikeStatus);

      await axios.put(`http://localhost:5789/posts/${faid}/like`, {
        faid: faid,
        likedByUser: newLikeStatus,
      });

      // 更新前端顯示的按讚狀態
      setKeeps((prevKeeps) => {
        return prevKeeps.map((keep) => {
          if (keep.faid === faid) {
            return {
              ...keep,
              likeByUser: newLikeStatus,
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
        <div key={index}>
          <a className="text-decoration-none ms-2" href="#">
            <div onClick={collectClick}>
              {keep.likeByUser === 0 ? (
                <img src="public/img/forum/like.svg" alt="" />
              ) : (
                <img src="public/img/forum/likeClick.svg" alt="" />
              )}
            </div>
          </a>
          <span className="hello">{keep.totalLikes}</span>
        </div>
      ))}
      {/* <span className="hello">{totalLikes}</span> */}
    </>
  );
};

export default EmojiButton;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const EmojiButton = (props) => {
//   const [keeps, setKeeps] = useState([]);
//   const [likeCount, setLikeCount] = useState(0); // Set initial state to 0
//   const [totalLikes, setTotalLikes] = useState(0); // Set initial state to 0

//   const faid = props.data;

//   // Initialize totalLikes when component mounts
//   useEffect(() => {
//     setTotalLikes(0);
//   }, []);

//   useEffect(() => {
//     const fetchAllKeep = async () => {
//       try {
//         const res = await axios.post("http://localhost:5789/getFaid", {
//           faid: faid,
//         });
//         setKeeps(res.data);
//         setLikeCount(res.data.likedByUser);
//         setTotalLikes(res.data.totalLikes); // 從後端獲取總按讚數值
//       } catch (err) {
//         console.log("Error in fetchAllKeep: ", err);
//       }
//     };

//     fetchAllKeep();
//   }, [faid]);

//   const collectClick = async (e) => {
//     e.preventDefault();

//     try {
//       const newLikeStatus = likeCount === 0 || likeCount === null ? 1 : 0;
//       setLikeCount(newLikeStatus);

//       // 根據新的按讚狀態更新 totalLikes
//       setTotalLikes((prevTotalLikes) => prevTotalLikes + (newLikeStatus ? 1 : -1));

//       await axios.put(`http://localhost:5789/posts/${faid}/like`, {
//         faid: faid,
//         likedByUser: newLikeStatus,
//       });

//       // 更新前端顯示的按讚狀態
//       setKeeps((prevKeeps) => {
//         return prevKeeps.map((keep) => {
//           if (keep.faid === faid) {
//             return {
//               ...keep,
//               likeByUser: newLikeStatus,
//             };
//           }
//           return keep;
//         });
//       });
//     } catch (err) {
//       console.log("Error in collectClick: ", err);
//     }
//   };

//   return (
//     <>
//       {keeps.map((keep, index) => (
//         <div key={index}>
//           <a className="text-decoration-none ms-2" href="#">
//             <div onClick={collectClick}>
//               {keep.likeByUser === 0 ? (
//                 <img src="public/img/forum/like.svg" alt="" />
//               ) : (
//                 <img src="public/img/forum/likeClick.svg" alt="" />
//               )}
//             </div>
//           </a>
//           <span className="hello">{totalLikes}</span>
//         </div>
//       ))}
//     </>
//   );
// };

// export default EmojiButton;
