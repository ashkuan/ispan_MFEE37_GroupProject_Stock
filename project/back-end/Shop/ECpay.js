import express from "express";
import axios from "axios";
import db from "../DB/DBconfig.js";
import crypto from "crypto";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function formatDateTime(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");
  return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
}

const MerchantID = "3002607"; // 特店編號
const hashKey = "pwFHCqoQZGmho4w6";
const hashIV = "EkRm7iFT261dpevs";
const apiUrl = "https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5";

// const PaymentType = "aio"; // 交易類型
const ReturnURL = "http://localhost:5173/shop/checkout/done";
console.log(ReturnURL); // 付款完成通知回傳網址
// const ChoosePayment = "ALL"; // 選擇預設付款方式
// const encryptType = 1; // CheckMacValue加密類型
// const clientBackURL = "https://example.com/back"; // Client端返回特店的按鈕連結
// const itemURL = "https://example.com/product"; // 商品銷售網址

app.post("/sendOrder", async (req, res) => {
  try {
    const MerchantTradeDate = formatDateTime(new Date()); // 特店交易時間
    console.log("這是訂單成立時間：");
    console.log(MerchantTradeDate);
    const oid = Math.floor(Math.random() * 1000000000).toString();
    const MerchantTradeNo = oid; // 特店訂單編號
    console.log("這是訂單編號：");
    console.log(MerchantTradeNo);

    const {
      //   email,
      //   LogisticsType,
      message,
      pid,
      oitemName,
      coupon,
      totalAmount,
    } = req.body;

    const TradeDesc = message; // 交易描述
    console.log("這是交易描述：");
    console.log(TradeDesc);
    const TotalAmount = totalAmount.slice(4, totalAmount.length); // 訂單總金額
    console.log("這是訂單總金額：");
    console.log(TotalAmount);
    const ItemName = oitemName;
    let MyItemName = ""; // 商品名稱
    console.log("這是ItemName：");
    oitemName.map((item) => {
      MyItemName += item + "<br></br>";
    });

    // 生成 CheckMacValue
    const input = `HashKey=${hashKey}&ChoosePayment=ALL&EncryptType=1&ItemName=Stock Shop Item x1&MerchantID=${MerchantID}&MerchantTradeDate=${MerchantTradeDate}&MerchantTradeNo=${MerchantTradeNo}&PaymentType=aio&ReturnURL=${ReturnURL}&TotalAmount=${TotalAmount}&TradeDesc=${TradeDesc}&HashIV=${hashIV}`;
    console.log("這是input：");
    console.log(input);
    const hash = crypto.createHash("sha256");
    hash.update(input);
    const CheckMacValue = hash.digest("hex").toUpperCase();
    console.log("這是CheckMacValue：");
    console.log(CheckMacValue);

    const orderData = [
      MerchantTradeNo,
      "u01",
      pid.toString(),
      MerchantTradeDate,
      TotalAmount,
      TradeDesc,
      ItemName.toString(),
      coupon,
    ];

    const url =
      "INSERT INTO `MyOrder`(`oid`, `uid`, `pid`, `MerchantTradeDate`, `TotalAmount`, `TradeDesc`, `ItemName`, `coupon`) VALUES (?)";
    db.query(url, [orderData], function (err, data) {
      if (err) {
        console.log(err);
        console.log("訂單儲存失敗");
      } else {
        console.log("訂單儲存成功");
        // res.send("訂單已送出");
      }
    });

    const params = {
      MerchantID: MerchantID,
      MerchantTradeNo: MerchantTradeNo, // 生成唯一的特店訂單編號
      MerchantTradeDate: MerchantTradeDate, // 特店交易時間
      PaymentType: "aio",
      TotalAmount: TotalAmount,
      TradeDesc: TradeDesc,
      ItemName: "Stock Shop Item x1",
      ReturnURL: ReturnURL,
      ChoosePayment: "ALL",
      EncryptType: "1",
      CheckMacValue,
    };

    axios
      .post(apiUrl, params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((response) => {
        res.send("成功" + response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (err) {
    console.log("接收失敗");
    console.log(err);
  }
});

app.listen(5567, () => {
  console.log("Shop 的 port 5567 連接完成 " + new Date().toLocaleTimeString());
});
