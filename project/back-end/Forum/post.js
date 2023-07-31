import express from "express";
import cors from "cors";
import connToDBHelper from "../DB/DBconfig.js";
import bodyParser from "body-parser";
import multer from "multer";
import moment from "moment";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("hi this is backend");
});

//上傳圖片為path
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "img");
  },
  filename: (req, file, cb) => {
    const fileName =
      file.fieldname + "_" + Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "img")));

//發文
app.post("/posts", multer({ storage }).single("faimage"), (req, res) => {
  const file = req.file;
  const sql =
    "INSERT INTO `ForumArticle`(`uid`,`userimg`, `fatitle`, `farticle`, `faimage`, `faid`, `fboard`,`createTime`,`fhashtag`,`likeCount`, `likedByUser`,`totalLikes`) VALUES (?)";

  const createTime = moment().format("YYYY-MM-DD HH:mm:ss");

  const values = [
    req.body.uid,
    req.body.userimg,
    req.body.fatitle,
    req.body.farticle,
    file ? file.filename : "",
    req.body.faid,
    req.body.fboard,
    createTime,
    req.body.fhashtag,
    0,
    0,
    0,
  ];
  connToDBHelper.query(sql, [values], (err, data) => {
    if (err) {
      console.log(err);
      if (file) {
        fs.unlinkSync(file.path);
      }
      return res.json(err);
    } else {
      console.log("上傳成功");
      return res.json("上傳成功");
    }
  });
});

//選擇文章
app.get("/posts", (req, res) => {
  const sql =
    "SELECT * FROM `ForumArticle` inner join  login on ForumArticle.uid = login.uid";
  connToDBHelper.query(sql, [], (err, data) => {
    if (err) {
      return "無法成功顯示發文";
    } else {
      return res.json(data);
    }
  });
});

//選擇最新文章
app.get("/posts/new", (req, res) => {
  const sql =
    "SELECT ForumArticle.*, login.*, COUNT(MessageContent.faid) AS fmContentCount " +
    "FROM ForumArticle " +
    "LEFT JOIN login ON ForumArticle.uid = login.uid " +
    "LEFT JOIN MessageContent ON ForumArticle.faid = MessageContent.faid " +
    "GROUP BY ForumArticle.faid " +
    "ORDER BY createTime DESC";
  connToDBHelper.query(sql, [], (err, data) => {
    if (err) {
      return "無法成功顯示發文";
    } else {
      return res.json(data);
    }
  });
});

//選擇熱門文章
app.get("/posts/popular", (req, res) => {
  const sql =
    "SELECT ForumArticle.*, login.*, COUNT(MessageContent.faid) AS fmContentCount " +
    "FROM ForumArticle " +
    "LEFT JOIN login ON ForumArticle.uid = login.uid " +
    "LEFT JOIN MessageContent ON ForumArticle.faid = MessageContent.faid " +
    "GROUP BY ForumArticle.faid " +
    "ORDER BY totalLikes DESC";
  connToDBHelper.query(sql, [], (err, data) => {
    if (err) {
      return "無法成功顯示發文";
    } else {
      return res.json(data);
    }
  });
});

//選擇收藏文章
app.get("/posts/keep", (req, res) => {
  const sql =
    "SELECT ForumArticle.*, login.*, COUNT(MessageContent.faid) AS fmContentCount " +
    "FROM ForumArticle " +
    "LEFT JOIN login ON ForumArticle.uid = login.uid " +
    "LEFT JOIN MessageContent ON ForumArticle.faid = MessageContent.faid " +
    "WHERE ForumArticle.collect = 1 " + // 加入條件 where collect = 1
    "GROUP BY ForumArticle.faid " +
    "ORDER BY ForumArticle.updateTime DESC"; // 根據 updateTime 進行遞減排序
  connToDBHelper.query(sql, [], (err, data) => {
    if (err) {
      return "無法成功顯示發文";
    } else {
      return res.json(data);
    }
  });
});

//抓文章id
app.post("/getFaid", (req, res) => {
  const sql =
    "SELECT ForumArticle.*, login.name FROM ForumArticle LEFT JOIN login ON ForumArticle.uid = login.uid WHERE ForumArticle.faid = ?";
  connToDBHelper.query(sql, [req.body.faid], (err, data) => {
    if (err) {
      console.log("faid抓取不到" + err);
    } else {
      // console.log(data)
      return res.json(data);
    }
  });
});

