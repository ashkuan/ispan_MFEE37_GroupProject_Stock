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

let code = "";
app.post("/sendEmail", async (req, res) => {
  code = createSixNum();
  const { email } = req.body;
  console.log(email);
  const mailOptions = {
    from: "allyoucaneat0923@gmail.com",
    to: email,
    subject: "股估績忘記密碼驗證信",
    text: `你的驗證碼為「${code}」`,
  };
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("email寄送成功");
      app.get("/getMesFromBackend", (req, res) => {
        res.json({ message: "email寄送成功" });
      });
      app.post("/sendCode", async (req, res) => {
        const { certi1, certi2, certi3, certi4, certi5, certi6 } = req.body;
        if (`${certi1}${certi2}${certi3}${certi4}${certi5}${certi6}` == code) {
          console.log("密碼匹配成功");
          app.get("/getMesFromBackend2", (req, res) => {
            res.json({ message: "密碼匹配成功" });
          });
        } else {
          console.log("密碼匹配失敗");
        }
      });
    }
  });
});

app.post("/sendNewPassword", async (req, res) => {
  const { password } = req.body;
  console.log(password);
  const url = "UPDATE `login` SET `password`=? WHERE `email`=?";
  db.query(url, [password, email], function (err, data) {
    if (err) {
      console.log(err);
      console.log("密碼更新失敗");
    } else {
      console.log("密碼更新成功");
      res.redirect("http://localhost:5173/loginpage");
    }
  });
});
app.listen(3333, () => {
  console.log(
    "忘記密碼 的 port 3333 連接完成 " + new Date().toLocaleTimeString()
  );
});
