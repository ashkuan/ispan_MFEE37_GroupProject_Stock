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
    // "INSERT INTO `ForumArticle`(`uid`, `fatitle`, `farticle`, `faimage`, `faid`, `fboard`,`createTime`,`fhashtag`,`collect`) VALUES (?)";
    "INSERT INTO `ForumArticle`(`uid`,`userimg`, `fatitle`, `farticle`, `faimage`, `faid`, `fboard`,`createTime`,`fhashtag`,`collect`,`totalLikes`) VALUES (?)";

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
    req.body.collect,
    (req.body.totalLikes = 0),
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
    // "SELECT `faid`,  `fatitle`, `farticle`, `faimage`, `likeCount`, `fboard`, `fhashtag`, `createTime`, `updateTime` FROM `ForumArticle` innerjoin  ";
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
    // "SELECT `faid`,  `fatitle`, `farticle`, `faimage`, `likeCount`, `fboard`, `fhashtag`, `createTime`, `updateTime` FROM `ForumArticle` innerjoin  ";
    "SELECT * FROM `ForumArticle` LEFT JOIN  login on ForumArticle.uid = login.uid ORDER BY `createTime` DESC";
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
    // "SELECT `faid`,  `fatitle`, `farticle`, `faimage`, `likeCount`, `fboard`, `fhashtag`, `createTime`, `updateTime` FROM `ForumArticle` innerjoin  ";
    // "SELECT *FROM `ForumArticle`ORDER BY `likeCount` DESC ";
    "SELECT *FROM `ForumArticle`LEFT JOIN `login` ON `ForumArticle`.`uid` = `login`.`uid`ORDER BY `totalLikes` DESC";
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
    "SELECT *FROM `ForumArticle`LEFT JOIN `login` ON `ForumArticle`.`uid` = `login`.`uid` where `collect` = 1 order by `updateTime`DESC";
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
  // "SELECT `fatitle`, `farticle`, `faimage`, `likeCount`, `fboard`, `fhashtag`, `createTime` FROM ForumArticle where `faid` = ?";
  connToDBHelper.query(sql, [req.body.faid], (err, data) => {
    if (err) {
      console.log("faid一直錯一直爽" + err);
    } else {
      // console.log(data)
      return res.json(data);
    }
  });
});

// 獲取文章按讚數和使用者按讚狀態
// app.get("/posts/:faid", (req, res) => {
//   const faid = req.params.faid;
//   const sql = "SELECT likeCount, likedByUser FROM ForumArticle WHERE faid = ?";
//   connToDBHelper.query(sql, [faid], (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.json(err);
//     } else {
//       return res.json(data[0]);
//     }
//   });
// });

// 更新使用者對文章的按讚狀態和愛心數
// app.put("/posts/:faid/like", (req, res) => {
//   const faid = req.body.faid;
//   const likedByUser = req.body.likedByUser;

//   // 更新使用者按讚狀態
//   const updateLikeSql =
//     "UPDATE ForumArticle SET likedByUser = ? WHERE faid = ?";
//   connToDBHelper.query(updateLikeSql, [likedByUser, faid], (err, data) => {
//     if (err) {
//       console.log("按讚狀態更新失敗"+err);
//       // return res.status(500).json({ error: "按讚狀態更新失敗" });
//     }else{
//       console.log("按讚狀態成功");
//       return res.json(data);

//     }

//     // 更新愛心數
//     const updateLikeCountSql =
//       "UPDATE ForumArticle SET totalLikes = likeCount + likedByUser WHERE faid = ?";
//     connToDBHelper.query(updateLikeCountSql,  (err, data) => {
//       if (err) {
//         console.log(err);
//         return res.status(500).json({ error: "愛心數更新失敗" });
//       }

//     });
//   });
// });

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

    // Recalculate the total likes for the article
    const getTotalLikesSql = "SELECT likeCount, likedByUser, (likeCount + likedByUser) as totalLikes FROM ForumArticle WHERE faid = ?";
    connToDBHelper.query(getTotalLikesSql, [likeId], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "按讚加總更新失敗" });
      }

      const totalLikes = result[0].totalLikes || 0;
      console.log("總按讚數: " + totalLikes);

      // Update the totalLikes value in the ForumArticle table
      const updateTotalLikesSql = "UPDATE ForumArticle SET totalLikes = ? WHERE faid = ?";
      connToDBHelper.query(updateTotalLikesSql, [totalLikes, likeId], (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "總按讚數更新失敗" });
        }

        console.log("總按讚數更新成功");

        return res.json({ totalLikes });
      });
    });
  });
});





// //收藏存入
// app.put("/posts/:faid/like", (req, res) => {
//   const updateSql = "UPDATE ForumArticle SET likedByUser = ? WHERE faid = ?";
//   const values = req.body.likedByUser;
//   const likeId = req.params.faid;

