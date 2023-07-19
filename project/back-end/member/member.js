import express from "express";
import cors from "cors";
import db from "../DB/DBconfig.js";
import session from "express-session";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 600000,
    },
  })
);
//將會員大頭照傳到設定好的資料夾
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./img"); // 设置文件存储目录
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "memo-" + uniqueSuffix + ".png"); // 设置文件名
  },
});
const upload = multer({ storage: storage });
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "img")));

app.post("/register", upload.single("avatar"), (req, res) => {
  const sql =
    "INSERT INTO login (`name`,`email`,`password`,`photopath`) VALUES (?,?,?,?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
    req.file ? req.file.filename : null,
  ];
  db.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.json("Error");
    }
    const uid = data.insertId; // 取得新增資料的 ID
    return res.json({ uid: uid }); // 將 uid 傳回前端
    // console.log("註冊成功");
    // return res.json(data);
  });
});

// 新增會員郵件
app.post("/member/mail/addMail", (req, res) => {
  const { uid, message, stats, time, code } = req.body;

  const memberMessageSql =
    "INSERT INTO membermessage (uid, message, stats, time) VALUES (?, ?, ?, ?)";
  const memberMessageValues = [uid, message, stats, time];

  const couponSql = "INSERT INTO coupon (code, time) VALUES (?, ?)";
  const couponValues = [code, new Date()];

  db.query(memberMessageSql, memberMessageValues, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json("Internal Server Error");
    }
    console.log("會員郵件新增成功");

    // 在 coupon 表中新增
    db.query(couponSql, couponValues, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json("Internal Server Error");
      }
      console.log("coupon 表插入成功");
      // return res.json("Success");
    });
    // 取得 coupon code 的值
    const getCodeSql = "SELECT code FROM coupon ORDER BY cid DESC LIMIT 1";
    db.query(getCodeSql, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json("Internal Server Error");
      }

      if (result.length > 0) {
        const couponCode = result[0].code;
        console.log("coupon code:", couponCode);
        const message2 =
          " 本文件內容為商城折扣碼(" +
          couponCode +
          ")，使用該折扣碼可在商城享受300元的折價優惠。請在結帳時輸入折扣碼，即可享受這項優惠。優惠期限為有限，請盡早使用以獲取折扣。";
        // 在這裡您可以對 coupon code 做進一步處理或使用
        const memberMessageSql2 =
          "INSERT INTO membermessage (uid, message, stats, time) VALUES (?, ?, ?, ?)";
        const memberMessageValues2 = [uid, message2, stats, time];
        db.query(memberMessageSql2, memberMessageValues2, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json("Internal Server Error");
          }
          console.log("折價券信件新增成功");
          return res.json("Success");
        });
      }
    });
  });
});

app.post("/", (req, res) => {
  const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";

  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      // 登入成功,儲存用戶訊息
      req.session.user = data[0];
      console.log(
        "uid = " + req.session.user.uid,
        "name = " + req.session.user.name,
        "email = " + req.session.user.email,
        "photopath = " + req.session.user.photopath
      );
      return res.json("success");
    } else {
      return res.json("fail");
    }
  });
});
app.get("/member", (req, res) => {
  if (req.session.user) {
    const user = {
      uid: req.session.user.uid,
      name: req.session.user.name,
      email: req.session.user.email,
      password: req.session.user.password,
      photopath: req.session.user.photopath,
    };
    return res.json(user);
  } else {
    return res.status(401).json("Unauthorized");
  }
});
app.get("/", (req, res) => {
  res.send("Server is running successfully.");
  console.log("Server is running successfully.");
});
// 登出路由
app.post("/logout", (req, res) => {
  req.session.destroy();
  return res.json("success");
});

//會員MESSAGE
app.get("/member/mail", (req, res) => {
  const uid = req.session.user.uid;
  // console.log(uid);

  if (req.session.user) {
    const uid = req.session.user.uid;
    console.log(uid);
    const sql = "SELECT * FROM membermessage where uid = ? ";
    db.query(sql, [uid], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json("Internal Server Error");
      }
      // 返回包含uid
      return res.json({ uid: uid, messages: data });
    });
  } else {
    console.log("User session not found");
    return res.status(401).json("Unauthorized");
  }
});

//讀取信件
app.put("/member/mail/updateStats", (req, res) => {
  const message = req.body.message;
  const mid = req.body.mid;
  console.log("hihi");
  const sql = "UPDATE membermessage SET stats = 1 WHERE mid = ?";
  db.query(sql, [mid], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json("Internal Server Error");
    }
    console.log("資料庫中的stats已成功更新");
    return res.json("Success");
  });
});

//刪除郵件
app.delete("/member/mail/:mid", (req, res) => {
  const mid = req.params.mid;

  const sql = "DELETE FROM membermessage WHERE mid = ?";
  db.query(sql, [mid], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json("Internal Server Error");
    }
    console.log("郵件已成功刪除");
    return res.json("Success");
  });
});

//檢視我的文章
app.get("/member/artical", (req, res) => {
  if (!req.session.user) {
    console.log("User session not found");
    return res.status(401).json("Unauthorized");
  }

  const uid = req.session.user.uid;
  const sql = "SELECT * FROM ForumArticle WHERE uid = ?";

  db.query(sql, [uid], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json("Internal Server Error");
    }

    return res.json(data);
  });
});
//刪除我的文章
app.delete("/member/artical/:faid", (req, res) => {
  const faid = req.params.faid;

  const sql = "DELETE FROM ForumArticle WHERE faid = ?";
  db.query(sql, [faid], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json("Internal Server Error");
    }
    console.log("發文已成功刪除");
    return res.json("Success");
  });
});

app.listen(3000, () => {
  console.log(
    "member 的 port 3000 連接完成 " + new Date().toLocaleTimeString()
  );
});
