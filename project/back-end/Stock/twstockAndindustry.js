import express from "express";
import React, { useEffect, useState } from 'react';
import cors from "cors";
import axios from "axios";

var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/stock-index", async (req, res) => {
  
  const perRange = req.query.perRange
  const range = req.query.range
  // console.log(range)
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
    // console.log(response.data,"===================================================");
  } catch (error) {
    console.error(error);
  }
});
//指數
app.get("/index", async (req, res) => {
  const options = {
    method: "GET",
    url: `https://yahoo-finance127.p.rapidapi.com/historic/%5ETWII/1d/5d`,
    headers: {
      "X-RapidAPI-Key": "4892a9e016msh50445f6831f2ba5p11acc9jsn4bd98dd4a1f2",
      "X-RapidAPI-Host": "yahoo-finance127.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data)
    console.log(response.data)
  } catch (error) {
    console.error(error);
  }
});

//寶島指數與成交金額
app.get("/price", async function (req, res) {
  try {
    const response = await axios.get(
      "https://openapi.twse.com.tw/v1/exchangeReport/MI_INDEX4"
    );
    console.log(response.data);

    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error occurred while fetching stock data.");
  }
});

//大盤圓餅圖

app.get("/doughnutTwii", async (req, res) => {
  
  // const perRange = req.query.perRange
  // const range = req.query.range
  // console.log(range)
  const options = {
    method: "GET",
    url: `https://yahoo-finance127.p.rapidapi.com/historic/%5ETWII/1d/5d`,
    headers: {
      "X-RapidAPI-Key": "4892a9e016msh50445f6831f2ba5p11acc9jsn4bd98dd4a1f2",
      "X-RapidAPI-Host": "yahoo-finance127.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data)
    // console.log(response.data,"===================================================");
  } catch (error) {
    console.error(error);
  }
});

//台灣50
app.get("/finance", async (req, res) => {
  const options = {
    method: "GET",
    url: `https://yahoo-finance127.p.rapidapi.com/historic/0050.tw/1d/3mo`,
    headers: {
      'X-RapidAPI-Key': '4892a9e016msh50445f6831f2ba5p11acc9jsn4bd98dd4a1f2',
      'X-RapidAPI-Host': 'yahoo-finance127.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options);
    res.json(response.data)
    // console.log(response.data,"===============台灣50====================================");
  } catch (error) {
    console.error(error);
  }
});
//台灣0056
app.get("/textile", async (req, res) => {
  const options = {
    method: "GET",
    url: `https://yahoo-finance127.p.rapidapi.com/historic/0056.tw/1d/3mo`,
    headers: {
      'X-RapidAPI-Key': '4892a9e016msh50445f6831f2ba5p11acc9jsn4bd98dd4a1f2',
      'X-RapidAPI-Host': 'yahoo-finance127.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options);
    res.json(response.data)
    // console.log(response.data,"===============0056====================================");
  } catch (error) {
    console.error(error);
  }
});
//台灣00878
app.get("/semi", async (req, res) => {
  const options = {
    method: "GET",
    url: `https://yahoo-finance127.p.rapidapi.com/historic/00878.tw/1d/3mo`,
    headers: {
      'X-RapidAPI-Key': '4892a9e016msh50445f6831f2ba5p11acc9jsn4bd98dd4a1f2',
      'X-RapidAPI-Host': 'yahoo-finance127.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options);
    res.json(response.data)
    // console.log(response.data,"===============00878====================================");
  } catch (error) {
    console.error(error);
  }
});
//台灣00891
app.get("/glass", async (req, res) => {
  const options = {
    method: "GET",
    url: `https://yahoo-finance127.p.rapidapi.com/historic/00891.tw/1d/3mo`,
    headers: {
      'X-RapidAPI-Key': '4892a9e016msh50445f6831f2ba5p11acc9jsn4bd98dd4a1f2',
      'X-RapidAPI-Host': 'yahoo-finance127.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options);
    res.json(response.data)
    // console.log(response.data,"===============00891====================================");
  } catch (error) {
    console.error(error);
  }
});
//台灣00692
app.get("/food", async (req, res) => {
  const options = {
    method: "GET",
    url: `https://yahoo-finance127.p.rapidapi.com/historic/00692.tw/1d/1mo`,
    headers: {
      'X-RapidAPI-Key': '4892a9e016msh50445f6831f2ba5p11acc9jsn4bd98dd4a1f2',
      'X-RapidAPI-Host': 'yahoo-finance127.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options);
    res.json(response.data)
    // console.log(response.data,"===============00692====================================");
  } catch (error) {
    console.error(error);
  }
});
//台灣00881
app.get("/car", async (req, res) => {
  const options = {
    method: "GET",
    url: `https://yahoo-finance127.p.rapidapi.com/historic/00881.tw/1d/3mo`,
    headers: {
      'X-RapidAPI-Key': '4892a9e016msh50445f6831f2ba5p11acc9jsn4bd98dd4a1f2',
      'X-RapidAPI-Host': 'yahoo-finance127.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options);
    res.json(response.data)
    // console.log(response.data,"===============00881====================================");
  } catch (error) {
    console.error(error);
  }
});
//台灣00713
app.get("/chem", async (req, res) => {
  const options = {
    method: "GET",
    url: `https://yahoo-finance127.p.rapidapi.com/historic/00713.tw/1d/3mo`,
    headers: {
      'X-RapidAPI-Key': '4892a9e016msh50445f6831f2ba5p11acc9jsn4bd98dd4a1f2',
      'X-RapidAPI-Host': 'yahoo-finance127.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options);
    res.json(response.data)
    // console.log(response.data,"===============00713====================================");
  } catch (error) {
    console.error(error);
  }
});



app.listen(9453, () => {
  console.log(
    "大盤與產業股的 port 9453 連接完成 " + new Date().toLocaleTimeString() +"======================================================"
  );
});
