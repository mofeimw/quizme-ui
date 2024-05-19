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
  const [flipClass, setFlipClass] = useState('');

  const flipVertical = (newIndex) => {
    setFlipClass('vertical-flip');
    setTimeout(() => {
      setIndex(newIndex);
    }, 400); // update IN THE MIDDLE OF TRANSITION!
    setTimeout(() => {
      setFlipClass('');
    }, 800);
  };

  const previousCard = () => {
    const newIndex = index === 0 ? flashcards.length - 1 : index - 1;
    flipVertical(newIndex);
  };

  const nextCard = () => {
    const newIndex = index === flashcards.length - 1 ? 0 : index + 1;
    flipVertical(newIndex);
  };

  return (
    <>
      <div className="interface">
        <div className={`flashcard ${flipClass}`}>
          <FlashCard
            question={flashcards[index].question}
            answer={flashcards[index].answer}
          />
        </div>

        <div className="arrows">
          <button onClick={previousCard}>Previous</button>
          <button onClick={nextCard}>Next</button>
        </div>
      </div>
    </>
  );
}

export default App
