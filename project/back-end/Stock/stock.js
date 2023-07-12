import express from "express";
import cors from "cors";
import axios from "axios";
var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/stock", async function (req, res) {
  let { data } = req.body;
  console.log(data);
  console.log(typeof data);

  const options = {
    method: "GET",
    url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary",
    params: { symbol: `${data}.TW` },
    headers: {
      "X-RapidAPI-Key": "f980082317msh5ac2b2f0ccfcfc0p1d356djsn796ad9e14407",
      "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    res.send(response.data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(5678, () => {
  console.log("Stock 的 port 5678 連接完成 " + new Date().toLocaleTimeString());
});
