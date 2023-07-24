import React, { useRef } from "react";

const EnterCode = () => {
  const inputRefs = useRef([]);

  const handleInputChange = (index, event) => {
    const input = event.target;
    const value = input.value;
    if (value.length >= 1) {
      const nextIndex = index + 1;
      if (nextIndex < inputRefs.current.length) {
        inputRefs.current[nextIndex].focus();
      }
    }
  };

  const onKeyDown = (event) => {
    // 攔截輸入的字符，確保只能輸入數字
    const isValidInput = /^[0-9]$/; // 使用正規表達式確認輸入的字符是否為數字
    // 確保只有數字和允許的特殊鍵可以被輸入
    const isAllowedKey =
      isValidInput.test(event.key) || // 數字鍵
      event.key === "Backspace" || // 刪除鍵 (backspace)
      event.key === "Tab" || // 制表鍵 (tab)
      event.key === "ArrowLeft" || // 左箭頭鍵
      event.key === "ArrowRight"; // 右箭頭鍵

    if (!isAllowedKey) {
      event.preventDefault();
    }
  };
  const onInput = (event) => {
    // 移除非數字字符
    const input = event.target;
    const value = input.value;
    input.value = value.replace(/[^0-9]/g, "");
  };

  return (
    <div
      style={{
        width: "450px",
        height: "800px",
      }}
    >
      <form
        action="http://localhost:3333/sendCode"
        method="post"
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
              ref={(ref) => (inputRefs.current[0] = ref)}
              onChange={(e) => handleInputChange(0, e)}
              onKeyDown={onKeyDown}
              onInput={onInput}
              type="text"
              maxLength="1"
              pattern="[0-9]"
              required
              autoFocus
              style={{ width: "50px" }}
              className="py-2 fs-1 text-center"
              name="certi1"
            />
            <input
              ref={(ref) => (inputRefs.current[1] = ref)}
              onChange={(e) => handleInputChange(1, e)}
              onKeyDown={onKeyDown}
              onInput={onInput}
              type="text"
              maxLength="1"
              pattern="[0-9]"
              required
              autoFocus
              style={{ width: "50px" }}
              className="py-2 fs-1 text-center"
              name="certi2"
            />
            <input
              ref={(ref) => (inputRefs.current[2] = ref)}
              onChange={(e) => handleInputChange(2, e)}
              onKeyDown={onKeyDown}
              onInput={onInput}
              type="text"
              maxLength="1"
              pattern="[0-9]"
              required
              autoFocus
              style={{ width: "50px" }}
              className="py-2 fs-1 text-center"
              name="certi3"
            />
            <input
              ref={(ref) => (inputRefs.current[3] = ref)}
              onChange={(e) => handleInputChange(3, e)}
              onKeyDown={onKeyDown}
              onInput={onInput}
              type="text"
              maxLength="1"
              pattern="[0-9]"
              required
              autoFocus
              style={{ width: "50px" }}
              className="py-2 fs-1 text-center"
              name="certi4"
            />
            <input
              ref={(ref) => (inputRefs.current[4] = ref)}
              onChange={(e) => handleInputChange(4, e)}
              onKeyDown={onKeyDown}
              onInput={onInput}
              type="text"
              maxLength="1"
              pattern="[0-9]"
              required
              autoFocus
              style={{ width: "50px" }}
              className="py-2 fs-1 text-center"
              name="certi5"
            />
            <input
              ref={(ref) => (inputRefs.current[5] = ref)}
              onChange={(e) => handleInputChange(5, e)}
              onKeyDown={onKeyDown}
              onInput={onInput}
              type="text"
              maxLength="1"
              pattern="[0-9]"
              required
              autoFocus
              style={{ width: "50px" }}
              className="py-2 fs-1 text-center"
              name="certi6"
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
