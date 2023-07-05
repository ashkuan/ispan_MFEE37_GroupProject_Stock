import express from "express";
import cors from "cors";
import db from "../DB/DBconfig.js";
var app = express();
app.use(cors());
app.use(express.json()); // 將接收到的JSON格式的資料轉換為JS物件

app.get("/", function (req, res) {
  res.send("select連接成功");
});

app.get("/shop", function (req, res) {
  db.query("SELECT * FROM Shop", [], function (err, data) {
    if (err) {
      return "查無資料";
    } else {
      return res.json(data);
    }
  });
});

app.post("/shop/cart/add", function (req, res) {
  const cartItems = req.body.data;
  // 過濾為0的pid
  const filteredItems = Object.entries(cartItems).filter(
    ([pid, paccount]) => paccount !== 0
  );
  const VALUES = filteredItems.map(([pid, paccount]) => [pid, paccount]);
  console.log(VALUES);

  db.query(
    "INSERT INTO Cart (pid, paccount) VALUES ? ON DUPLICATE KEY UPDATE paccount = VALUES(paccount)",
    [VALUES],
    function (err, data) {
      if (err) {
        console.error("資料庫新增失敗:", err);
      } else {
        console.log("資料庫新增成功");
      }
    }
  );
});

app.delete("/shop/cart", function (req, res) {
  const cartItems = req.body.data;
  console.log(cartItems);
  // 過濾為0的pid
  const filteredItems = Object.entries(cartItems).filter(
    ([pid, paccount]) => paccount !== 0
  );
  const removeValues = filteredItems.map(([pid, paccount]) => [
    pid,
    paccount - 1,
  ]);
  const deletePids = Object.entries(cartItems)
    .filter(([pid, paccount]) => paccount === 0)
    .map(([pid, paccount]) => pid);

  // db.query(
  //   `DELETE FROM Cart WHERE pid IN (${deletePids.map(() => "?").join(",")})`,
  //   [deletePids],
  //   function (err, data) {
  //     if (err) {
  //       console.error("資料庫刪除失敗:", err);
  //     } else {
  //       console.log("資料庫刪除成功");
  //       // 執行更新操作
  //       db.query(
  //         "INSERT INTO Cart (pid, paccount) VALUES ? ON DUPLICATE KEY UPDATE paccount = VALUES(paccount)",
  //         [removeValues],
  //         function (err, data) {
  //           if (err) {
  //             console.error("刪除失敗:", err);
  //           } else {
  //             console.log("刪除成功");
  //           }
  //         }
  //       );
  //     }
  //   }
  // );
});

// app.post("/shop", function (req, res) {
//   const items = req.body.data;
//   console.log("這是items");
//   console.log(items);
//   // console.log(items);
//   // const pids = items.filter(([pid, paccount]) => paccount == 0); // 獲取商品數量為0的所有pid
//   // console.log("這是商品數為0的pid們");
//   // console.log(pids);

//   // if (pids.length > 0) {
//   //   db.query(
//   //     // 要變成(?,?,?)；IN檢查值是否在資料表中
//   //     `DELETE FROM Cart WHERE pid IN (${pids.map(() => "?").join(",")})`,
//   //     pids,
//   //     function (err, data) {
//   //       if (err) {
//   //         console.error("失敗，無法刪除商品數為0的pid:", err);
//   //       } else {
//   //         console.log("已更新商品數為0的pid");
//   //       }
//   //     }
//   //   );
//   // }

//   const updateValues = items.filter(([pid, paccount]) => [pid, paccount]);
//   if (updateValues.length > 0) {
//     db.query(
//       "INSERT INTO Cart (pid, paccount) VALUES ? ON DUPLICATE KEY UPDATE paccount = VALUES(paccount)",
//       [updateValues],
//       function (err, data) {
//         if (err) {
//           console.error("購物車儲存失敗:", err);
//         } else {
//           console.log("購物車儲存成功");
//         }
//       }
//     );
//   }
// });

app.listen(3000, () => {
  console.log("Shop 的 port 3000 連接完成 " + new Date().toLocaleTimeString());
});
