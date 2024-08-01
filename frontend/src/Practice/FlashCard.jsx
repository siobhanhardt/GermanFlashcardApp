import React, { useState, useEffect } from "react";
import AudioPlayer from "../Audio/AudioPlayer";

// Component that renders the flashcard
function FlashCard({ word, german }) {
  const [isFlipped, setIsFlipped] = useState(german);
  const mp3 = word.id + "_" + word.germanWord + ".mp3";

  let germanFontSize =
    word.germanWord.length > 14
      ? "modal-german-word long"
      : "modal-german-word";
  let englishFontSize =
    word.englishTranslation.length > 14
      ? "modal-german-word long"
      : "modal-german-word";

  function handleFlip() {
    setIsFlipped(!isFlipped);
  }

  useEffect(() => {
    if (german) {
      setIsFlipped(false);
    } else {
      setIsFlipped(true);
    }
  }, [german]);

  return (
    <div className="flashcard-container">
      <div
        className={`flashcard-inner ${isFlipped ? "is-flipped" : ""}`}
        onClick={handleFlip}
      >
        <div className="flashcard-front modal">
          <h3 className={germanFontSize}>{word.germanWord}</h3>
          <AudioPlayer mp3FileName={mp3} />
          <p className="modal-part-of-speech">{word.partOfSpeech}</p>
          <p className="modal-sentence">{word.exampleSentence}</p>
        </div>
        <div className="flashcard-back modal">
          <h3 className={englishFontSize}>{word.englishTranslation}</h3>
          <p className="modal-part-of-speech">{word.partOfSpeech}</p>
          <p className="modal-sentence">{word.exampleSentenceEn}</p>
        </div>
      </div>
    </div>
  );
}

export default FlashCard;
