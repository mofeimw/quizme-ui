import { useState } from 'react'
import './FlashCard.css'

/* eslint-disable react/prop-types */

function FlashCard({question, answer}) {
  const [flipped, setFlipped] = useState(false);

  const flipCard = () => {
    setFlipped(!flipped);
  };

  return (
    <>
      <div className="flashcard" onClick={flipCard}>
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
