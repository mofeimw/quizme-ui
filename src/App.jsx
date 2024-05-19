import { useState } from 'react'
import FlashCard from './FlashCard';
import './App.css'

function App() {
  const FLASHCARDS = [
    { question: 'When was Amazon founded', answer: '1994' },
    { question: 'What city is Amazon headquartered in', answer: 'Seattle' },
    { question: 'What was Amazon\'s original focus as a marketplace', answer: 'Books' },
    { question: 'What division of Amazon is a cloud computing service provider', answer: 'AWS' },
  ];
  const [flashcards, setFlashcards] = useState(FLASHCARDS);
  const [counter, setCounter] = useState(0);
  const [status, setStatus] = useState('Studied: 0');
  const [index, setIndex] = useState(0);
  const [flipClass, setFlipClass] = useState('');
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');

  const flipVertical = (newIndex) => {
    setFlipClass('vertical-flip');
    setTimeout(() => {
      setIndex(newIndex);
      setFeedback('');
      setUserInput('');
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

  const dontFlip = (e) => {
    e.stopPropagation();
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.toLowerCase() === flashcards[index].answer.toLowerCase()) {
      setUserInput('');
      setFeedback('Correct!');
      setCounter((prevValue) => prevValue + 1);
      if (counter == flashcards.length - 1) {
        setStatus("All Done!");
      } else {
        setStatus(`Studied: ${counter + 1}`);
      }
    } else {
      setFeedback('Incorrect. Try again.');
    }
  };

  const shuffle = () => {
    const shuffled = FLASHCARDS
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    setFlashcards(shuffled);
    setCounter(0);
    setIndex(0);
    flipVertical(0);
    setFeedback('');
    setUserInput('');
    setStatus(`Studied: 0`);
  }

  return (
    <>
      <div className="interface">
        <h1>Amazon Study Set</h1>
        <h2>{status}</h2>
        <div className={`flashcard ${flipClass}`}>
          <FlashCard
            question={flashcards[index].question}
            answer={flashcards[index].answer}
          />
        </div>

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

        <div className="arrows">
          <button onClick={previousCard}>Previous</button>
          <button onClick={nextCard}>Next</button>
        </div>

        <button onClick={shuffle}>Shuffle</button>
      </div>
    </>
  );
}

export default App
