import express from "express";
import cors from "cors";
import axios from "axios";
import fs from "fs";

let rawdata = fs.readFileSync("./t187ap03_L.json");
let StockData = JSON.parse(rawdata);
// console.log(StockData);

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
  const inputValue = req.body.data;
  try {
    console.log(inputValue);
    const stockInfo = StockData.find((item) => item.公司代號 == inputValue);
    const stockName = stockInfo ? stockInfo.公司名稱 : "未找到公司名稱";
    const stockShortName = stockInfo ? stockInfo.公司簡稱 : "公司簡稱";
    const stockBuildDate = stockInfo ? stockInfo.成立日期 : "成立日期";
    const stockDate = stockInfo ? stockInfo.上市日期 : "上市日期";
    const stockWebsite = stockInfo ? stockInfo.網址 : "網址";
    const stockAddress = stockInfo ? stockInfo.住址 : "住址";
    const stockEnglishAddress = stockInfo
      ? stockInfo.英文通訊地址
      : "英文通訊地址";
    const stockPeople1 = stockInfo ? stockInfo.董事長 : "董事長";
    const stockPeople2 = stockInfo ? stockInfo.總經理 : "總經理";
    const stockPeople3 = stockInfo ? stockInfo.發言人 : "發言人";
    const stockPeople4 = stockInfo ? stockInfo.代理發言人 : "代理發言人";
    const stockPhone = stockInfo ? stockInfo.總機電話 : "總機電話";
    const stockTax = stockInfo ? stockInfo.傳真機號碼 : "傳真機號碼";
    const stockEnglishName = stockInfo ? stockInfo.英文簡稱 : "英文簡稱";
    const stockPrice = stockInfo ? stockInfo.實收資本額 : "實收資本額";
    const stockEmail = stockInfo ? stockInfo.電子郵件信箱 : "電子郵件信箱";
    const stockAmount = stockInfo
      ? stockInfo.已發行普通股數或TDR原股發行股數
      : "已發行普通股數或TDR原股發行股數";
    const stockUni = stockInfo
      ? stockInfo.營利事業統一編號
      : "營利事業統一編號";
    const data = {
      stockName,
      stockShortName,
      stockBuildDate,
      stockDate,
      stockWebsite,
      stockAddress,
      stockEnglishAddress,
      stockPeople1,
      stockPeople2,
      stockPeople3,
      stockPeople4,
      stockPhone,
      stockTax,
      stockEnglishName,
      stockPrice,
      stockEmail,
      stockAmount,
      stockUni,
    };
    console.log(stockName);
    res.send(data);
    // axios
    //   .get("https://openapi.twse.com.tw/v1/exchangeReport/BWIBBU_ALL")
    //   .then((response) => {
    //     console.log(response.data);
    //     const stockData = response.data;
    //     const stockName = stockData.find(
    //       (item) => item.Code === inputValue
    //     )?.Name;
    //     console.log(stockName);
    // res.send(stockName);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     res.status(500).send("Error occurred while fetching stock data.");
    //   });
  } catch (err) {
    console.log(err);
  }
});

app.listen(5678, () => {
  console.log("Stock 的 port 5678 連接完成 " + new Date().toLocaleTimeString());
});
