import { useState, useEffect } from 'react'
import './FlashCard.css'

/* eslint-disable react/prop-types */

function FlashCard({question, answer, correct, incorrect}) {
  const [flipped, setFlipped] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setIsUpdating(true);
    setFlipped(false);
  }, [question, answer]);

  const flipCard = () => {
    setIsUpdating(false);
    setFlipped(!flipped);
  };

  return (
    <>
      <div className={`flashcard ${isUpdating ? 'no-animation' : ''}`} onClick={flipCard}>
        <div className={`card ${flipped ? 'flipped' : ''}`}>
          <div className={`front ${correct ? 'correct' : ''} ${incorrect ? 'incorrect' : ''}`}>
            <h2 className="cardText">{question}</h2>
          </div>

          <div className="back">
            <h2 className="cardText">{answer}</h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default FlashCard
