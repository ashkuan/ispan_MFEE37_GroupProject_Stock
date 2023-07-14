// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const KeepButton = () => {
//   const [keeps, setKeeps] = useState(0);
//   const faid = props.data;
//   useEffect(() => {
//     const fetchAllKeep = async () => {
//       try {
//         const res = await axios.post("http://localhost:5789/getFaid", {
//           faid: faid,
//         });
//         setKeeps(res.data)
//       } catch (err) {
//         console.log("我是keep"+err);
//       }
//     };
//     fetchAllKeep()
//   },[]);

//   const collectClick = async (e) => {
//     e.preventDefault();

//     try {
//       if (collects === 0) {
//         setCollects(1);
//         console.log('有嗎'+faid);
//         await axios.put("http://localhost:5789/collect/:faid", {
//           faid: faid,
//           collects: 1,
//         });
//       } else {
//         setCollects(0);
//         await axios.put("http://localhost:5789/collect/:faid", {
//           faid: faid,
//           collects: 0,
//         });
//       }
//       fetchAllCollect();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <>
//     {keeps.map((keep,index)=>(
//         <a className="text-decoration-none ms-2" href="#">
//         <img onClick={collectClick} src="./img/forum/collect-Article.svg" alt="" />
//       </a>
//     ))}

//     </>
//   );
// };

// export default KeepButton;

import React, { useState, useEffect } from "react";
import axios from "axios";

const KeepButton = (props) => {
  const [keeps, setKeeps] = useState([]);
  const [collects, setCollects] = useState({
    collect: null,
  });
  const faid = props.data;

  useEffect(() => {
    const fetchAllKeep = async () => {
      try {
        const res = await axios.post("http://localhost:5789/getFaid", {
          faid: faid,
        });
        setKeeps(res.data);
        setCollects(res.data.collect);
      } catch (err) {
        console.log("我是keep" + err);
      }
    };

    fetchAllKeep();
  }, [faid]);

  const collectClick = async (e) => {
    e.preventDefault();

    try {
      if (collects === 0 || null) {
        setCollects(1);
        console.log("有嗎" + faid);

        await axios.put("http://localhost:5789/collect/${faid}", {
          faid: faid,
          collects: 0,
        });
      } else {
        setCollects(0);
        await axios.put("http://localhost:5789/collect/${faid}", {
          faid: faid,
          collects: 1,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* {keeps.map((keep, index) => (
        <a className="text-decoration-none ms-2" href="#" key={index}>
          <div onClick={collectClick}>
          {keep.collect} === 0
          <img src="./img/forum/collect.svg" alt="" />
          {keep.collect} === 1
          <img src="./img/forum/collect-Article.svg" alt="" />
          </div>
        </a>
      ))} */}
      {keeps.map((keep, index) => (
        <a className="text-decoration-none ms-2" href="#" key={index}>
          <div onClick={collectClick}>
            {keep.collect === 0 && <img src="./img/forum/collect-Article.svg" alt="" />}
            {keep.collect === 1 && (
              <img src="./img/forum/collect.svg" alt="" />
            )}
          </div>
        </a>
      ))}
    </>
  );
};

export default KeepButton;
