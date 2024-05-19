import { useState } from 'react'
import './FlashCard.css'

/* eslint-disable react/prop-types */

function FlashCard({question, answer}) {
  const [flipped, setFlipped] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');

  const flipCard = () => {
    setFlipped(!flipped);
  };

  const dontFlip = (e) => {
    e.stopPropagation();
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.toLowerCase() === answer.toLowerCase()) {
      setFeedback('Correct!');
    } else {
      setFeedback('Incorrect. Try again.');
    }
  };

  return (
    <>
      <div className="flashcard" onClick={flipCard}>
        <div className={`card ${flipped ? 'flipped' : ''}`}>
          <div className="front">
            <h1>{question}</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={userInput}
                onChange={handleInputChange}
                placeholder="Enter your answer"
                onClick={dontFlip}
              />
              <button type="submit" onClick={dontFlip}>Submit</button>
            </form>
            <p>{feedback}</p>
          </div>

          <div className="back">
            <h1>{answer}</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default FlashCard
