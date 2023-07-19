import express from "express";
import cors from "cors";
import connToDBHelper from "../DB/DBconfig.js";
import bodyParser from "body-parser";

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("hi this is backend");
});

// 獲取留言
app.get("/messages/:faid", (req, res) => {
  const { faid } = req.params;
  // 假設會員未登入 狀態為False
  const isAuthenticated = true;
  if (isAuthenticated) {
    // 會員登入 出現所有所有留言
    const sql = "SELECT * FROM `MessageContent` WHERE faid=?";
    connToDBHelper.query(sql, [faid], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "無法檢視留言" });
      }
      return res.json(data);
    });
  } else {
    // 如果會員未登入,限制返回前三條留言
    const sql = "SELECT * FROM MessageContent LIMIT 3";
    connToDBHelper.query(sql, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "無法檢視留言" });
      }
      return res.json(data);
    });
  }
});

// 處理留言
app.post("/messages/:faid", (req, res) => {
  const isAuthenticated = false;
  const { faid } = req.params;
  const { fmContent } = req.body;
  const sql = "INSERT INTO MessageContent (faid,fmContent) VALUES (?,?)";
  // 將留言內容插入資料庫
  connToDBHelper.query(sql, [faid, fmContent], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "無法新增留言" });
    }
  });
});

app.listen(5052, () => {
  console.log("5052 留言開始" + new Date().toLocaleTimeString());
});
