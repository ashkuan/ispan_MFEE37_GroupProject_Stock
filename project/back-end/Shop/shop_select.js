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

app.post("/cart/edit", function (req, res) {
  const items = req.body.data;
  console.log("這是items");
  console.log(items);
  const updateValues = Object.entries(items).map(([pid, paccount]) => [
    pid,
    paccount,
  ]);
  db.query(
    "INSERT INTO Cart (pid, paccount) VALUES ? ON DUPLICATE KEY UPDATE paccount = VALUES(paccount)",
    [updateValues],
    function (err, data) {
      if (err) {
        console.error("購物車儲存失敗:", err);
      } else {
        console.log("購物車儲存成功");
      }
    }
  );
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

app.listen(5566, () => {
  console.log("Shop 的 port 5566 連接完成 " + new Date().toLocaleTimeString());
});
