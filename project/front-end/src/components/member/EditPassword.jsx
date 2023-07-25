import React from "react";

const EditPassword = () => {
  return (
    <>
      <div className="mt-10_5rem d-flex align-items-center justify-content-center">
        <form
          action="http://localhost:3333/sendNewPassword"
          method="post"
          id="memberLogin"
          className="card p-4 rounded-4 drop-shadow-20"
        >
          <div className="card-body fw-bold px-5 text-IronGray-Deep">
            <div className="">
              <label
                htmlFor="email"
                className="d-flex justify-content-center m-auto py-3 fs-3"
              >
                請輸入新密碼
              </label>
              <input
                type="password"
                name="password"
                className="member-inp border-1 rounded-2"
                placeholder="請輸入新密碼"
              />
              <label
                htmlFor="email"
                className="d-flex justify-content-center m-auto py-3 fs-3"
              >
                請再輸入一次新密碼
              </label>
              <input
                type="password"
                className="member-inp border-1 rounded-2"
                placeholder="請再輸入一次新密碼"
              />
            </div>
            <div className="d-flex flex-column justify-content-around">
              <button type="submit" className="btn btn-login py-2 mb-4 mt-4">
                送出
              </button>
              <button className="btn btn-login py-2 mb-4">取消</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditPassword;
