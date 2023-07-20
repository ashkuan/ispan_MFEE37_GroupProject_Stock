import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const AddMessage = (props) => {
  const { uid, name, email, photopath } = useContext(UserContext);

  const faid = props.data;
  const [fmContent, setFmContent] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uid) {
      setAlertMessage("未登入，無法成功留言");
      setAlertSeverity("error");
      return;
    }
    if (!fmContent.trim()) {
      setAlertMessage("留言內容不能是空的");
      setAlertSeverity("error");
      return;
    }

    try {
      await axios.post(`http://localhost:5052/messages/${faid}`, {
        uid,
        fmContent,
      });

      // 成功提交留言后，重新获取留言列表以显示新的留言
      props.fetchAllMessages(); // 从 ArticlePopular 元件传递 fetchAllMessages 函数

      setFmContent(""); // 清空留言內容
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack sx={{ width: "100%" }} spacing={2}>
        {alertMessage && (
          <Alert severity={alertSeverity} onClose={() => setAlertMessage("")}>
            {alertMessage}
          </Alert>
        )}
      </Stack>
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

// export default AddMessage
