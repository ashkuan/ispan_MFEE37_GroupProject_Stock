import React from "react";
import EnterCode from "../components/member/EnterCode";
import EnterEmail from "../components/member/EnterEmail";
import EditPassword from "../components/member/EditPassword";

const ForgetPassword = () => {
  return (
    <div style={{ marginTop: "120px" }}>
      <EnterEmail></EnterEmail>
      <EnterCode></EnterCode>
      <EditPassword></EditPassword>
    </div>
  );
};

export default ForgetPassword;
