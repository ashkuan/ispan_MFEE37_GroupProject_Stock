import React, { useState, useEffect, useContext } from "react";
import MemberTitle from "../components/member/MemberTitle";
import SidebarTabs from "../components/member/SidebarTabs";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import "../styles/member.css";
import "../styles/forum_main.css";

const Member = () => {
  const uid = sessionStorage.getItem("uid");
  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const photopath = sessionStorage.getItem("photopath");
  const password = sessionStorage.getItem("password");
  console.log(photopath)

  // const [password, setPassword] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/member", { withCredentials: true })
      .then((res) => {
        // setUid(res.data.uid);
        // setName(res.data.name);
        // setEmail(res.data.email);
        // setPassword(res.data.password);
        // setPhotopath(res.data.photopath);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div style={{ height: "6rem" }}></div>
      <div className="d-flex justify-content-center">
        <div
          className="vh-83 drop-shadow-20 position-fixed rounded-4 bg-Primary-Gray text-IronGray-Deep mt-3"
          style={{ width: "75rem" }}>
          <MemberTitle />
          <SidebarTabs />
        </div>
      </div>
    </>
  );
};

export default Member;
