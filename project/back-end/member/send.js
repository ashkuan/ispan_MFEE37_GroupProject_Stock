import { createTransport } from "nodemailer";
const transporter = createTransport({
  service: "gmail",
  auth: {
    user: "allyoucaneat0923@gmail.com",
    pass: "gujmtebtqktclnho",
  },
});

const createSixNum = () => {
  var Num = "";
  for (let i = 0; i < 6; i++) {
    Num += Math.floor(Math.random() * 10);
  }
  return Num;
};
var code = createSixNum();

const mailOptions = {
  from: "allyoucaneat0923@gmail.com",
  to: "pcsara0923@gmail.com",
  subject: "恭喜收到驗證信",
  text: "你的驗證碼為" + code,
};

transporter.sendMail(mailOptions, (err, data) => {
  if (err) {
    console.log(error);
  } else {
    console.log("email 寄送成功" + data.response);
  }
});
