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
  }, []);

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

      // 更新前端顯示的按愛心狀態
      setKeeps((prevKeeps) => {
        return prevKeeps.map((keep) => {
          if (keep.faid === faid) {
            const updatedTotalLikes = Math.max(keep.totalLikes + (newLikeStatus === 1 ? 1 : -1), 0);
            return {
              ...keep,
              likeByUser: newLikeStatus,
              totalLikes: updatedTotalLikes // 更新 totalLikes
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
        <div className="d-flex align-items-center" key={"emoji"+index}>
          <a className="text-decoration-none" href="#">
            <div onClick={collectClick}>
              {keep.likeByUser !== 1 ? (
                <img src="public/img/forum/like.svg" alt="" />
              ) : (
                <img src="public/img/forum/likeClick.svg" alt="" />
              )}
            </div>
          </a>
          <div className="hello ms-3">{keep.totalLikes}</div>
        </div>
      ))}
    </>
  );
};

export default EmojiButton;


