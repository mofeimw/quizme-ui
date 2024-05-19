import { useState, useEffect } from 'react'
import './FlashCard.css'

/* eslint-disable react/prop-types */

function FlashCard({question, answer}) {
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
          <div className="front">
            <h1>{question}</h1>
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
