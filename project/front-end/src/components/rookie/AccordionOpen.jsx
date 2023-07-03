import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
// import "../../styles/rookie.css";
import axios from "axios";

const AccordionOpen = () => {
  const [rookie, setRookie] = useState([]);
  useEffect(() => {
    const fetchAllRookie = async () => {
      try {
        const res = await axios.get("http://localhost:3000/rookie");
        const filteredData = res.data.filter(
          (item) => item.id >= 1 && item.id <= 4
        );
        console.log(filteredData);
        setRookie(filteredData)
        // console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllRookie();
  }, []);

  return (

    <>
      {rookie.map((res) => (
        <Accordion key={res.id} defaultActiveKey="0" className="m-5">
          <Accordion.Item eventKey={res.id.toString()}>
            <Accordion.Header>
              <div className="articalword">{res.title}</div>
            </Accordion.Header>
            <Accordion.Body className="articalword">{res.article}</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </>

  );
};

export default AccordionOpen;
