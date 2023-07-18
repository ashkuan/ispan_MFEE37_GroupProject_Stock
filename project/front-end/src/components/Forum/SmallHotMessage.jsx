import React, { useState, useEffect } from "react";
import axios from "axios";

const SmallHotMessage = (props) => {
  const faid = props.data;
  console.log(faid);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5052/messages/${faid}`);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMessages();
  }, [faid]);

  const getMessages = () => {
    axios
      .get("/messages")
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postMessage = () => {
    const fmContent = "留言内容"; // 替換為實際的留言內容
    axios
      .post(`http://localhost:5052/messages/${faid}`, { fmContent })
      .then((response) => {
        console.log(response.data);
        // 成功發表留言後，刷新留言列表
        fetchMessages(); // 注意這裡需要調用 fetchMessages() 函數來重新獲取留言
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {messages.map((message) => (
        <div className="border-top border-2 py-4 mt-4" key={message.fmid}>
          <div className="black-Word d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img src={message.photopath} alt="" />
              <span className="ms-3 text-IronGray-Deep fs-5">
                {message.uid} · {message.createTime}
              </span>
            </div>
            <div>
              <img src={message.likeImageUrl} alt="" />
              <span className="fs-5 fw-normal ms-2">{message.likeCount}</span>
            </div>
          </div>
          <div className="fs-5 pt-3">
            <a href="#" className="text-decoration-none text-IronGray mx-2">
              {message.ranking}
            </a>
            <span className="fs-5 fw-normal">{message.fmContent}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default SmallHotMessage;

// import React, { useState } from 'react';

// const SmallHotMessage = () => {
//     const hotMessages = [
//         {
//             fmid: 2,
//             userImageUrl: './img/forum/user-chicken.svg',
//             userName: '對帳單嚇死你',
//             time: '6/21',
//             likeImageUrl: './img/forum/like.svg',
//             likeCount: 60,
//             ranking: 'B1',
//             fmContent: '沒單沒真相，會問就是不要玩啦'
//         },
//         {
//             fmid: 3,
//             userImageUrl: './img/forum/user-chicken.svg',
//             userName: 'Bob Dylan',
//             time: '17小時前',
//             likeImageUrl: './img/forum/like.svg',
//             likeCount: 36,
//             ranking: 'B20',
//             fmContent: '哈哈哈 韭菜gg'
//         },
//         {
//             fmid: 4,
//             userImageUrl: './img/forum/user-chicken.svg',
//             userName: '我要成為航海王',
//             time: '3小時前',
//             likeImageUrl: './img/forum/like.svg',
//             likeCount: 32,
//             ranking: 'B25',
//             fmContent: '其實還是要看外資的臉色，還有分檢的臉色尤其是有沒有當日沖在裡面，所以如果真的要投資股市的話很多面向都要考慮包括有無借卷或者是融資在裡面，或許有很多事情都需要多方面的思考才能夠看到答案所以一起努力，鼓勵大戶可以再多觀察大戶的籌碼'
//         },
//         {
//             fmid: 1,
//             userImageUrl: './img/forum/user-chicken.svg',
//             userName: '今晚吃韭菜水餃',
//             time: '6/22',
//             likeImageUrl: './img/forum/like.svg',
//             likeCount: 1,
//             ranking: 'B2',
//             fmContent: '我知道你還有辦法弄到錢錢'
//         }
//     ]

//     return (
//         <>
//             {
//                 hotMessages.map((hotMessage, i) => (
//                     <div className="border-top border-2 py-4 mt-4" key={i}>
//                         <div className="black-Word d-flex justify-content-between align-items-center">
//                             {/* netizen 網友 & time */}
//                             <div className="d-flex align-items-center">
//                                 <img src={hotMessage.userImageUrl} alt="" />
//                                 <span className="ms-3 text-IronGray-Deep fs-5">{hotMessage.userName} · {hotMessage.time}</span>
//                             </div>
//                             {/* like */}
//                             <div>
//                                 <img src={hotMessage.likeImageUrl} alt="" />
//                                 <span className="fs-5 fw-normal ms-2">{hotMessage.likeCount}</span>
//                             </div>
//                         </div>
//                         {/* message-content */}
//                         <div className="fs-5 pt-3">
//                             <a href="#" className="text-decoration-none text-IronGray mx-2">{hotMessage.ranking}</a>
//                             <span className="fs-5 fw-normal">{hotMessage.fmContent}</span>
//                         </div>
//                     </div>
//                 ))
//             }
//         </>
//     )
// }

// export default SmallHotMessage;
