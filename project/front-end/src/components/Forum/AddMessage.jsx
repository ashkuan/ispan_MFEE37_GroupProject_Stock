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
  const isLoggedIn = !uid;
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
            {isLoggedIn ? (
              <svg
                width="44"
                height="43"
                viewBox="0 0 44 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.1782 0C10.3012 0 0.678223 9.62298 0.678223 21.5C0.678223 33.377 10.3012 43 22.1782 43C34.0552 43 43.6782 33.377 43.6782 21.5C43.6782 9.62298 34.0552 0 22.1782 0ZM22.1782 8.32258C26.3915 8.32258 29.8073 11.7383 29.8073 15.9516C29.8073 20.1649 26.3915 23.5806 22.1782 23.5806C17.9649 23.5806 14.5492 20.1649 14.5492 15.9516C14.5492 11.7383 17.9649 8.32258 22.1782 8.32258ZM22.1782 38.1452C17.0893 38.1452 12.5292 35.8391 9.47762 32.2327C11.1075 29.1637 14.2978 27.0484 18.0169 27.0484C18.225 27.0484 18.4331 27.0831 18.6325 27.1438C19.7595 27.5079 20.9385 27.7419 22.1782 27.7419C23.4179 27.7419 24.6056 27.5079 25.724 27.1438C25.9234 27.0831 26.1314 27.0484 26.3395 27.0484C30.0587 27.0484 33.249 29.1637 34.8788 32.2327C31.8272 35.8391 27.2671 38.1452 22.1782 38.1452Z"
                  fill="#2C3E50"
                />
              </svg>
            ) : (
              <img
                src={`http://localhost:3000/${photopath}`}
                className="user-img"
              />
            )}
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
