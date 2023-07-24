import React from "react";
import EnterCode from "../components/member/EnterCode";
import EnterEmail from "../components/member/EnterEmail";
import EditPassword from "../components/member/EditPassword";

const ForgetPassword = () => {
  return (
    <div style={{ marginTop: "120px" }}>
     
      <div  style={{display:""}}>
        <EnterEmail />
      </div>
      <div  style={{display:""}}>
        <EnterCode />
      </div>
    </div>
  );
};

export default ForgetPassword;
