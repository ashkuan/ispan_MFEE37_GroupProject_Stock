import React from "react";
import { Link } from "react-router-dom";

const EnterCode = () => {
  return (
    <div
      style={{
        width: "450px",
        height: "800px",
      }}
    >
      <form
        id="enterCode"
        className="card rounded-4 drop-shadow-20"
        style={{ padding: "60px" }}
      >
        <div className="card-body fw-bold px-5 text-IronGray-Deep">
          <label className="d-flex justify-content-center m-auto py-3 fs-3 mb-3">
            驗證碼
          </label>
          <div className="d-flex gap-3 justify-content-center">
            <input
              type="text"
              maxLength="1"
              pattern="[0-9]"
              required
              autoFocus
              style={{ width: "50px" }}
              className="py-4"
            />
            <input
              type="text"
              maxLength="1"
              pattern="[0-9]"
              required
              style={{ width: "50px" }}
              className="py-4"
            />
            <input
              type="text"
              maxLength="1"
              pattern="[0-9]"
              required
              style={{ width: "50px" }}
              className="py-4"
            />
            <input
              type="text"
              maxLength="1"
              pattern="[0-9]"
              required
              style={{ width: "50px" }}
              className="py-4"
            />
          </div>
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#2c3e50",
            color: "white",
            border: "none",
            fontSize: "1.5rem",
            padding: "8px",
            borderRadius: "5px",
            marginTop: "30px",
          }}
        >
          提交
        </button>
      </form>
    </div>
  );
};

export default EnterCode;
