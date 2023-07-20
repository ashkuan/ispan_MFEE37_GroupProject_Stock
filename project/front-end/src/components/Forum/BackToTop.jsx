import React from "react";
import "../../styles/forum_main.css";

const BackToTop = () => {
  return (
    <div className="drop-shasow-20 backToTop">
      <svg
        width="65"
        height="65"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="32" height="32" rx="5" fill="#B4C7DD" />
        <path
          d="M14.5 26C14.5 26.8284 15.1716 27.5 16 27.5C16.8284 27.5 17.5 26.8284 17.5 26H14.5ZM17.0607 4.93934C16.4749 4.35355 15.5251 4.35355 14.9393 4.93934L5.3934 14.4853C4.80761 15.0711 4.80761 16.0208 5.3934 16.6066C5.97918 17.1924 6.92893 17.1924 7.51472 16.6066L16 8.12132L24.4853 16.6066C25.0711 17.1924 26.0208 17.1924 26.6066 16.6066C27.1924 16.0208 27.1924 15.0711 26.6066 14.4853L17.0607 4.93934ZM17.5 26V6H14.5L14.5 26H17.5Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default BackToTop;
