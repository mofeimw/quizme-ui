import { useState } from 'react'
import FlashCard from './FlashCard';
import Pile from './Pile';
import './App.css'
import leftArrow from '/arrow-left.svg';
import rightArrow from '/arrow-right.svg';

function App() {
  const FLASHCARDS = [
    { question: 'When was Amazon founded', answer: '1994' },
    { question: 'What city is Amazon headquartered in', answer: 'Seattle' },
    { question: 'What was Amazon\'s original focus as a marketplace', answer: 'Books' },
    { question: 'What Amazon division is a cloud computing service provider', answer: 'AWS' },
  ];
  const [flashcards, setFlashcards] = useState(FLASHCARDS);
  const [counter, setCounter] = useState(0);
  const [status, setStatus] = useState('Correct: 0');
  const [index, setIndex] = useState(0);
  const [flipClass, setFlipClass] = useState('');
  const [userInput, setUserInput] = useState('');
  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

  const flipVertical = (newIndex) => {
    setFlipClass('vertical-flip');
    setTimeout(() => {
      setIndex(newIndex);
      setUserInput('');
      setIncorrect(false);
      setCorrect(false);
    }, 400); // update IN THE MIDDLE OF TRANSITION!
    setTimeout(() => {
      setFlipClass('');
    }, 700);
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
      setCorrect(true);
      setIncorrect(false);
      setUserInput('');
      setCounter((prevValue) => prevValue + 1);
      if (counter == flashcards.length - 1) {
        setStatus("You're All Done!");
      } else {
        setStatus(`Correct: ${counter + 1}`);
      }
    } else {
      setIncorrect(true);
      setCorrect(false);
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
    setIncorrect(false);
    setCorrect(false);
    setUserInput('');
    setStatus(`Correct: 0`);
  }

  const replaceCard = (index) => {
    flipVertical(index);
  }

  return (
    <>
      <div className="interface">
        <h1>Amazon Study Set</h1>
        <div>
          <h3 className="status">{status}</h3>
          <button className="shuffle" onClick={shuffle}>Shuffle</button>
        </div>
        <div className={`flashcard ${flipClass}`}>
          <FlashCard
            question={flashcards[index].question}
            answer={flashcards[index].answer}
            correct={correct}
            incorrect={incorrect}
          />
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Enter your answer"
            onClick={dontFlip}
          />
          <button type="submit" onClick={dontFlip}>Submit</button>
        </form>

        <img className="arrow arrow-left" onClick={previousCard} src={leftArrow}/>
        <img className="arrow arrow-right" onClick={nextCard} src={rightArrow}/>

        <Pile flashcards={flashcards} currentIndex={index} replaceCard={replaceCard} />
      </div>
    </>
  );
}

export default App
