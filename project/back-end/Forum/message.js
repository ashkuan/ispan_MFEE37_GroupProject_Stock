import express from "express";
import cors from "cors";
import connToDBHelper from "../DB/DBconfig.js";
import bodyParser from "body-parser";
import moment from "moment";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("hi this is backend");
});

// 獲取留言
app.post("/messages/:faid", (req, res) => {
  const { faid } = req.params;
  const { uid } = req.body;
  console.log(uid);
  if (uid) {
    // 會員登入 出現所有所有留言
    const sql =
      " SELECT * FROM MessageContent LEFT JOIN login ON MessageContent.uid = login.uid  WHERE faid=?";
    connToDBHelper.query(sql, [faid], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "無法檢視留言" });
      }
      return res.json(data);
    });
  } else {
    // 如果會員未登入,限制返回前三條留言
    const sql =
      "SELECT * FROM MessageContent LEFT JOIN login ON MessageContent.uid = login.uid LIMIT 3";
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
app.post("/insertmessages/:faid", (req, res) => {
  // 修改為根據會員登入狀態來設定是否授權留言
  const { faid } = req.params;
  const { uid, fmContent } = req.body;
  console.log(faid);
  console.log(uid);
  console.log(fmContent);
  // 取得當前時間
  const createTime = moment().format("YYYY-MM-DD HH:mm:ss");
  // 檢查 uid 是否存在於 req.body
  if (!uid) {
    return res.status(400).json({ error: "缺少 uid" });
  }

  // 檢查是否有會員登入
  if (uid) {
    const sql =
      "INSERT INTO `MessageContent` (`faid`, `uid`, `fmContent`, `createTime`) VALUES (?, ?, ?, ?)";
    console.log(faid + uid + fmContent + createTime);
    // 將留言內容插入資料庫
    connToDBHelper.query(
      sql,
      [faid, uid, fmContent, createTime],
      (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "無法新增留言" });
        }
        console.log("留言儲存成功");
        return res.json({ success: true, message: "留言成功" });
      }
    );
  } else {
    // 會員未登入,返回錯誤訊息
    return res.status(401).json({ error: "未登入,無法成功留言" });
  }
});

// 編輯留言
app.post("/messages/edit/:fmid", (req, res) => {
  const { fmid } = req.params;
  const { fmContent } = req.body;
  // 檢查是否有登入會員
  // 根據登入狀態決定是否授權編輯留言
  const isAuthenticated = true;

  if (isAuthenticated) {
    const sql = "Update `MessageContent` SET `fmContent`=? WHERE `fmid`=?";
    connToDBHelper.query(sql, [fmContent, fmid], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "無法編輯留言" });
      }
      return res.status(500).json({ success: true, message: "留言編輯成功" });
    });
  } else {
    //會員未登入,返回錯誤訊息
    return res.status(401).json({ error: "未登入,無法編輯留言" });
  }
});

// 刪除留言
app.delete("/messages/delete/:fmid", (req, res) => {
  const { fmid } = req.params;
  // 檢查是否有登入會員
  // 根據登入狀態決定是否授權編輯留言
  const isAuthenticated = true;

  if (isAuthenticated) {
    const sql = "DELETE FROM `MessageContent` WHERE `fmid`=?";
    connToDBHelper.query(sql, [fmid], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "無法刪除留言" });
      }
      return res.status(200).json({ success: true, message: "留言刪除成功" });
    });
  } else {
    //會員未登入,返回錯誤訊息
    return res.status(401).json({ error: "未登入,無法刪除留言" });
  }
});

//留言按讚
app.put("/messages/:faid/like", (req, res) => {
  const updateSql = "UPDATE ForumArticle SET likedByUser = ? WHERE faid = ?";
  const values = req.body.likedByUser;
  const likeId = req.params.faid;

  connToDBHelper.query(updateSql, [values, likeId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "按讚更新失敗" });
    }

    console.log("按讚更新成功");

    const getTotalLikesSql =
      "SELECT likeCount, likedByUser, (likeCount + likedByUser) as totalLikes FROM ForumArticle WHERE faid = ?";
    connToDBHelper.query(getTotalLikesSql, [likeId], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "按讚加總更新失敗" });
      }

      const totalLikes = result[0].totalLikes || 0;
      console.log("總按讚數: " + totalLikes);

      // Update the totalLikes value in the ForumArticle table
      const updateTotalLikesSql =
        "UPDATE ForumArticle SET totalLikes = ? WHERE faid = ?";
      connToDBHelper.query(
        updateTotalLikesSql,
        [totalLikes, likeId],
        (err, data) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: "總按讚數更新失敗" });
          }

          console.log("總按讚數更新成功");

          return res.json({ totalLikes });
        }
      );
    });
  });
});

app.listen(5052, () => {
  console.log("5052 留言開始" + new Date().toLocaleTimeString());
});
