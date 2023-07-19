import express from "express";
import cors from "cors";
import connToDBHelper from "../DB/DBconfig.js";
import bodyParser from "body-parser";
import moment from "moment";

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
  const isAuthenticated = true; // 修改為根據會員登入狀態來設定是否授權留言
  const { faid } = req.params;
  const { uid, fmContent } = req.body;
  const createTime = moment().format("YYYY-MM-DD HH:mm:ss"); // 取得當前時間
  // 檢查 uid 是否存在於 req.body
  if (!uid) {
    return res.status(400).json({ error: "缺少 uid" });
  }

  // 檢查是否有會員登入
  if (isAuthenticated) {
    const sql =
      "INSERT INTO `MessageContent` (`faid`, `uid`, `fmContent`, `createTime`) VALUES (?, ?, ?, ?)";
    console.log(faid + uid + fmContent + createTime);
    // 將留言內容插入資料庫
    connToDBHelper.query(
      sql,
      [faid, req.body.uid, fmContent, createTime],
      (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "無法新增留言" });
        }
        return res.json({ success: true, message: "留言成功" });
      }
    );
  } else {
    // 會員未登入,返回錯誤訊息
    return res.status(401).json({ error: "未登入,無法成功留言" });
  }
});

app.listen(5052, () => {
  console.log("5052 留言開始" + new Date().toLocaleTimeString());
});
