import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import axios from "axios";

const AccordionStock = () => {
    const [rookie, setRookie] = useState([]);
  useEffect(() => {
    const fetchAllRookie = async () => {
      try {
        const res = await axios.get("http://localhost:3000/rookie");
        const filteredData = res.data.filter(
          (item) => item.id >= 5 && item.id <= 20
        );
        console.log(filteredData);
        setRookie(filteredData)
        // window.location.reload()
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
            <Accordion.Body className="articalword">
            {res.article}
            <div className=" d-flex justify-content-evenly"> <img src={res.image} /></div>
           
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </>

  );
}

export default AccordionStock