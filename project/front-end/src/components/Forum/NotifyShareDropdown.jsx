import React, { useState } from 'react';

const NotifyShareDropdown = () => {
    return (
        <>
            <div className="dropdown ms-2">
                <a href="#" id="bellShareDropdown" className="" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="./img/forum/three-Dots-Vertical.svg" alt="more" />
                </a>
                <ul className="dropdown-menu dropdown-menu-IronGray-Deep" aria-labelledby="bellShareDropdown">
                    <li>
                        <a className="dropdown-item px-4 py-2" href="#">
                            <img src="./img/forum/bell.svg" alt="" />
                            <span className="ms-3 fs-5">開啟文章通知</span>
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item px-4 py-2" href="#">
                            <img src="./img/forum/share.svg" alt="" />
                            <span className="ms-3 fs-5">分享文章</span>
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default NotifyShareDropdown;