import axios from "axios";
import React, { useState, useEffect } from "react";

const BoardTag = () => {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    const fetchAllBoard = async () => {
      try {
        const res = await axios.get("http://localhost:3000/posts");
        console.log(res);
        setBoards(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBoard();
  }, []);
  return (
    <>
      {boards.map((board, index) => (
        <a
          href="#"
          className="me-3 text-decoration-none 
                IronGray-Light text-white fs-5 rounded-5 px-3 py-2"
          key={index}
        >
          {board.fboard}
        </a>
      ))}
    </>
  );
};

export default BoardTag;
