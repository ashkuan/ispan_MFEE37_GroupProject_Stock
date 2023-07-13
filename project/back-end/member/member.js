import express from "express";
import cors from "cors";
import db from "../DB/DBconfig.js";
import session from "express-session";

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));
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
  }),
);

app.post('/register', (req, res) => {
  const sql = "INSERT INTO login (`name`,`email`,`password`,`photopath`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.photopath,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json('Error');
    }
    return res.json(data);
  });
});

app.post('/', (req, res) => {
  const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";

  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json('Error');
    }
    if (data.length > 0) {
      // 登入成功,儲存用戶訊息
      req.session.user = data[0];
      console.log('uid = ' + req.session.user.uid,
        'name = ' + req.session.user.name,
        'email = ' + req.session.user.email,
        'photopath = ' + req.session.user.photopath,
        );
      return res.json('success');
    } else {
      return res.json('fail');
    }
  });
});

app.get('/member', (req, res) => {
  if (req.session.user) {
    const user = {
      uid: req.session.user.uid,
      name: req.session.user.name,
      email: req.session.user.email,
      password: req.session.user.password,
      photopath: req.session.user.photopath
    };
    return res.json(user);
  } else {
    return res.status(401).json('Unauthorized');
  }
});
// 登出路由
app.post('/logout', (req, res) => {
  req.session.destroy(); 
  return res.json('success');
});

app.listen(3000, () => {
  console.log("member 的 port 3000 連接完成 " + new Date().toLocaleTimeString());
});
