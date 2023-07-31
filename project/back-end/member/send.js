import { createTransport } from "nodemailer";
import express from "express";
import db from "../DB/DBconfig.js";
import cors from "cors";
var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const createSixNum = () => {
  var Num = "";
  for (let i = 0; i < 6; i++) {
    Num += Math.floor(Math.random() * 10);
  }
  return Num;
};

const transporter = createTransport({
  port: 5173,
  service: "gmail",
  auth: {
    user: "allyoucaneat0923@gmail.com",
    pass: "gujmtebtqktclnho",
  },
});

let BackendCode = "";
let BackendEmail = "";
app.post("/sendEmail", async (req, res) => {
  BackendCode = createSixNum();
  const { email } = req.body;
  console.log(email);
  BackendEmail = email;
  const mailOptions = {
    from: "allyoucaneat0923@gmail.com",
    to: email,
    subject: "股估績驗證信",
    text: `您好，您的驗證碼為「${BackendCode}」，請儘速完成驗證後更改密碼。`,
  };
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("email寄送成功");
      return res.json({ message: "email寄送成功" });
    }
  });
});

app.post("/sendCode", async (req, res) => {
  const { code } = req.body;
  if (code == BackendCode) {
    console.log("驗證碼匹配成功");
    return res.json({ message: "驗證碼匹配成功" });
  } else {
    console.log("驗證碼匹配失敗");
    return res.json({ message: "驗證碼匹配失敗" });
  }
});

app.post("/sendNewPassword", async (req, res) => {
  const { pwd1 } = req.body;
  console.log(pwd1);
  const url = "UPDATE `login` SET `password`=? WHERE `email`=?";
  db.query(url, [pwd1, BackendEmail], function (err, data) {
    if (err) {
      console.log(err);
      console.log("密碼更新失敗");
      return res.json({ message: "密碼更新失敗" });
    } else {
      console.log("密碼更新成功");
      return res.json({ message: "密碼更新成功" });
    }
  });
});

app.listen(3333, () => {
  console.log(
    "忘記密碼 的 port 3333 連接完成 " + new Date().toLocaleTimeString()
  );
});
