import express from "express";
import cors from "cors";
import db from "../DB/DBconfig.js";
import axios from "axios";

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
    // console.log(updateValues);
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

    const res = await axios.post("/shop/orderSuccess", {
      oid,
    });
    res.json(response);
  } catch (err) {
    console.log("接收失敗");
    console.log(err);
  }
});

app.get("/shop/history", async (req, res) => {
  console.log("這是歷史訂單的uid");
  console.log(myuid);
  const url = "SELECT * FROM `MyOrder` WHERE uid = ?";
  db.query(url, [myuid], function (err, data) {
    if (err) {
      return "查無資料";
    } else {
      // console.log(data);
      // console.log(res.data);
      return res.json(data);
    }
  });
});

app.post("/shop/history/firstPid", async (req, res) => {
  const { firstPid } = req.body;
  const url = "SELECT pimage1,pname FROM Shop WHERE pid = ?";
  db.query(url, [firstPid], function (err, data) {
    if (err) {
      console.log("firstPid資料獲取失敗");
      console.log(err);
    } else {
      // console.log(data);
      return res.json(data);
    }
  });
});

app.post("/shop/history/uidPhoto", async (req, res) => {
  const { uid } = req.body;
  const url = "SELECT * FROM login WHERE uid =?";
  db.query(url, [uid], function (err, data) {
    if (err) {
      console.log(err);
    } else {
      // console.log(data);
      return res.json(data);
    }
  });
});

app.post("/shop/history/countHistoryData", async (req, res) => {
  const { uid } = req.body;
  const url = "SELECT COUNT(oid) FROM MyOrder WHERE uid=?";
  db.query(url, [uid], function (err, data) {
    if (err) {
      console.log(err);
    } else {
      // console.log(data);
      return res.json(data);
    }
  });
});

app.get("/coupon", async (req, res) => {
  try {
    db.query("SELECT code,discount FROM coupon", function (err, data) {
      if (err) {
        console.log("coupon資料獲取失敗");
        console.log(err);
      } else {
        // console.log("這是coupon");
        // console.log(data);
        return res.json(data);
      }
    });
  } catch (err) {
    console.log("coupon資料傳送失敗");
    console.log(err);
  }
});

app.post("/shop/historyIndOrder", async (req, res) => {
  const { URLoid } = req.body;
  console.log(URLoid);
  const url = "SELECT * FROM MyOrder WHERE oid=?";
  db.query(url, [URLoid], function (err, data) {
    if (err) {
      console.log("獲取歷史個別訂單失敗");
      console.log(err);
    } else {
      // console.log(data);
      return res.json(data);
    }
  });
});

app.post("/shop/historyIndProducts", async (req, res) => {
  const { pid } = req.body;
  const url = "SELECT * FROM Shop WHERE pid = ?";
  db.query(url, [pid], function (err, data) {
    if (err) {
      console.log("商品資料獲取失敗");
      console.log(err);
    } else {
      // console.log(data);
      return res.json(data);
    }
  });
});

app.listen(5566, () => {
  console.log("Shop 的 port 5566 連接完成 " + new Date().toLocaleTimeString());
});