//   connToDBHelper.query(updateSql, [values, likeId], (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({ error: "按讚更新失敗" });
//     }

//     console.log("按讚更新成功");

//     // Recalculate the total likes for the article
//     const getTotalLikesSql = "SELECT likeCount, likedByUser, (likeCount + likedByUser) as totalLikes FROM ForumArticle WHERE faid = ?";
//     connToDBHelper.query(getTotalLikesSql, [likeId], (err, result) => {
//       if (err) {
//         console.log(err);
//         return res.status(500).json({ error: "按讚加總更新失敗" });
//       }

//       const totalLikes = result[0].totalLikes || 0;
//       console.log("總按讚數: " + totalLikes);

//       // Update the totalLikes value in the ForumArticle table
//       const updateTotalLikesSql = "UPDATE ForumArticle SET totalLikes = ? WHERE faid = ?";
//       connToDBHelper.query(updateTotalLikesSql, [totalLikes, likeId], (err, data) => {
//         if (err) {
//           console.log(err);
//           return res.status(500).json({ error: "總按讚數更新失敗" });
//         }

//         console.log("總按讚數更新成功");

//         return res.json({ totalLikes });
//       });
//     });
//   });
// });

// // 獲取文章按讚數和使用者按讚狀態
// app.get("/posts/:faid", (req, res) => {
//   const faid = req.params.faid;
//   const sql = "SELECT likeCount, likedByUser FROM ForumArticle WHERE faid = ?";
//   connToDBHelper.query(sql, [faid], (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.json(err);
//     } else {
//       return res.json(data[0]);
//     }
//   });
// });

// //按讚faid
// app.put("/like/:faid", (req, res) => {
//   const sql = "UPDATE `ForumArticle` SET `likedByUser` = ? WHERE `faid` = ?";
//   const values = req.body.likedByUser;
//   const likeId = req.body.faid;
//   console.log("有沒有" + values);
//   console.log("有沒有count" + likeId);
//   connToDBHelper.query(sql, [values, likeId], (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({ error: "更新失敗" });
//     }

//     console.log("like更新成功");
//     return res.json("更新成功");
//   });
// });

// // 更新使用者對文章的按讚狀態
// app.put("/posts/:faid/like", (req, res) => {
//   const updateSql = "UPDATE ForumArticle SET likedByUser = ? WHERE faid = ?";
//   const values = req.body.likedByUser;
//   const likeId = req.body.faid;
//   console.log("有沒有" + values);
//   console.log("有沒有collect" + likeId);
//   connToDBHelper.query(updateSql, [values, likeId], (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.json(err);
//     } else {
//       console.log("按讚成功");
//       return res.json("按讚狀態更新成功");

//     }

//   });
// });

//按讚總數(old)
// app.put("/posts/:faid/like", (req, res) => {
//   const updateSql = "UPDATE ForumArticle SET likedByUser = ? WHERE faid = ?";
//   const values = req.body.likedByUser;
//   const likeId = req.params.faid;

//   connToDBHelper.query(updateSql, [values, likeId], (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({ error: "按讚更新失敗" });
//     }

//     console.log("按讚更新成功");

//     // Recalculate the total likes for the article
//     const getTotalLikesSql = "select likeCount,likedByUser,(likeCount+likedByUser) as totalLikes from ForumArticle WHERE faid = ?";
//     connToDBHelper.query(getTotalLikesSql, [likeId], (err, result) => {
//       if (err) {
//         console.log(err);
//         return res.status(500).json({ error: "按讚加總更新失敗" });
//       }

//       const totalLikes = result[0].totalLikes || 0;
//       console.log("總按讚數: " + totalLikes);

//       return res.json({ totalLikes });
//     });
//   });
// });

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
    // 'SELECT `faid`,  `fatitle`, `farticle`, `faimage`, `likeCount`, `fboard`, `fhashtag`, `createTime`, `updateTime` FROM `ForumArticle` WHERE fboard = "閒聊"';
    ' SELECT *FROM `ForumArticle`LEFT JOIN `login` ON `ForumArticle`.`uid` = `login`.`uid`WHERE fboard = "閒聊" ORDER BY `createTime` DESC';
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
    'SELECT `faid`,  `fatitle`, `farticle`, `faimage`, `likeCount`, `fboard`, `fhashtag`, `createTime`, `updateTime` FROM `ForumArticle` WHERE fboard = "新聞"';
  connToDBHelper.query(sql, (err, data) => {
    if (err) {
      return "新聞版連接錯誤";
    } else {
      return res.json(data);
    }
  });
});

//標籤雲
app.get("/tags", (req, res) => {
  // const sql = "SELECT fhashtag FROM `ForumArticle` "
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
