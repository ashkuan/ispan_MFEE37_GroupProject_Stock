import React, { useState } from "react";
import axios from "axios";

const AddMessage = (props) => {
  const faid = props.data;
  console.log(faid);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fmContent = e.target.elements.fmContent.value;
    try {
      await axios.post("http://localhost:5052/messages", { fmContent, faid });
      // 成功提交留言后，可以刷新页面或更新留言数据以显示新留言
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex align-items-center">
        <img src="./img/forum/user-chicken.svg" alt="" />
        <input
          type="text"
          className="form-control ms-3 fs-5"
          name="fmContent"
          placeholder="留言..."
        />
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
