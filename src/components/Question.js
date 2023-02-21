/** @format */

import React, { useEffect, useState } from 'react';

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          // reset time and call onAnswered
          onAnswered(false);
          return 10;
        } else {
          // decrement time by 1
          return prevTime - 1;
        }
      });
    }, 1000);

    // return cleanup function
    return () => {
      clearTimeout(timerId);
    };
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button
            key={answer}
            onClick={() => handleAnswer(isCorrect)}
          >
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
