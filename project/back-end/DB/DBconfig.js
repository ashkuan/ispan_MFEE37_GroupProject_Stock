import mysql from "mysql";
// import express from "express";
// var app = express();

var db = mysql.createConnection({
  port: "3306",
  host: "127.0.0.1",
  user: "allyoucan1t",
  password: "allyoucaneat",
  database: "MFEE37",
});

// 連接資料庫
db.connect((err) => {
  if (err) {
    console.log("資料庫連接失敗" + err);
    console.log(err instanceof AggregateError);
    console.log(err.errors);
    console.log(err.message);
    console.log(err.stack);
  } else {
    console.log("資料庫連接成功");
  }
});

// 測試用 實際上這行要放在其他js檔案
// app.listen(3000, () => {
//   console.log("port 3000連接完成" + new Date().toLocaleTimeString());
// });

// 給其他檔案連結DB
export default db;
