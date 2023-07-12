import React, { useState, useEffect } from "react";
import axios from "axios";
const HitoHashTags = () => {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const fetchAllTag = async () => {
      try {
        const res = await axios.get("http://localhost:3000/posts");
        setTags(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTag();
  }, []);
  return (
    <>
      {tags.map((tag, index) => (
        <a
          href="#"
          className="me-3 text-decoration-none IronGray-Light text-white fz-3 rounded-3 px-2 py-1"
          key={index}
        >
          {tag.fhashtag}
        </a>
      ))}
    </>
  );
};

export default HitoHashTags;
