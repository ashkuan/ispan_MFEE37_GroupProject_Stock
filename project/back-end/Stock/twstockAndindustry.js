import express from "express";
import cors from "cors";
import axios from "axios";

var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/stock-index', async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://yahoo-finance127.p.rapidapi.com/price/%5ETWII',
    headers: {
      'X-RapidAPI-Key': '4892a9e016msh50445f6831f2ba5p11acc9jsn4bd98dd4a1f2',
      'X-RapidAPI-Host': 'yahoo-finance127.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
    console.log(response.data ,new Date().toLocaleTimeString(),
      "==========================================================")
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(9453, () => {
  console.log("大盤與產業股的 port 9453 連接完成 " + new Date().toLocaleTimeString());
});
