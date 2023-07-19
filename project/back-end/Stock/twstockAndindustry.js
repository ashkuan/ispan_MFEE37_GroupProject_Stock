import express from "express";
import cors from "cors";
import axios from "axios";

var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/stock-index", async (req, res) => {
  
  const perRange = req.query.perRange
  const range = req.query.range
  console.log(range)
  const options = {
    method: "GET",
    url: `https://yahoo-finance127.p.rapidapi.com/historic/%5ETWII/${perRange}/${range}`,
    headers: {
      "X-RapidAPI-Key": "4892a9e016msh50445f6831f2ba5p11acc9jsn4bd98dd4a1f2",
      "X-RapidAPI-Host": "yahoo-finance127.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data)
    console.log(response.data,"===================================================");
  } catch (error) {
    console.error(error);
  }
});
app.listen(9453, () => {
  console.log(
    "大盤與產業股的 port 9453 連接完成 " + new Date().toLocaleTimeString() +"======================================================"
  );
});
