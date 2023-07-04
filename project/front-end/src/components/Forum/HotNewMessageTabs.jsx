import React, { useState } from 'react';

const HotNewMessageTabs = () => {
    return (
        <>
            <div className="text-secondary fs-5 px-4 d-flex justify-content-end align-items-center">
                <ul className="nav" id="tabSelected" role="tablist">
                    {/* hotTabs */}
                    <li className="nav-item" role="presentation">
                        <a class="nav-link me-2 text-decoration-none 
                                IronGray-Deep text-white fz-3 rounded-5 px-3 py-2"
                            href="#" id="tab01" data-bs-toggle="pill"
                            data-bs-target="#hotMessage" type="button" role="tab"
                            aria-controls="hotMessage" aria-selected="false">
                            熱門
                        </a>
                    </li>
                    {/* newTabs */}
                    <li className="nav-item" role="presentation">
                        <a class="nav-link text-decoration-none IronGray-Light text-white 
                                fz-3 rounded-5 px-3 py-2" href="#" id="tab02" data-bs-toggle="pill"
                            data-bs-target="#newMessage" type="button" role="tab"
                            aria-controls="newMessage" aria-selected="false">
                            最新
                        </a>
                    </li>
                </ul>
            </div>
            <div className="tab-content" id="pills-tabContent">
                {/* hotmessage */}
                <div className="tab-pane fade show active" id="hotMessage"
                    role="tabpanel" aria-labelledby="tab01">
                    {/* <SmallMessage /> */}
                    {/* message1 */}
                    <div class="border-top border-2 py-4 mt-4">
                        {/* netizen 網友 & time & like */}
                        <div class="black-Word d-flex justify-content-between align-items-center fs-5">
                            {/* netizen 網友 & time */}
                            <div class="d-flex align-items-center">
                                <img src="./img/forum/user-chicken.svg" alt="" />
                                <span class="ms-3 text-IronGray-Deep">{`對帳單嚇死你 · 6/21`}</span>
                            </div>
                            {/* like */}
                            <div>
                                <img src="./img/forum/like.svg" alt="" />
                                <span class="fs-5 ms-2">60</span>
                            </div>
                        </div>
                        {/* message-content */}
                        <div class="fs-5 pt-3">
                            {/* ranking 排行 */}
                            <a href="#" class="text-decoration-none text-IronGray mx-2">B1</a>
                            {/* content */}
                            <span>沒單沒真相，會問就是不要玩啦</span>
                        </div>
                    </div>
                    {/* message2 */}
                    <div class="border-top border-2 py-4 mt-4">
                        {/* netizen 網友 & time & like */}
                        <div class="black-Word d-flex justify-content-between align-items-center fs-5">
                            {/* netizen 網友 & time */}
                            <div class="d-flex align-items-center">
                                <img src="./img/forum/user-chicken.svg" alt="" />
                                <span class="ms-3 text-IronGray-Deep">{`Bob Dylan · 17小時前`}</span>
                            </div>
                            {/* like */}
                            <div>
                                <img src="./img/forum/like.svg" alt="" />
                                <span class="fs-5 ms-2">36</span>
                            </div>
                        </div>
                        {/* message-content */}
                        <div class="fs-5 pt-3">
                            {/* ranking 排行 */}
                            <a href="#" class="text-decoration-none text-IronGray mx-2">B20</a>
                            {/* content */}
                            <span>哈哈哈 韭菜gg</span>
                        </div>
                    </div>
                    {/* message3 */}
                    <div class="border-top border-2 py-4 mt-4">
                        {/* netizen 網友 & time & like */}
                        <div class="black-Word d-flex justify-content-between align-items-center fs-5">
                            {/* netizen 網友 & time */}
                            <div class="d-flex align-items-center">
                                <img src="./img/forum/user-chicken.svg" alt="" />
                                <span class="ms-3 text-IronGray-Deep">{`我要成為航海王 · 3小時前`}</span>
                            </div>
                            {/* like */}
                            <div>
                                <img src="./img/forum/like.svg" alt="" />
                                <span class="fs-5 ms-2">32</span>
                            </div>
                        </div>
                        {/* message-content */}
                        <div class="fs-5 pt-3">
                            {/* ranking 排行 */}
                            <a href="#" class="text-decoration-none text-IronGray mx-2">B25</a>
                            {/* content */}
                            <span>其實還是要看外資的臉色，還有分檢的臉色尤其是有沒有當日沖在裡面，所以如果真的要投資股市的話很多面向都要考慮包括有無借卷或者是融資在裡面，或許有很多事情都需要多方面的思考才能夠看到答案所以一起努力，鼓勵大戶可以再多觀察大戶的籌碼</span>
                        </div>
                    </div>
                    {/* message4 */}
                    <div class="position-relative border-top border-2 py-4 mt-4">
                        {/* netizen 網友 & time & like */}
                        <div class="black-Word d-flex justify-content-between align-items-center fs-5">
                            {/* netizen 網友 & time */}
                            <div class="d-flex align-items-center">
                                <img src="./img/forum/user-chicken.svg" alt="" />
                                <span class="ms-3 text-IronGray-Deep">{`今晚吃韭菜水餃 · 6/22`}</span>
                            </div>
                            {/* like */}
                            <div>
                                <img src="./img/forum/like.svg" alt="" />
                                <span class="fs-5 ms-2">1</span>
                            </div>
                        </div>
                        {/* message-content */}
                        <div class="fs-5 pt-3">
                            {/* ranking 排行 */}
                            <a href="#" class="text-decoration-none text-IronGray mx-2">B2</a>
                            {/* content */}
                            <span>我知道你還有辦法弄到錢錢</span>
                        </div>
                        {/* message4-blur */}
                        <div id="backdropBlur" class="d-flex justify-content-center align-items-center">
                            <button type="btn"
                                class="btn btn-IronGray-Deep d-flex justify-content-center align-items-center px-5 py-3 rounded-4 fs-5">登入解鎖大家的回答</button>
                        </div>
                    </div>
                </div>
                {/* newmessage */}
                <div className="tab-pane fade show" id="newMessage"
                    role="tabpanel" aria-labelledby="tab02">
                    {/* message1 */}
                    <div class="border-top border-2 py-4 mt-4">
                        {/* netizen 網友 & time & like */}
                        <div class="black-Word d-flex justify-content-between align-items-center fs-5">
                            {/* netizen 網友 & time */}
                            <div class="d-flex align-items-center">
                                <img src="./img/forum/user-chicken.svg" alt="" />
                                <span class="ms-3 text-IronGray-Deep">{`我要成為航海王 · 3小時前`}</span>
                            </div>
                            {/* like */}
                            <div>
                                <img src="./img/forum/like.svg" alt="" />
                                <span class="fs-5 ms-2">32</span>
                            </div>
                        </div>
                        {/* message-content */}
                        <div class="fs-5 pt-3">
                            {/* ranking 排行 */}
                            <a href="#" class="text-decoration-none text-IronGray mx-2">B25</a>
                            {/* content */}
                            <span>其實還是要看外資的臉色，還有分檢的臉色尤其是有沒有當日沖在裡面，所以如果真的要投資股市的話很多面向都要考慮包括有無借卷或者是融資在裡面，或許有很多事情都需要多方面的思考才能夠看到答案所以一起努力，鼓勵大戶可以再多觀察大戶的籌碼</span>
                        </div>
                    </div>
                    {/* message2 */}
                    <div class="border-top border-2 py-4 mt-4">
                        {/* netizen 網友 & time & like */}
                        <div class="black-Word d-flex justify-content-between align-items-center fs-5">
                            {/* netizen 網友 & time */}
                            <div class="d-flex align-items-center">
                                <img src="./img/forum/user-chicken.svg" alt="" />
                                <span class="ms-3 text-IronGray-Deep">{`Bob Dylan · 17小時前`}</span>
                            </div>
                            {/* like */}
                            <div>
                                <img src="./img/forum/like.svg" alt="" />
                                <span class="fs-5 ms-2">36</span>
                            </div>
                        </div>
                        {/* message-content */}
                        <div class="fs-5 pt-3">
                            {/* ranking 排行 */}
                            <a href="#" class="text-decoration-none text-IronGray mx-2">B20</a>
                            {/* content */}
                            <span>哈哈哈 韭菜gg</span>
                        </div>
                    </div>
                    {/* message3 */}
                    <div class="border-top border-2 py-4 mt-4">
                        {/* netizen 網友 & time & like */}
                        <div class="black-Word d-flex justify-content-between align-items-center fs-5">
                            {/* netizen 網友 & time */}
                            <div class="d-flex align-items-center">
                                <img src="./img/forum/user-chicken.svg" alt="" />
                                <span class="ms-3 text-IronGray-Deep">{`對帳單嚇死你 · 6/21`}</span>
                            </div>
                            {/* like */}
                            <div>
                                <img src="./img/forum/like.svg" alt="" />
                                <span class="fs-5 ms-2">60</span>
                            </div>
                        </div>
                        {/* message-content */}
                        <div class="fs-5 pt-3">
                            {/* ranking 排行 */}
                            <a href="#" class="text-decoration-none text-IronGray mx-2">B1</a>
                            {/* content */}
                            <span>沒單沒真相，會問就是不要玩啦</span>
                        </div>
                    </div>
                    {/* message4 */}
                    <div class="position-relative border-top border-2 py-4 mt-4">
                        {/* netizen 網友 & time & like */}
                        <div class="black-Word d-flex justify-content-between align-items-center fs-5">
                            {/* netizen 網友 & time */}
                            <div class="d-flex align-items-center">
                                <img src="./img/forum/user-chicken.svg" alt="" />
                                <span class="ms-3 text-IronGray-Deep">{`今晚吃韭菜水餃 · 6/22`}</span>
                            </div>
                            {/* like */}
                            <div>
                                <img src="./img/forum/like.svg" alt="" />
                                <span class="fs-5 ms-2">1</span>
                            </div>
                        </div>
                        {/* message-content */}
                        <div class="fs-5 pt-3">
                            {/* ranking 排行 */}
                            <a href="#" class="text-decoration-none text-IronGray mx-2">B2</a>
                            {/* content */}
                            <span>我知道你還有辦法弄到錢錢</span>
                        </div>
                        {/* message4-blur */}
                        <div id="backdropBlur" class="d-flex justify-content-center align-items-center">
                            <button type="btn"
                                class="btn btn-IronGray-Deep d-flex justify-content-center align-items-center px-5 py-3 rounded-4 fs-5">登入解鎖大家的回答</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HotNewMessageTabs;
