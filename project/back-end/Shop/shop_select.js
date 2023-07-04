// 不可更改 !!!!!!!!!!!!!

import express from "express";
import cors from "cors";
import db from "../DB/DBconfig.js";
var app = express();

app.use(cors());

app.get("/", function (req, res) {
  res.send("連接成功");
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

app.listen(3000, () => {
  console.log("port 3000連接完成" + new Date().toLocaleTimeString());
});
