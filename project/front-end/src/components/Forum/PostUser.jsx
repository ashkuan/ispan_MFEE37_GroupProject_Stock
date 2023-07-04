import React, { useState } from 'react';

const PostUser = () => {
    return (
        <>
            <div className="user-img-circle bg-cover me-3"></div>
            <div className="pt-4">
                <div className="fz-2 me-3 mb-1">股海擺渡人</div>
                <div className="fz-3 ms-6 text-IronGray">08/02</div>
            </div>
            <a href="#"
                className="text-decoration-none IronGray-Deep fz-4 rounded-5 text-white px-3 py-2">+&nbsp;追蹤</a>
        </>
    )
}

export default PostUser;