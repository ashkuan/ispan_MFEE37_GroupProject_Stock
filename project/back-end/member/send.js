import { createTransport } from "nodemailer";
import express from "express";
var app = express();
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
      console.log("email 寄送成功" + data.response);
    }
  });
});

app.post("/sendCode", async (req, res) => {
  const { certi1, certi2, certi3, certi4, certi5, certi6 } = req.body;
  if (`${certi1}${certi2}${certi3}${certi4}${certi5}${certi6}` == code) {
    console.log("密碼匹配成功");
  }
});

app.listen(3333, () => {
  console.log(
    "忘記密碼 的 port 3333 連接完成 " + new Date().toLocaleTimeString()
  );
});
