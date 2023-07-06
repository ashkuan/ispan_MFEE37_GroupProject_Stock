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
  const cartItems = req.body.data;
  // 過濾為0的pid, 減少資料庫的更動
  const filteredItems = Object.entries(cartItems);
  // .filter(
  //   ([pid, paccount]) => paccount !== 0
  // );
  const VALUES = filteredItems.map(([pid, paccount]) => [pid, paccount]);
  console.log(VALUES);

  db.query(
    "INSERT INTO Cart (pid, paccount) VALUES ? ON DUPLICATE KEY UPDATE paccount = VALUES(paccount)",
    [VALUES],
    function (err, data) {
      if (err) {
        console.error("資料庫新增失敗:", err);
      } else {
        console.log("資料庫新增成功");
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Shop 的 port 3000 連接完成 " + new Date().toLocaleTimeString());
});
