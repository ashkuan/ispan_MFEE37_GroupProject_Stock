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
    "INSERT INTO `ForumArticle`( `fatitle`, `farticle`, `faimage`, `faid`, `fboard`,`createTime`,`fhashtag`) VALUES (?)";

  const createTime = moment().format("YYYY-MM-DD HH:mm:ss");

  const values = [
    req.body.fatitle,
    req.body.farticle,
    file ? file.filename : "",
    req.body.faid,
    req.body.fboard,
    createTime,
    req.body.fhashtag,
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

app.get("/posts", (req, res) => {
  const sql =
    "SELECT `faid`,  `fatitle`, `farticle`, `faimage`, `likeCount`, `fboard`, `fhashtag`, `createTime`, `updateTime` FROM `ForumArticle` ";
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
    "SELECT `fatitle`, `farticle`, `faimage`, `likeCount`, `fboard`, `fhashtag`, `createTime` FROM ForumArticle where `faid` = ?";
  connToDBHelper.query(sql, [req.body.faid], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      return res.json(data);
    }
  });
});

//獲取按讚狀態
app.get("/posts/likeCount", (req, res) => {
  const sql = "SELECT likeCount FROM ForumArticle ";
  connToDBHelper.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      const likeCount = data[0].likeCount;
      return res.json({ likeCount });
    }
  });
});

//更新按讚狀態
app.post("/posts/like", (req, res) => {
  const { likeCount } = req.body;
  const getSql = "SELECT likeCount FROM ForumArticle  ";
  connToDBHelper.query(getSql, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      const currentLikeCount = data[0].likeCount;
      const newLikeCount = currentLikeCount + likeCount;
      const updateSql = "UPDATE ForumArticle SET likeCount = ?";
      const values = [newLikeCount];
      connToDBHelper.query(updateSql, values, (err, data) => {
        if (err) {
          console.log(err);
          return res.json(err);
        } else {
          console.log("Like 更新成功");
          return res.json("Like 更新成功");
        }
      });
    }
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

app.listen(5789, () => {
  console.log("5789 post發文開始" + new Date().toLocaleTimeString());
});

// import express from "express";
// import cors from "cors";
// import connToDBHelper from "../DB/DBconfig.js";
// import bodyParser from "body-parser";
// import multer from "multer";
// import moment from "moment";
// import path from "path";
// import fs from "fs";

// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.json("hi this is backend");
// });

// app.post("/posts", (req, res) => {
//   const sql = "SELECT * FROM `ForumArticle` ";
//   connToDBHelper.query(sql, (err, data) => {
//     if (err) {
//       return res.json(err);
//     } else {
//       return res.json(data);
//     }
//   });
// });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "img");
//   },
//   filename: (req, file, cb) => {
//     const fileName =
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname);
//     cb(null, fileName);
//   },
// });

// app.post("/posts", multer({ storage }).single("faimage"), (req, res) => {
//   // console.log(" ----------------------------------------")
//   // console.log(req.body)
//   // console.log(" ----------------------------------------")
//   const file = req.file;
//   const sql =
//     "INSERT INTO `ForumArticle`( `fatitle`, `farticle`, `faimage`, `faid`, `fboard`,`createTime`,`fhashtag`) VALUES (?)";

//   const createTime = moment().format("YYYY-MM-DD HH:mm:ss");

//   const values = [
//     req.body.fatitle,
//     req.body.farticle,
//     file ? file.filename : "",
//     req.body.faid,
//     req.body.fboard,
//     createTime,
//     req.body.fhashtag,
//   ];
//   connToDBHelper.query(sql, [values], (err, data) => {
//     if (err) {
//       console.log(err);
//       if (file) {
//         fs.unlinkSync(file.path); // 如果有上傳圖片刪除臨時檔案
//       }
//       return res.json(err);
//     } else {
//       console.log("上傳成功");
//       return res.json("上傳成功");
//     }
//   });
// });

// app.get("/posts/likeCount", (req, res) => {
//   const sql = "SELECT likeCount FROM ForumArticle WHERE faid = 'c0eedb53-61ea-95d9-1b8d-8ee4798e7ed4'";
//   connToDBHelper.query(sql, (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.json(err);
//     } else {
//       const likeCount = data[0].likeCount;
//       return res.json({ likeCount });
//     }
//   });
// });

// app.post("/posts/like", (req, res) => {
//   // 從 req.body 中獲取相關資料，例如按讚數量等
//   const { likeCount } = req.body;
//    // 先從資料庫取得當前的 likeCount
//   const getSql = "SELECT likeCount FROM ForumArticle WHERE faid = 'c0eedb53-61ea-95d9-1b8d-8ee4798e7ed4'";
//   connToDBHelper.query(getSql, (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.json(err);
//     } else {
//       // 從資料庫取得的 likeCount
//       const currentLikeCount = data[0].likeCount;
//        // 根據前端傳過來的 likeCount 進行增減
//       const newLikeCount = currentLikeCount + likeCount;
//        // 更新 likeCount 欄位
//       const updateSql = "UPDATE ForumArticle SET likeCount = ? WHERE faid = 'c0eedb53-61ea-95d9-1b8d-8ee4798e7ed4'";
//       const values = [newLikeCount];
//        connToDBHelper.query(updateSql, values, (err, data) => {
//         if (err) {
//           console.log(err);
//           return res.json(err);
//         } else {
//           console.log("Like 更新成功");
//           return res.json("Like 更新成功");
//         }
//       });
//     }
//   });
// });

// app.listen(3000, () => {
//   console.log("3000 post發文開始" + new Date().toLocaleTimeString());
// });
