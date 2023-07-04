import React from "react";
import "../../styles/forum_sidebar.css";

function SidebarTag() {
  return (
    <div
      className="card rounded-4"
      style={{ filter: "drop-shadow(0px 20px 30px rgba(0, 0, 0, 0.1))" }}
    >
      <div className="card-title IronGray-Deep rounded-top-xl p-3">
        <a
          className="d-flex text-decoration-none text-white fz-2 align-items-center"
          href="#"
        >
          熱門關鍵字 &gt;
        </a>
      </div>
      <div className="card-body">
        <ul className="cloud" role="navigation" aria-label="Webdev tag cloud">
          <li>
            <a data-weight={4} href="#">
              華航
            </a>
          </li>
          <li>
            <a data-weight={2} href="#">
              CPU
            </a>
          </li>
          <li>
            <a data-weight={5} href="#">
              AI
            </a>
          </li>
          <li>
            <a data-weight={7} href="#">
              日月光
            </a>
          </li>
          <li>
            <a data-weight={5} href="#">
              PU
            </a>
          </li>
          <li>
            <a data-weight={1} href="#">
              散熱
            </a>
          </li>
          <li>
            <a data-weight={7} href="#">
              ETF
            </a>
          </li>
          <li>
            <a data-weight={4} href="#">
              航空股
            </a>
          </li>
          <li>
            <a data-weight={2} href="#">
              日月光
            </a>
          </li>
          <li>
            <a data-weight={4} href="#">
              玻璃
            </a>
          </li>
          <li>
            <a data-weight={6} href="#">
              AI
            </a>
          </li>
          <li>
            <a data-weight={8} href="#">
              日月光
            </a>
          </li>
          <li>
            <a data-weight={3} href="#">
              PU
            </a>
          </li>
          <li>
            <a data-weight={1} href="#">
              散熱
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SidebarTag;
