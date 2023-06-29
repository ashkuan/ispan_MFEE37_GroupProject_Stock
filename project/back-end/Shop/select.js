import express from "express";
import cors from "cors";
import connToDBHelper from "../DB/DBconfig.js";
var app = express();

app.use(cors());

app.get("/", function (req, res) {
  res.send("連接成功");
});

app.get("/shop", function (req, res) {
  connToDBHelper.query("SELECT * FROM Shop", [], function (err, data) {
    if (err) {
      console.log("查無資料");
    } else {
      return res.json(data);
    }
  });
});

app.listen(3000, () => {
  console.log("port 3000連接完成" + new Date().toLocaleTimeString());
});

// 讓外界可以使用路由
// export default Select;
