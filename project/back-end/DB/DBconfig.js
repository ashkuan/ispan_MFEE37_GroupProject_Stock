import mysql from "mysql";
import express from "express";

var app = express();

var connToDBHelper = mysql.createConnection({
  port: "3306",
  host: "127.0.0.1",
  user: "allyoucan1t",
  password: "allyoucaneat",
  database: "MFEE37",
});

connToDBHelper.connect((err) => {
  if (err) {
    console.log("連接失敗" + err);
    console.log(err instanceof AggregateError);
    console.log(err.errors);
    console.log(err.message);
    console.log(err.stack);
  } else {
    console.log("資料庫連接成功");
  }
});

// app.listen(3000, () => {
//   console.log("port 3000連接完成" + new Date().toLocaleTimeString());
// });

// 給其他檔案連結DB
export default connToDBHelper;
