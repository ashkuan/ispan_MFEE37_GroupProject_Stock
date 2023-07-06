import express from "express";
import cors from "cors";
import db from "../DB/DBconfig.js";
var app = express();
app.use(cors());
app.use(express.json()); // 將接收到的JSON格式的資料轉換為JS物件

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

app.get("/cart", function (req, res) {
  db.query("SELECT * FROM Cart", [], function (err, data) {
    if (err) {
      return "查無資料";
    } else {
      return res.json(data);
    }
  });
});

app.get("/checkout"),
  function (req, res) {
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
  };

app.listen(3000, () => {
  console.log("Shop 的 port 3000 連接完成 " + new Date().toLocaleTimeString());
});
