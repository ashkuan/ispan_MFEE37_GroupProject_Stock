// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const EmojiButton = (props) => {
//   const [keeps, setKeeps] = useState([]);
//   const [likeCount, setLikeCount] = useState(0); // Set initial state to 0
//   const [totalLikes, setTotalLikes] = useState(0);

//   const faid = props.data;

//   useEffect(() => {
//     const fetchAllKeep = async () => {
//       try {
//         const res = await axios.post("http://localhost:5789/getFaid", {
//           faid: faid,
//         });
//         setKeeps(res.data);
//         setLikeCount(res.data.likedByUser);
//       } catch (err) {
//         console.log("Error in fetchAllKeep: ", err);
//       }
//     };

//     fetchAllKeep();
//   }, []);

//   useEffect(() => {
//     // Calculate the total likes whenever keeps or likeCount changes
//     const calculateTotalLikes = () => {
//       const total = keeps.reduce((sum, keep) => sum + keep.likeByUser, 0);
//       setTotalLikes(total);
//     };
//     calculateTotalLikes();
//   }, [keeps, likeCount]);

//   const collectClick = async (e) => {
//     e.preventDefault();

//     try {
//       const newLikeStatus = likeCount === 0 || likeCount === null ? 1 : 0;
//       setLikeCount(newLikeStatus);

//       await axios.put(`http://localhost:5789/posts/${faid}/like`, {
//         faid: faid,
//         likedByUser: newLikeStatus,
//       });

//       // 更新前端顯示的按愛心狀態
//       setKeeps((prevKeeps) => {
//         return prevKeeps.map((keep) => {
//           if (keep.faid === faid) {
//             const updatedTotalLikes = Math.max(keep.totalLikes + (newLikeStatus === 1 ? 1 : -1), 0);
//             return {
//               ...keep,
//               likeByUser: newLikeStatus,
//               totalLikes: updatedTotalLikes // 更新 totalLikes
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
//         <div className="d-flex align-items-center" key={"emoji"+index}>
//           <a className="text-decoration-none" href="#">
//             <div onClick={collectClick}>
//               {keep.likeByUser !== 1 ? (
//                 <img src="public/img/forum/like.svg" alt="" />
//               ) : (
//                 <img src="public/img/forum/likeClick.svg" alt="" />
//               )}
//             </div>
//           </a>
//           <div className="hello ms-3">{keep.totalLikes}</div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default EmojiButton;

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

//這版可以更新後端 前端不可以
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const EmojiButton = (props) => {
//   const [keeps, setKeeps] = useState([]);
//   const [likeCount, setLikeCount] = useState(0); // Set initial state to 0
//   const [totalLikes, setTotalLikes] = useState(0);

//   const faid = props.data;

//   useEffect(() => {
//     const fetchAllKeep = async () => {
//       try {
//         const res = await axios.post("http://localhost:5789/getFaid", {
//           faid: faid,
//         });
//         // console.log(res.data)
//         setKeeps(res.data);
//         setLikeCount(res.data[0].likedByUser);
//         // setTotalLikes(res.data[0].totalLikes);
//         console.log("愛"+res.data[0].likeCount)
//         console.log("愛心"+res.data[0].likedByUser)
//         console.log("心"+res.data[0].totalLikes)
//       } catch (err) {
//         console.log("Error in fetchAllKeep: ", err);
//       }
//     };

//     fetchAllKeep();
//   }, [faid]);

//   useEffect(() => {
//     // Calculate the total likes whenever keeps or likeCount changes
//     const calculateTotalLikes = () => {
//       const total = keeps.reduce((sum, keep) => sum + keep.likeByUser, 0);
//       setTotalLikes(total);
//     };
//     calculateTotalLikes();
//   }, [keeps, likeCount,totalLikes]);

//   const collectClick = async (e) => {
//     e.preventDefault();

//     try {
//       const newLikeStatus = likeCount === 0 || likeCount === null ? 1 : 0;
//       setLikeCount(newLikeStatus);

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
//           <span className="hello">{keep.totalLikes}</span>
//         </div>
//       ))}
//       {/* <span className="hello">{totalLikes}</span> */}
//     </>
//   );
// };
// export default EmojiButton;

import React, { useState, useEffect } from "react";
import axios from "axios";

const EmojiButton = (props) => {
  const [keeps, setKeeps] = useState([]);

  const faid = props.data;

  useEffect(() => {
    const fetchAllKeep = async () => {
      try {
        const res = await axios.post("http://localhost:5789/getFaid", {
          faid: faid,
        });
        setKeeps(res.data);
        console.log("fetchAllKeep: ", res.data[0]);
      } catch (err) {
        console.log("Error in fetchAllKeep: ", err);
      }
    };

    fetchAllKeep();
  }, [faid]);

  const collectClick = async (e, faid, likeByUser) => {
    e.preventDefault();

    try {
      const newLikeStatus = likeByUser === 0 ? 1 : 0;

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
              totalLikes: keep.totalLikes + (newLikeStatus === 1 ? 1 : -1),
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
            <div onClick={(e) => collectClick(e, keep.faid, keep.likeByUser)}>
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
    </>
  );
};
export default EmojiButton;
