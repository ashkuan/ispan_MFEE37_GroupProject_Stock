import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

const EmojiButton = (props) => {
  const [keeps, setKeeps] = useState([]);
  const [likeCount, setLikeCount] = useState(0); // Set initial state to 0
  const [totalLikes, setTotalLikes] = useState(0);
  const uid = sessionStorage.getItem("uid");
  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const photopath = sessionStorage.getItem("photopath");
  const faid = props.data;

  useEffect(() => {
    const fetchAllKeep = async () => {
      try {
        const res = await axios.post("http://localhost:5789/getFaid", {
          faid: faid,
        });
        // console.log(res.data)
        setKeeps(res.data);
        setLikeCount(res.data[0].likedByUser);
        // setTotalLikes(res.data[0].totalLikes);
        console.log("愛" + res.data[0].likeCount);
        console.log("愛心" + res.data[0].likedByUser);
        console.log("心" + res.data[0].totalLikes);
      } catch (err) {
        console.log("Error in fetchAllKeep: ", err);
      }
    };

    fetchAllKeep();
  }, [totalLikes]);

  useEffect(() => {
    // Calculate the total likes whenever keeps or likeCount changes
    const calculateTotalLikes = () => {
      const total = keeps.reduce((sum, keep) => sum + keep.likedByUser, 0);
      setTotalLikes(total);
    };
    calculateTotalLikes();
  }, [keeps, likeCount, totalLikes]);

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
              likedByUser: newLikeStatus,
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
              {keep.likedByUser === 0 ? (
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
