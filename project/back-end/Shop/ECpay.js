import express from "express";
import axios from "axios";
import db from "../DB/DBconfig.js";

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
const oid = Math.floor(Math.random() * 1000000000).toString();
console.log("這是訂單編號：" + oid);

const merchantID = "3002607"; // 特店編號
const hashKey = "pwFHCqoQZGmho4w6";
const hashIV = "EkRm7iFT261dpevs";
const apiUrl = "https://payment.greenworld.com.tw/Cashier/AioCheckOut/V5";

const merchantTradeNo = oid; // 特店訂單編號
const merchantTradeDate = formatDateTime(new Date()); // 特店交易時間
console.log("這是訂單成立時間：" + merchantTradeDate);
const paymentType = "aio"; // 交易類型
const tradeDesc = "Payment for Order"; // 交易描述
const itemName = "Product Name"; // 商品名稱
const returnURL = "https://example.com/return"; // 付款完成通知回傳網址
const choosePayment = "ALL"; // 選擇預設付款方式
const checkMacValue = "CHECK_MAC_VALUE"; // 檢查碼
const encryptType = 1; // CheckMacValue加密類型
// const storeID = "STORE_ID"; // 特店旗下店舖代號
const clientBackURL = "https://example.com/back"; // Client端返回特店的按鈕連結
const itemURL = "https://example.com/product"; // 商品銷售網址
const remark = "Additional remarks"; // 備註欄位
const chooseSubPayment = ""; // 付款子項目
const orderResultURL = "https://example.com/result"; // Client端回傳付款結果網址
const needExtraPaidInfo = "N"; // 是否需要額外的付款資訊

// const params = {
//   MerchantID: merchantID,
//   MerchantTradeNo: merchantTradeNo,
//   MerchantTradeDate: merchantTradeDate,
//   PaymentType: paymentType,
//   TotalAmount: totalAmount,
//   TradeDesc: tradeDesc,
//   ItemName: itemName,
//   ReturnURL: returnURL,
//   ChoosePayment: choosePayment,
//   CheckMacValue: checkMacValue,
//   EncryptType: encryptType,
//   StoreID: storeID,
//   ClientBackURL: clientBackURL,
//   ItemURL: itemURL,
//   Remark: remark,
//   ChooseSubPayment: chooseSubPayment,
//   OrderResultURL: orderResultURL,
//   NeedExtraPaidInfo: needExtraPaidInfo,
// };

app.post("/sendOrder", async (req, res) => {
  try {
    const {
      email,
      LogisticsType,
      message,
      pid,
      oitemName,
      coupon,
      totalAmount,
    } = req.body;

    const TotalAmount = totalAmount.slice(4, totalAmount.length);
    // console.log(totalAmount2);

    const orderData = [
      oid,
      "u01",
      pid.toString(),
      merchantTradeDate,
      TotalAmount,
      message,
      oitemName.toString(),
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
        res.send("訂單已送出");
      }
    });
  } catch (err) {
    console.log("接收失敗");
    console.log(err);
    res.send(err);
  }
});

// app.post("/checkout", async (req, res) => {
//   try {
//     const { amount, orderId, redirectUrl } = req.body;

//     // 构建支付参数
//     const paymentParams = {
//       MerchantID: merchantID,
//       MerchantTradeNo: orderId,
//       MerchantTradeDate: new Date()
//         .toISOString()
//         .slice(0, 19)
//         .replace("T", " "),
//       PaymentType: "aio",
//       TotalAmount: amount,
//       TradeDesc: "Payment for Order",
//       ItemName: "Order Item",
//       ReturnURL: redirectUrl,
//       ChoosePayment: "Credit",
//       ClientBackURL: redirectUrl,
//     }; // 生成 CheckMacValue
//     const checkMacValue = generateCheckMacValue(paymentParams);

//     // 添加 CheckMacValue 到支付参数中
//     paymentParams.CheckMacValue = checkMacValue;

//     // 发送支付请求
//     const response = await axios.post(apiUrl, qs.stringify(paymentParams), {
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     });

//     // 将綠界支付 API 的响应返回给前端
//     res.send(response.data);
//   } catch (error) {
//     console.error("Payment failed:", error);
//     res.status(500).send("Payment failed");
//   }
// });

// axios
//   .post(apiUrl, qs.stringify(params), {
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//   })
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

app.listen(5567, () => {
  console.log("Shop 的 port 5567 連接完成 " + new Date().toLocaleTimeString());
});
