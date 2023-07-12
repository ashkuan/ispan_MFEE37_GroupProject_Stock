import React, { useState } from 'react';
import SmallHotMessage from './SmallHotMessage';
import SmallNewMessage from './SmallNewMessage';

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
                    <SmallHotMessage />
                </div>
                {/* newmessage */}
                <div className="tab-pane fade show" id="newMessage"
                    role="tabpanel" aria-labelledby="tab02">
                    <SmallNewMessage />
                </div>
            </div>
        </>
    )
}

export default HotNewMessageTabs;
