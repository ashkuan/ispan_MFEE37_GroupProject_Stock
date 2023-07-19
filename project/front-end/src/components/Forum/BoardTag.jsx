import axios from "axios";
import React, { useState, useEffect } from "react";

const BoardTag = (props) => {
  const [boards, setBoards] = useState([]);
  
  const faid = props.data;
  console.log(faid);

  useEffect(() => {
    const fetchAllBoard = async () => {
      try {
        console.log(faid);
        const res = await axios.post("http://localhost:5789/getFaid", {
          faid: faid,
        });
        // console.log(res.data);
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
        <div key={"board"+index}>
        <a
          href="#"
          className="me-3 text-decoration-none
                IronGray-Light text-white fs-5 rounded-5 px-3 py-2"
          key={index}
        >
          {board.fboard}
        </a>
          </div>
      ))}
    </>
  );
};

export default BoardTag;

