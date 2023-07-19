import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";

const AddMessage = (props) => {
  const { uid, name, email, photopath } = useContext(UserContext);

  const faid = props.data;
  const [fmContent, setFmContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uid) {
      console.log("未登入，無法成功留言");
      return;
    }

    try {
      await axios.post(`http://localhost:5052/messages/${faid}`, {
        fmContent,
      });
      // 成功提交留言后，重新獲取留言列表以顯示新的留言
      props.fetchAllMessages(); // 請從 ArticlePopular 元件傳遞 fetchAllMessages 函數
      setFmContent(""); // 清空留言內容
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex align-items-center">
        <img src={`http://localhost:3000/${photopath}`} className="useImg" />
        <p>{name}</p>
        <input
          type="text"
          className="form-control ms-3 fs-5"
          name="fmContent"
          placeholder="留言..."
          value={fmContent}
          onChange={(e) => setFmContent(e.target.value)}
        />
        <button type="submit" className="btn btn-primary ms-3">
          送出留言
        </button>
      </div>
    </form>
  );
};

export default AddMessage;

// import React, { useState } from 'react';

// const AddMessage = () => {
//     return (
//         <div className="d-flex align-items-center">
//             <img src="./img/forum/user-chicken.svg" alt="" />
//             <input type="text" className="form-control ms-3 fs-5" placeholder="留言..." />
//         </div>
//     )
// }

// export default AddMessage;
