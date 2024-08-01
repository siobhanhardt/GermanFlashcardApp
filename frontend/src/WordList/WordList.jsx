import React, { useState, useEffect } from "react";
import WordListCard from "./WordListCard";
import { isMobile } from "react-device-detect";
import "./WordList.css";

// Component for rendering the word list
function WordList({ wordData, onModalSelect, howMany, isGrid }) {
  const containerClass = isGrid ? 'flashcard-list-container grid' : 'flashcard-list-container' // Change style is grid is selected
  const listClass = isGrid ? 'flashcard-list grid' : 'flashcard-list' // Change style is grid is selected
  const [num, setNum] = useState(0); // The number you are starting the wordlist on, howMany controls how many cards per page
  const [selection, setSelection] = useState(
    wordData.slice(num, num + howMany)
  );
  let intHowMany = 0;
  
  if (howMany !== "All") {
    intHowMany = parseInt(howMany);
  }

  function handleModalSelect(id) {
    onModalSelect(id);
  }

  useEffect(() => {
    if (howMany !== "All" && num % howMany !== 0) { //Resets num to divisible number if changing from different amount of words per page 
      let newNum = num - (num % howMany);
      setNum(newNum);
    }
    if (howMany === "All") {
      setSelection(wordData);
    } else {
      const endValue = num + intHowMany;
      setSelection(wordData.slice(num, Math.min(endValue, wordData.length))); // Selection starts at num, ends at endValue or end of list
    }
  }, [howMany, num, wordData]);

  function next() {
    if (num + intHowMany < wordData.length) { // if there are still cards to show
      setNum((num) => num + intHowMany);
    }
  }
  function prev() {
    if (num - intHowMany >= 0) { // if there are still cards to show
      setNum((num) => num - intHowMany);
    }
  }
  return (
    <div className={containerClass}>
      <ul className={listClass}>
        {isMobile ? ( // if is mobile just render entire list 
          <>
            {wordData.map((flashcard) => (
              <li key={flashcard.id}>
                <WordListCard
                  germanWord={flashcard.germanWord}
                  partOfSpeech={flashcard.partOfSpeech}
                  id={flashcard.id}
                  onModalSelect={handleModalSelect}
                />
              </li>
            ))}
          </>
        ) : (
          <>
            {selection.map((flashcard) => (
              <li key={flashcard.id}>
                <WordListCard
                  germanWord={flashcard.germanWord}
                  partOfSpeech={flashcard.partOfSpeech}
                  id={flashcard.id}
                  onModalSelect={handleModalSelect}
                />
              </li>
            ))}
          </>
        )}
      </ul>
      {!isMobile && howMany !== "All" && (
        <div className="wordlist-arrow-container">
          <button onClick={prev} className="wordlist-arrow prev" disabled={num - intHowMany < 0}>{"<"}</button>
          <button onClick={next} className="wordlist-arrow next" disabled={num + intHowMany > wordData.length}>{">"}</button>
        </div>
      )}
    </div>
  );
}

export default WordList;
