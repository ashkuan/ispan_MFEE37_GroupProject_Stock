import React, { useState, useContext } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const AddMessage = (props) => {
  const uid = sessionStorage.getItem("uid");
  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const photopath = sessionStorage.getItem("photopath");

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
      await axios.post(`http://localhost:5052/insertmessages/${faid}`, {
        uid,
        fmContent,
      });
      // 成功提交留言後,重新獲取留言列表以顯示新的留言
      props.fetchAllMessages();
      // 清空留言內容
      setFmContent("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <hr />
      <form onSubmit={handleSubmit}>
        <Stack sx={{ width: "100%" }} spacing={2}>
          {alertMessage && (
            <Alert severity={alertSeverity} onClose={() => setAlertMessage("")}>
              {alertMessage}
            </Alert>
          )}
        </Stack>
        <div className="row d-flex align-items-center">
          <div className="col-1">
            <img
              src={`http://localhost:3000/${photopath}`}
              className="useImg"
            />
            {/* <p>{name}</p> */}
          </div>
          <div className="col-8 ps-4">
            <input
              type="text"
              className="form-control ms-3 fs-5"
              name="fmContent"
              placeholder="留言..."
              value={fmContent}
              onChange={(e) => {
                setFmContent(e.target.value);
                console.log(e.target.value);
              }}
            />
          </div>
          <div className="col-3 ps-5">
            <button
              type="submit"
              className="border-0 IronGray text-white px-2 rounded-2 py-1 ms-3 fz-3 letter-spacing-0_2"
            >
              留言
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddMessage;
