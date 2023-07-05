import React from "react";
import PostComponent from "./Post";
import "../../styles/forum_main_right.css";

function PostBtn() {
  const handlePostClick = () => {
    return <PostComponent />;
  };

  return (
    <button className="postBtn mt-4 px-5 fz-3" onClick={handlePostClick}>
      <div className="d-flex p-4 justify-content-between">
        <img
          className="userImg d-flex align-items-center"
          src="./img/forum/userImg.svg"
          alt=""
        />
        <div className="articleShare d-flex align-items-center p-2 pr-1">
          想和大家分享些...
        </div>
        <div className="articleBtn p-2">我要發文</div>
      </div>
    </button>
  );
}

export default PostBtn;
