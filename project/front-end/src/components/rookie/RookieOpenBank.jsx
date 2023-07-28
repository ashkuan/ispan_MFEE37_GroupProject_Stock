import React from "react";
import "../../styles/forum_individual.css";
import openbank from "/img/rookie/openbank.svg";
import tree from "/img/rookie/tree.svg";
import skis from "/img/rookie/skis.svg";
import kgi from "/img/rookie/kgi.svg";
import sino from "/img/rookie/sino.svg";
import mountaion from "/img/rookie/mountaion.svg";
import fong from "/img/rookie/fong.svg";
import ctbc from "/img/rookie/ctbc.svg";
import big from "/img/rookie/big.svg";
import fubon from "/img/rookie/fubon.svg";

const RookieOpenBank = () => {
  return (
    <>
      <div>
        <img
          src={openbank}
          data-bs-toggle="modal"
          data-bs-target="#banklink"
          style={{
            position: "fixed",
            right: 0,
            bottom: 0,
            width: "15rem",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundColor: "transparent",
            backgroundPosition: "center",
            cursor: "pointer",
          }}
        />
      </div>
      <div
        className="modal fade"
        id="banklink"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered top-15">
          <div className="modal-content rounded-3">
            <div className="modal-header px-5">
              <div
                className="modal-title fw-bold py-4 text-IronGray-Deep fs-3"
                id="bankrecommend"
              >
                9間推薦證券銀行
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body bank p-4">
              <div className="row">
                <div className="col-4">
                  <a
                    className="d-flex"
                    style={{ margin: "1.5rem" }}
                    target="_blank"
                    href="https://www.cathaybk.com.tw/cathaybk/promo/event/cathaysecuritiestommb/index.html?utm_source=google_cathaysec&gclid=CjwKCAjwhJukBhBPEiwAniIcNVFVneah1DstSdkGdDczW2csg3XcGDam-3Wc82WoOIr-ItMirjRQ6hoChqoQAvD_BwE#account"
                  >
                    <img src={tree} />
                  </a>
                </div>
                <div className="col-4">
                  <a
                    className="d-flex m-4 "
                    target="_blank"
                    href="https://eoa.kgi.com.tw/OOA/index.aspx?Source=6&utm_source=google&utm_medium=cpc_ad&gclid=CjwKCAjwhJukBhBPEiwAniIcNart91NWrtoKpFqa_jwnAirvFLGJ_uoppdvl-6EImw9xz7P00MnMdxoCUnkQAvD_BwE"
                  >
                    <img src={kgi} alt="" />
                  </a>
                </div>
                <div className="col-4">
                  <a
                    className="d-flex "
                    style={{ margin: "1rem" }}
                    target="_blank"
                    href="https://events.emega.com.tw/securities/newop-71"
                  >
                    <img src={fong} alt="" />
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <a
                    className="d-flex"
                    style={{ margin: "1.8rem" }}
                    target="_blank"
                    href="https://www.skis.com.tw/n/RQPromo.html?utm_source=google&utm_medium=cpc_RQ&utm_campaign=202212&gclid=CjwKCAjwhJukBhBPEiwAniIcNffcFEzj5tZjCp2vAzeb9V-Rqbi1wti49PWNmgvzTQaWCeJwMcJuiRoCFf8QAvD_BwE"
                  >
                    <img src={skis} alt="" />
                  </a>
                </div>
                <div className="col-4">
                  <a
                    className="d-flex"
                    style={{ margin: "1.8rem" }}
                    target="_blank"
                    href="https://www.sinotrade.com.tw/ec/20220701/index.aspx?strProd=0111&strWeb=0355&utm_campaign=openAct_event_GSMad_Brand&utm_source=google&utm_medium=GSMad_TF_Conversion&utm_content=brand&utm_term=%E6%B0%B8%E8%B1%90%E9%87%91%E8%AD%89%E5%88%B8&gclid=CjwKCAjwhJukBhBPEiwAniIcNWnURImbZ5qMdqIDHD00c5FRU0nYBB-A9Baa-HDEBulK0IrlNos_lRoCt24QAvD_BwE"
                  >
                    <img src={sino} alt="" />
                  </a>
                </div>
                <div className="col-4">
                  <a
                    className="d-flex"
                    style={{ margin: "1.8rem" }}
                    target="_blank"
                    href="https://www.ctbcsec.com/2020/renew/awesome3/index.html?utm_source=google&utm_medium=cpc&utm_campaign=h1&utm_term=click&utm_content=text_tittle&gad=1"
                  >
                    <img src={ctbc} alt="" />
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <a
                    className="d-flex"
                    style={{ margin: "1.8rem" }}
                    target="_blank"
                    href="https://account.esunsec.com.tw/open/index.html?utm_source=google&utm_medium=cpc&utm_term=kw&utm_campaign=openaccount&gclid=CjwKCAjwhJukBhBPEiwAniIcNb2OKhEWgP0aUYNFJFhOXN-ohMPAPX7-l9K6MGA1kJK0nLuPUpZDBxoCXlYQAvD_BwE"
                  >
                    <img src={mountaion} alt="" />
                  </a>
                </div>
                <div className="col-4">
                  <a
                    className="d-flex"
                    style={{ margin: "1.8rem" }}
                    target="_blank"
                    href="https://www.yuantafunds.com/active/openacc/index.html?gclid=CjwKCAjwhJukBhBPEiwAniIcNRWEP1jGRa6UQYOvoBrIgIgqZh_9UFM7Ve-YnQhM-D-hxYazw2x4JBoCWbIQAvD_BwE"
                  >
                    <img src={big} alt="" />
                  </a>
                </div>
                <div className="col-4">
                  <a
                    className="d-flex"
                    style={{ margin: "1.8rem" }}
                    target="_blank"
                    href="https://mopen.fbs.com.tw/eOpen/indexH5.html#/main/home_H5"
                  >
                    <img src={fubon} alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RookieOpenBank;
