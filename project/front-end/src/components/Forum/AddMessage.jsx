import React, { useState } from 'react';

const AddMessage = () => {
    return (
        <div className="d-flex align-items-center">
            <img src="./img/forum/user-chicken.svg" alt="" />
            <input type="text" className="form-control ms-3 fs-5" placeholder="留言..." />
        </div>
    )
}

export default AddMessage;