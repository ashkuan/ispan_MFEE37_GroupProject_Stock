import axios from "axios";
import React, { useState, useEffect } from "react";

const BoardTag = (props) => {
  const [boards, setBoards] = useState([]);
  
  const faid = props.data;

  useEffect(() => {
    const fetchAllBoard = async () => {
      try {
        const res = await axios.post("http://localhost:5789/getFaid", {
          faid: faid,
        });
        // console.log(faidRes.data);
        console.log(res.data);
        setBoards(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBoard();
  }, []);

  return (
    <>
      {boards.map((board, index) => (
        <div>
        <a
          href="#"
          className="me-3 text-decoration-none
                IronGray-Light text-white fs-5 rounded-5 px-3 py-2"
          key={index}
        >
          {board.fboard}
        </a>
        {board.faimage}
          </div>
      ))}
    </>
  );
};

export default BoardTag;

