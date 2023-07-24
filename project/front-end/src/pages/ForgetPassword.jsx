import React from "react";
import EnterCode from "../components/member/EnterCode";
import EnterEmail from "../components/member/EnterEmail";

const ForgetPassword = () => {
  return (
    <div style={{ marginTop: "120px" }}>
      <EnterEmail></EnterEmail>
      <EnterCode></EnterCode>
    </div>
  );
};

export default ForgetPassword;
