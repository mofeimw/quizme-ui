import './Pile.css';

const Pile = ({flashcards, currentIndex, replaceCard}) => {
  return (
    <div className="pile">
      {flashcards.map((flashcard, index) => {
        if (index !== currentIndex) {
          return (
            <div key={index} className="pilecard" onClick={() => replaceCard(index)}>
              <p>{flashcard.question}</p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Pile;
