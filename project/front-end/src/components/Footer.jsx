import React from "react";
import "../styles/footer.css";
import { Link } from "react-router-dom";
const footer = () => {
  return (
    <footer id="footer">
      <div className="container">
        <div className="py-3 d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-center align-items-center">
            {/* Footer logo & media-link */}
            <div className="pe-5 pt-3 pb-5 mx-auto my-auto">
              <div className="py-4 text-center">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 40 57"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="7" y="29.5273" width="5" height="7" fill="#F58B82" />
                  <rect x="14" y="26.5273" width="5" height="10" fill="#F58B82" />
                  <rect x="21" y="22.5273" width="5" height="14" fill="#F58B82" />
                  <rect x="28" y="18.5273" width="5" height="18" fill="#F58B82" />
                  <path
                    id="navbar-brand-img"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.998112 34.8662C0.967175 34.8208 0.904987 34.8096 0.860147 34.8414C0.836459 34.8581 0.821399 34.8845 0.819098 34.9135C0.797449 35.1858 0.781191 35.4597 0.770434 35.7351C0.344999 46.6287 8.68585 55.7988 19.4002 56.2173C30.1146 56.6357 39.1452 48.144 39.5707 37.2504C39.631 35.7056 39.5151 34.1955 39.2411 32.7401C39.2335 32.7001 39.1784 32.6957 39.1644 32.7339C39.1568 32.7547 39.1337 32.7655 39.1129 32.7578L35.1404 31.305C35.0019 31.2543 34.8471 31.3119 34.7753 31.4407L32.2083 36.0494L32.0701 36.2976C31.9691 36.4789 31.7189 36.5054 31.5822 36.3491L31.3952 36.1353L28.5957 32.9353C28.4712 32.793 28.2476 32.7999 28.1322 32.9498L25.8866 35.8659L25.6845 36.1284C25.5468 36.3072 25.2683 36.2756 25.1741 36.0704L25.036 35.7693L23.0652 31.4735C22.9747 31.2761 22.7109 31.2373 22.5674 31.4004L20.7952 33.4138L20.6546 33.5736C20.5403 33.7035 20.3401 33.71 20.2176 33.5878L20.0668 33.4375L15.9621 29.3437C15.8329 29.2149 15.6195 29.2302 15.5101 29.3763L11.0853 35.2824L10.8836 35.5515C10.7472 35.7336 10.4657 35.7035 10.3709 35.4968L10.2307 35.1911L8.141 30.6362C8.06357 30.4674 7.85294 30.4088 7.69945 30.5133L1.20873 34.9339C1.14665 34.9761 1.06206 34.9601 1.01978 34.898L0.998112 34.8662Z"
                    fill="#EEEEEE"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.84407 20.7353C3.85278 20.9917 4.16037 21.111 4.34324 20.931L9.56315 15.7925L9.73802 15.6203C9.87343 15.487 10.0971 15.5116 10.2003 15.6711L10.3337 15.8771L12.6635 19.4767C12.7896 19.6715 13.0797 19.6555 13.1836 19.4479L16.0871 13.6462L16.1944 13.4319C16.2781 13.2646 16.493 13.2139 16.6427 13.3263L16.8344 13.4701L21.1875 16.7367C21.3296 16.8434 21.5329 16.8038 21.6245 16.6515L23.0798 14.2339L23.245 13.9594C23.3594 13.7694 23.6333 13.7649 23.7538 13.9511L23.9279 14.22L26.2691 17.8372C26.3943 18.0306 26.6817 18.0166 26.7875 17.8119L28.1841 15.1098L28.3005 14.8847C28.3895 14.7124 28.6161 14.6686 28.763 14.7953L28.9549 14.9608L31.7982 17.4135C31.9589 17.552 32.2087 17.4846 32.2778 17.284L33.746 13.0233L33.8033 12.8572C33.8524 12.7148 33.9995 12.6308 34.1471 12.6611L34.3192 12.6964L37.7693 13.4037C38.0051 13.452 38.1976 13.2171 38.099 12.9976C34.846 5.75063 27.4862 1.12803 19.5892 2.09063C10.31 3.2217 3.51639 11.0792 3.84407 20.7353Z"
                    fill="#EEEEEE"
                  />
                </svg>
                <p className="px-3 py-2 fs-4">
                  {/* <i className="fas fa-gem me-3"></i> */}
                  股估績
                </p>
              </div>
              <div className="linksIcon d-flex justify-content-center">
                <a href="#!" className="px-3 text-decoration-none text-reset">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi bi-facebook"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                </a>
                <a href="#!" className="px-3 text-decoration-none text-reset">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi bi-twitter"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                  </svg>
                </a>
                <a href="#!" className="px-3 text-decoration-none text-reset">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi bi-instagram"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                  </svg>
                </a>
                <a href="#!" className="px-3 text-decoration-none text-reset">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi bi-github"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </a>
              </div>
            </div>
            {/* Footer-內容 */}
            <div className="d-flex">
              <div className="px-4">
                <div className="linksTitle fs-4 mb-3">
                  快速連結
                </div>
                <hr />
                <div className="linksContent">
                  <Link to="/stock-index" className="text-reset fs-5">
                    大盤產業
                  </Link>
                </div>
                <div className="linksContent">
                  <Link to="/forum" className="text-reset fs-5">
                    討論區
                  </Link>
                </div>
                <div className="linksContent">
                  <Link to="/rookie" className="text-reset fs-5">
                    新手上路
                  </Link>
                </div>
                <div className="linksContent">
                  <Link to="/shop" className="text-reset fs-5">
                    購物商城
                  </Link>
                </div>
              </div>
              <div className="px-4">
                <div className="linksTitle fs-4 mb-3">
                  會員專屬
                </div>
                <hr />
                <div className="linksContent">
                  <a href="#!" className="text-reset fs-5">
                    會員資訊
                  </a>
                </div>
                <div className="linksContent">
                  <a href="#!" className="text-reset fs-5">
                    會員公告
                  </a>
                </div>
                <div className="linksContent">
                  <a href="#!" className="text-reset fs-5">
                    我的收藏
                  </a>
                </div>
                <div className="linksContent">
                  <a href="#!" className="text-reset fs-5">
                    我的文章
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Footer-Contact-Us */}
          <div className="">
            <div className="linksTitle fs-4 mb-3">
              聯絡我們
            </div>
            <hr />
            <div className="linksContent d-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-house-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
                <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
              </svg>
              <div className="ms-3 text-reset fs-5">
                台中市南屯區公益路二段51號18樓
              </div>
            </div>
            <div className="linksContent d-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-envelope-fill"
                viewBox="0 0 16 16"
              >
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
              </svg>
              <div className="ms-3 text-reset fs-5">
                mfee37_no2@gmail.com
              </div>
            </div>
            <div className="linksContent d-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-telephone-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                />
              </svg>
              <div className="ms-3 text-reset fs-5">
                (04) 2326-5860
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default footer;
