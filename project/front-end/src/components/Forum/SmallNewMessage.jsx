import React, { useState } from 'react';

const SmallNewMessage = () => {
    const newMessages = [
        {
            fmid: 4,
            userImageUrl: './img/forum/user-chicken.svg',
            userName: '我要成為航海王',
            time: '3小時前',
            likeImageUrl: './img/forum/like.svg',
            likeCount: 32,
            ranking: 'B25',
            messageContent: '其實還是要看外資的臉色，還有分檢的臉色尤其是有沒有當日沖在裡面，所以如果真的要投資股市的話很多面向都要考慮包括有無借卷或者是融資在裡面，或許有很多事情都需要多方面的思考才能夠看到答案所以一起努力，鼓勵大戶可以再多觀察大戶的籌碼'
        },
        {
            fmid: 3,
            userImageUrl: './img/forum/user-chicken.svg',
            userName: 'Bob Dylan',
            time: '17小時前',
            likeImageUrl: './img/forum/like.svg',
            likeCount: 36,
            ranking: 'B20',
            messageContent: '哈哈哈 韭菜gg'
        },
        {
            fmid: 2,
            userImageUrl: './img/forum/user-chicken.svg',
            userName: '對帳單嚇死你',
            time: '6/21',
            likeImageUrl: './img/forum/like.svg',
            likeCount: 60,
            ranking: 'B1',
            messageContent: '沒單沒真相，會問就是不要玩啦'
        },
        {
            fmid: 1,
            userImageUrl: './img/forum/user-chicken.svg',
            userName: '今晚吃韭菜水餃',
            time: '6/22',
            likeImageUrl: './img/forum/like.svg',
            likeCount: 1,
            ranking: 'B2',
            messageContent: '我知道你還有辦法弄到錢錢'
        },
    ]

    return (
        <>
            {
                newMessages.map((newMessage, i) => (
                    <div className="border-top border-2 py-4 mt-4" key={i}>
                        <div className="black-Word d-flex justify-content-between align-items-center">
                            {/* netizen 網友 & time */}
                            <div className="d-flex align-items-center">
                                <img src={newMessage.userImageUrl} alt="" />
                                <span className="ms-3 text-IronGray-Deep fs-5">{newMessage.userName} · {newMessage.time}</span>
                            </div>
                            {/* like */}
                            <div>
                                <img src={newMessage.likeImageUrl} alt="" />
                                <span className="fs-5 fw-normal ms-2">{newMessage.likeCount}</span>
                            </div>
                        </div>
                        {/* message-content */}
                        <div className="fs-5 pt-3">
                            <a href="#" className="text-decoration-none text-IronGray mx-2">{newMessage.ranking}</a>
                            <span className="fs-5 fw-normal">{newMessage.messageContent}</span>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default SmallNewMessage;