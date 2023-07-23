import axios from "axios";
import React, { useState, useEffect } from "react";

const PostUser = (props) => {
  const [users, setUsers] = useState([]);

  const faid = props.data;
  // console.log("postuser的" + faid);

  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        console.log("postuser的" + faid);
        const res = await axios.post("http://localhost:5789/getFaid", {
          faid: faid,
        });
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUser();
  }, []);

  return (
    <>
      {users.map((user, index) => (
        <div
          key={index}
          className="d-flex align-items-center">
          {/* <div className="user-img-circle bg-cover me-3"></div> */}
          <img
            className="userImg me-3"
            src={`http://localhost:3000/${user.userimg}`}
          />
          <div className="pt-4">
            <div className="fz-2 me-3 mb-1">{user.name}</div>
            <div
              className="fz-3 text-IronGray">
              {new Date(user.createTime).toLocaleDateString("en-US",
                {
                  month: "2-digit",
                  day: "2-digit",
                })}
            </div>
          </div>

        </div>
      ))}
    </>
  );
};

export default PostUser;
