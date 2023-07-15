import React, { useState } from 'react';
import { QuizData } from './RookieQuizData'
import QuizResult from './RookieQuizResult';
import { Modal, Button } from 'react-bootstrap';


const RookieQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption, setClickedOption] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // State variable for controlling the modal

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const changeQuestion = () => {
    updateScore();
    if (currentQuestion < QuizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setClickedOption(0);
    } else {
      setShowResult(true);
    }
  };

  const updateScore = () => {
    const selectedOption = QuizData[currentQuestion].options[clickedOption - 1];
    if (selectedOption) {
      setScore(score + selectedOption.score);
    }
  };

  const resetAll = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setClickedOption(0);
    setScore(0);
  };

  return (
    <div className="d-flex justify-content-center">
      <Button onClick={openModal} className='quizbtn btn-47' id='aptitudebtn'>
        <div className="d-flex justify-content-center align-items-center">
          {/* <svg className="SVG-Fill-IronGray-Deep" xmlns="http://www.w3.org/2000/svg" height="1.25em" viewBox="0 0 448 512"><path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" /></svg> */}
          <div className="px-5">
            <div className="d-flex justify-content-center align-items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="m11.4 18.161l7.396-7.396a10.289 10.289 0 0 1-3.326-2.234a10.29 10.29 0 0 1-2.235-3.327L5.839 12.6c-.577.577-.866.866-1.114 1.184a6.556 6.556 0 0 0-.749 1.211c-.173.364-.302.752-.56 1.526l-1.362 4.083a1.06 1.06 0 0 0 1.342 1.342l4.083-1.362c.775-.258 1.162-.387 1.526-.56c.43-.205.836-.456 1.211-.749c.318-.248.607-.537 1.184-1.114Zm9.448-9.448a3.932 3.932 0 0 0-5.561-5.561l-.887.887l.038.111a8.754 8.754 0 0 0 2.092 3.32a8.754 8.754 0 0 0 3.431 2.13l.887-.887Z" /></svg>
              <span className="ms-4 fs-1">
                性向測驗
              </span>
            </div>
            <div className="fs-3 text-nowrap">
              看看你是什麼類型的投資人格
            </div>
          </div>
          {/* <svg className="SVG-Fill-IronGray-Deep" xmlns="http://www.w3.org/2000/svg" height="1.25em" viewBox="0 0 448 512"><path d="M448 296c0 66.3-53.7 120-120 120h-8c-17.7 0-32-14.3-32-32s14.3-32 32-32h8c30.9 0 56-25.1 56-56v-8H320c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v32 32 72zm-256 0c0 66.3-53.7 120-120 120H64c-17.7 0-32-14.3-32-32s14.3-32 32-32h8c30.9 0 56-25.1 56-56v-8H64c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v32 32 72z" /></svg> */}
        </div>
      </Button> {/* Button to open the modal */}
      <Modal className="top-5" show={modalOpen} onHide={closeModal} keyboard={false} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title className="text-IronGray-Deep px-2 py-3">
            <div className="d-flex align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="m11.4 18.161l7.396-7.396a10.289 10.289 0 0 1-3.326-2.234a10.29 10.29 0 0 1-2.235-3.327L5.839 12.6c-.577.577-.866.866-1.114 1.184a6.556 6.556 0 0 0-.749 1.211c-.173.364-.302.752-.56 1.526l-1.362 4.083a1.06 1.06 0 0 0 1.342 1.342l4.083-1.362c.775-.258 1.162-.387 1.526-.56c.43-.205.836-.456 1.211-.749c.318-.248.607-.537 1.184-1.114Zm9.448-9.448a3.932 3.932 0 0 0-5.561-5.561l-.887.887l.038.111a8.754 8.754 0 0 0 2.092 3.32a8.754 8.754 0 0 0 3.431 2.13l.887-.887Z" /></svg>
              <div className="ms-3">
                <div className="mb-1 fs-4 fw-bold">性向測驗 --</div>
                <div className="fs-5 fw-normal">看看你是什麼類型的投資人格</div>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showResult ? (
            <QuizResult score={score} totalScore={QuizData.length} tryAgain={resetAll} />
          ) : (
            <div className='pb-4'>
              <div className="question px-5 fs-3 d-flex text-IronGray-Deep">
                <div id="question-number">{currentQuestion + 1}. </div>
                <div id="question-txt">{QuizData[currentQuestion].question}</div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="option-container">
                  {QuizData[currentQuestion].options.map((option, i) => {
                    return (
                      <button
                        className={`option-btn ${clickedOption === i + 1 ? 'checked' : null}`}
                        key={i}
                        onClick={() => setClickedOption(i + 1)}
                      >
                        {option.text}
                      </button>
                    );
                  })}
                </div>
              </div>
              <Button className='next-button d-flex m-auto mt-3 px-3 py-2 fs-4' onClick={changeQuestion}>下一題</Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default RookieQuiz