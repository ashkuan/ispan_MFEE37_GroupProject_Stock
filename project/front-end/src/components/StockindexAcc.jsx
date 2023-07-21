import React from "react";
import { Accordion } from "react-bootstrap";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import "../styles/stockindexacc.css";
const StockIndexAcc = () => {
  return (
    <div className="container indexacc">
      <Accordion defaultActiveKey="0">
        <AccordionItem eventKey="0" className="accitem">
          <AccordionHeader className="accheader">
            <h2>什麼是大盤指數？</h2>
          </AccordionHeader>
          <AccordionBody>
            大盤指數是一個數字指標，用於衡量特定股票市場的整體表現。
            它是由選定的一組股票所組成，通常代表市場中具有代表性的股票。
            大盤指數可以提供投資者對整個市場的走勢和表現有一個快速的總體了解，
            並作為評估股票市場績效的重要參考指標。
          </AccordionBody>
        </AccordionItem>
        <AccordionItem eventKey="1" className="accitem">
          <AccordionHeader> <h2>加權指數是什麼？</h2></AccordionHeader>
          <AccordionBody>
            加權指數是一種股票指數，根據股票市值來加權計算成分股票的價格變動。
            較大市值的股票將對指數變動產生更大影響，而較小市值的股票則對變動影響較小。
            加權指數可用來追踪整個股市或特定市場部分的表現，
            提供投資者對市場整體趨勢的洞察力。
          </AccordionBody>
        </AccordionItem>
        <AccordionItem eventKey="2" className="accitem">
          <AccordionHeader><h2>寶島指數是什麼？</h2></AccordionHeader>
          <AccordionBody>
          福摩莎指數，又稱台灣福摩莎臺灣50指數（TAIEX），是台灣證券交易所的主要指標之
          一。它是由台灣市場中50家規模最大且最具代表性的上市公司股票組成，包含了各行各
          業的代表企業。福摩莎指數的變動反映了這些50家公司股票價格的波動情況，成為了衡
          量台灣股市整體表現的指標。投資者經常使用福摩莎指數來追踪台灣股市的趨勢，並參
          考它進行投資策略的制定。當福摩莎指數上漲，表示台灣股市整體表現較佳，反之則可
          能意味著股市走弱。。
          </AccordionBody>
        </AccordionItem>
        <AccordionItem eventKey="3" className="accitem">
          <AccordionHeader><h2>關於台股成交</h2></AccordionHeader>
          <AccordionBody>
            台股成交是指台灣股票市場中在特定交易日內進行的股票交易總量。
            它代表了投資者在該交易日內買入和賣出的股票數量，
            是衡量市場活躍度和交易量的指標。
            台股成交量的變動可以反映市場參與者的情緒和市場趨勢，
            對投資者和分析師來說是重要的參考資訊之一。
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default StockIndexAcc;
