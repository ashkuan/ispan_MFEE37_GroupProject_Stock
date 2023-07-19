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

app.post("/stock2", async function (req, res) {
  let { data } = req.body;
  console.log(data);
  console.log(typeof data);
  const options = {
    method: "GET",
    url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-analysis",
    params: { symbol: "2330.TW" },
    headers: {
      "X-RapidAPI-Key": "4892a9e016msh50445f6831f2ba5p11acc9jsn4bd98dd4a1f2",
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

app.post("/stockChart", async function (req, res) {
  const { data } = req.body;
  const inputValue = data.inputValue;
  const perRange = data.perRange;
  const range = data.range;
  console.log(data);
  console.log(inputValue);
  console.log(perRange);
  console.log(range);

  const options = {
    method: "GET",
    url: `https://yahoo-finance127.p.rapidapi.com/historic/${inputValue}.TW/${perRange}/${range}`,
    headers: {
      "X-RapidAPI-Key": "4892a9e016msh50445f6831f2ba5p11acc9jsn4bd98dd4a1f2",
      "X-RapidAPI-Host": "yahoo-finance127.p.rapidapi.com",
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

app.post("/stockName", async function (req, res) {
  try {
    const inputValue = req.body.data;
    console.log(inputValue);
    axios
      .get("https://openapi.twse.com.tw/v1/exchangeReport/BWIBBU_ALL")
      .then((response) => {
        console.log(response.data);
        const stockData = response.data;
        const stockName = stockData.find(
          (item) => item.Code === inputValue
        )?.Name;
        console.log(stockName);
        res.send(stockName);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("Error occurred while fetching stock data.");
      });
  } catch (err) {
    console.log(err);
  }
});

app.listen(5678, () => {
  console.log("Stock 的 port 5678 連接完成 " + new Date().toLocaleTimeString());
});
