import express from "express";
import cors from "cors";
import connToDBHelper from "../DB/DBconfig.js";
import bodyParser from "body-parser";
import multer from "multer";
// import path from "path";
// import fs from "fs";

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("hi this is backend");
});

app.get("/posts", (req, res) => {
  const sql = "SELECT * FROM `ForumArticle` ";
  connToDBHelper.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
});

app.post("/posts", (req, res) => {
    console.log(" ----------------------------------------")
    console.log(req.body)
    console.log(" ----------------------------------------")
const sql =
  "INSERT INTO `ForumArticle`( `fatitle`, `farticle`, `faimage`, `faid`, `fboard`) VALUES (?)";

  const values = [
    req.body.fatitle,
    req.body.farticle,
    req.body.faimage,
    req.body.faid,
    req.body.fboard,
    // req.body.createTime,
  ];
  connToDBHelper.query(sql, [values], (err, data) => {
    if (err) {
        console.log(err)
      return res.json(err);
    } else {
        console.log("上傳成功")
        return res.json("上傳成功")
    }
  });
});


app.listen(3000, () => {
  console.log("3000 post發文開始" + new Date().toLocaleTimeString());
});