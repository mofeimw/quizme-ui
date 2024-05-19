import { useState } from 'react'
import FlashCard from './FlashCard';
import './App.css'

function App() {
  const flashcards = [
    { question: 'When was Amazon founded', answer: '1994' },
    { question: 'What city is Amazon headquartered in', answer: 'Seattle' },
    { question: 'What was Amazon\'s original focus as a marketplace', answer: 'Books' },
    { question: 'What division of Amazon is a cloud computing service provider', answer: 'AWS' },
  ];
  const [index, setIndex] = useState(0);

  const previousCard = () => {
    setIndex((prevIndex) => {
      if (prevIndex === 0) {
        return flashcards.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
  };

  const nextCard = () => {
    setIndex((prevIndex) => {
      if (prevIndex === flashcards.length - 1) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  };

  return (
    <>
      <div className="interface">
        <FlashCard
          question={flashcards[index].question}
          answer={flashcards[index].answer}
        />

        <div className="arrows">
          <button onClick={previousCard}>Previous</button>
          <button onClick={nextCard}>Next</button>
        </div>
      </div>
    </>
  );
}

export default App
