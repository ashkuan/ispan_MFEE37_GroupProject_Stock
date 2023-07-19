import express from "express";
import cors from "cors";
import db from "../DB/DBconfig.js";
import { chownSync } from "fs";

var app = express();
app.use(cors());
app.use(express.json()); // 將接收到的JSON格式的資料轉換為JS物件
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("select連接成功");
});

app.get("/shop", function (req, res) {
  db.query("SELECT * FROM Shop", [], function (err, data) {
    if (err) {
      return "查無資料";
    } else {
      return res.json(data);
    }
  });
});

let myuid = "";
app.post("/postUid", function (req, res) {
  const { uid } = req.body;
  myuid = uid.toString();
  console.log(myuid);
  console.log("This is myUid from /postUid:" + myuid);
});

app.get("/cart", function (req, res) {
  console.log("This is myUid from /cart:" + myuid);
  db.query("SELECT * FROM Cart Where uid = (?)", [myuid], function (err, data) {
    if (err) {
      return "查無資料";
    } else {
      return res.json(data);
    }
  });
});

app.post("/cart/edit", function (req, res) {
  if (myuid) {
    console.log(myuid);
    const items = req.body.data;
    console.log("這是items");
    console.log(items);
    const updateValues = Object.entries(items).map(([pid, paccount]) => [
      myuid + pid,
      pid,
      paccount,
    ]);
    console.log(updateValues);
    db.query(
      `INSERT INTO Cart (uid, uidpid, pid, paccount) VALUES ? ON DUPLICATE KEY UPDATE paccount = VALUES(paccount)`,
      [updateValues.map((values) => [myuid, ...values])],
      function (err) {
        if (err) {
          console.error("購物車儲存失敗:", err);
        } else {
          console.log("購物車儲存成功");
        }
      }
    );
  }
});

app.get("/checkout", function (req, res) {
  db.query(
    "SELECT Shop.pname, Shop.pimage, Shop.pprice, Shop.pdesc FROM Cart JOIN Shop ON Cart.pid = Shop.pid WHERE Cart.pid = ?",
    [],
    function (err, data) {
      if (err) {
        return "查無資料";
      } else {
        console.log(json(data));
      }
    }
  );
});

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
        // res.redirect("http://localhost:5173/shop/orderSuccess");
      }
    });
    const deleteurl = "DELETE FROM `Cart` WHERE uid = ?";
    db.query(deleteurl, [uid], function (err, data) {
      if (err) {
        console.log(err);
        console.log("購物車刪除失敗");
      } else {
        console.log("購物車已經清空");
      }
    });
  } catch (err) {
    console.log("接收失敗");
    console.log(err);
  }
});

app.listen(5566, () => {
  console.log("Shop 的 port 5566 連接完成 " + new Date().toLocaleTimeString());
});
