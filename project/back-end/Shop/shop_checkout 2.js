import express from "express";
import db from "../DB/DBconfig.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/sendOrder", async (req, res) => {
  try {
    const merchantTradeDate = new Date(); // 交易時間
    const oid = Math.floor(Math.random() * 1000000000).toString();
    const {
      uid,
      userName,
      phoneNumber,
      email,
      county,
      district,
      address2,
      message,
      invoiceType,
      invoiceType2,
      invoiceCode,
      naturalCode,
      donationCode,
      uniNumber,
      companyName,
      ChoosePayment,
      pid,
      coupon,
      totalAmount,
    } = req.body;
    console.log(req.body);

    const orderData = [
      oid,
      uid,
      userName,
      phoneNumber,
      email,
      county,
      district,
      address2,
      pid.toString(),
      merchantTradeDate,
      totalAmount.slice(4, totalAmount.length),
      message,
      ChoosePayment,
      coupon,
      invoiceType,
      invoiceType2,
      invoiceCode,
      naturalCode,
      donationCode,
      uniNumber,
      companyName,
    ];

    const url =
      "INSERT INTO `MyOrder`(`oid`, `uid`, `userName`, `userPhone`, `userEmail`, `userCountry`, `userDistrict`, `userAddress`, `pid`, `merchantTradeDate`, `totalAmount`, `message`, `payment`, `coupon`, `invoiceType`, `invoiceType2`, `invoiceCode`, `naturalCode`, `donationCode`, `uniNumber`, `companyName`) VALUES  (?)";
    db.query(url, [orderData], function (err, data) {
      if (err) {
        console.log(err);
        console.log("訂單儲存失敗");
      } else {
        console.log("訂單儲存成功");
        res.send("訂單已送出");
      }
    });
  } catch (err) {
    console.log("接收失敗");
    console.log(err);
  }
});

app.listen(7654, () => {
  console.log("Shop 的 port 7654 連接完成 " + new Date().toLocaleTimeString());
});