app.put("/posts/:faid/like", (req, res) => {
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

//收藏
app.put("/collect/:faid", (req, res) => {
  const sql = "UPDATE `ForumArticle` SET `collect` = ? WHERE `faid` = ?";
  const values = req.body.collects;
  const collectId = req.body.faid;
  console.log("有沒有" + values);
  console.log("有沒有collect" + collectId);
  connToDBHelper.query(sql, [values, collectId], (err, data) => {
    if (err) {
      console.log(err);
    }

    console.log("keep更新成功");
    return res.json("更新成功");
  });
});

// 獲取留言
app.get("/messages", (req, res) => {
  // 假設會員未登入 狀態為False
  const isAuthenticated = false;
  if (isAuthenticated) {
    // 會員登入 出現所有所有留言
    const sql = "SELECT * FROM `MessageContent`";
    connToDBHelper.query(sql, (err, data) => {
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
app.post("/messages", (req, res) => {
  const isAuthenticated = false;
  const { fmContent } = req.body;
  const sql = "INSERT INTO MessageContent (fmContent) VALUES (?)";
  // 將留言內容插入資料庫
  connToDBHelper.query(sql, [fmContent], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "無法新增留言" });
    }
  });
  if (isAuthenticated) {
    // 如果會員已登入,將留言存到資料庫
    const message = req.body.message;
    return res.json({ success: true, message: "留言成功" });
  } else {
    // 會員未登入,返回錯誤訊息
    return res.status(401).json({ error: "未登入,無法成功留言" });
  }
});

//閒聊
app.get("/chats", (req, res) => {
  const sql =
    "SELECT ForumArticle.*, login.*, COUNT(MessageContent.faid) AS fmContentCount " +
    "FROM ForumArticle " +
    "LEFT JOIN login ON ForumArticle.uid = login.uid " +
    "LEFT JOIN MessageContent ON ForumArticle.faid = MessageContent.faid " +
    "WHERE ForumArticle.fboard = '閒聊'" +
    "GROUP BY ForumArticle.faid " +
    "ORDER BY ForumArticle.updateTime DESC";
  connToDBHelper.query(sql, (err, data) => {
    if (err) {
      return "閒聊版連接錯誤";
    } else {
      return res.json(data);
    }
  });
});

//新聞
app.get("/news", (req, res) => {
  const sql =
    "SELECT ForumArticle.*, login.*, COUNT(MessageContent.faid) AS fmContentCount " +
    "FROM ForumArticle " +
    "LEFT JOIN login ON ForumArticle.uid = login.uid " +
    "LEFT JOIN MessageContent ON ForumArticle.faid = MessageContent.faid " +
    "WHERE ForumArticle.fboard = '新聞'" +
    "GROUP BY ForumArticle.faid " +
    "ORDER BY ForumArticle.updateTime DESC";
  connToDBHelper.query(sql, (err, data) => {
    if (err) {
      return "新聞版連接錯誤";
    } else {
      return res.json(data);
    }
  });
});

//標的
app.get("/targets", (req, res) => {
  const sql =
    "SELECT ForumArticle.*, login.*, COUNT(MessageContent.faid) AS fmContentCount " +
    "FROM ForumArticle " +
    "LEFT JOIN login ON ForumArticle.uid = login.uid " +
    "LEFT JOIN MessageContent ON ForumArticle.faid = MessageContent.faid " +
    "WHERE ForumArticle.fboard = '標的'" +
    "GROUP BY ForumArticle.faid " +
    "ORDER BY ForumArticle.updateTime DESC";
  connToDBHelper.query(sql, (err, data) => {
    if (err) {
      return "標的版連接錯誤";
    } else {
      return res.json(data);
    }
  });
});

//請益
app.get("/questions", (req, res) => {
  const sql =
    "SELECT ForumArticle.*, login.*, COUNT(MessageContent.faid) AS fmContentCount " +
    "FROM ForumArticle " +
    "LEFT JOIN login ON ForumArticle.uid = login.uid " +
    "LEFT JOIN MessageContent ON ForumArticle.faid = MessageContent.faid " +
    "WHERE ForumArticle.fboard = '請益'" +
    "GROUP BY ForumArticle.faid " +
    "ORDER BY ForumArticle.updateTime DESC";
  connToDBHelper.query(sql, (err, data) => {
    if (err) {
      return "請益版連接錯誤";
    } else {
      return res.json(data);
    }
  });
});

//標籤雲
app.get("/tags", (req, res) => {
  const sql =
    "SELECT fhashtag, COUNT(*) AS count FROM ForumArticle GROUP BY fhashtag";
  connToDBHelper.query(sql, [], (err, data) => {
    if (err) {
      return "標籤雲後端失敗";
    } else {
      return res.json(data);
    }
  });
});

app.listen(5789, () => {
  console.log("5789 post發文開始" + new Date().toLocaleTimeString());
});
