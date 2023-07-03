import React, { useState } from 'react';
import {QuizData} from './RookieQuizData'
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
      <div>
  
        <div className="container ">
          <Button onClick={openModal} className='quizbtn' id='aptitudebtn'> 性向測驗--看看你是什麼類型的投資人格 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m11.4 18.161l7.396-7.396a10.289 10.289 0 0 1-3.326-2.234a10.29 10.29 0 0 1-2.235-3.327L5.839 12.6c-.577.577-.866.866-1.114 1.184a6.556 6.556 0 0 0-.749 1.211c-.173.364-.302.752-.56 1.526l-1.362 4.083a1.06 1.06 0 0 0 1.342 1.342l4.083-1.362c.775-.258 1.162-.387 1.526-.56c.43-.205.836-.456 1.211-.749c.318-.248.607-.537 1.184-1.114Zm9.448-9.448a3.932 3.932 0 0 0-5.561-5.561l-.887.887l.038.111a8.754 8.754 0 0 0 2.092 3.32a8.754 8.754 0 0 0 3.431 2.13l.887-.887Z"/></svg>
          </Button> {/* Button to open the modal */}
          <Modal show={modalOpen} onHide={closeModal} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>性向測驗--看看你是什麼類型的投資人格</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {showResult ? (
                <QuizResult score={score} totalScore={QuizData.length} tryAgain={resetAll} />
              ) : (
                <>
                  <div className="question">
                    <span id="question-number">{currentQuestion + 1}. </span>
                    <span id="question-txt">{QuizData[currentQuestion].question}</span>
                  </div>
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
                  {/* <input type="button" value="Next" id="next-button" onClick={changeQuestion} /> */}
                  <Button className='d-flex ms-auto' onClick={changeQuestion}>Next</Button>
                </>
              )}
            </Modal.Body>
          </Modal>
        </div>
      </div>
    );
}

export default RookieQuiz