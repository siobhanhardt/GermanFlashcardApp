import React, { useContext } from "react";
import "./WordList.css";
import { ListContext } from "../Context/ListContext";


// Component for rendering word cards in list
function WordListCard({ germanWord, partOfSpeech, id, onModalSelect }) {
  const { list, updateList } = useContext(ListContext);
  const wordObj = list.find((item) => item.id === id);
  const wordStatus = wordObj ? wordObj.status : "unseen";

  function handleModalSelect(id) {
    onModalSelect(id);
  }

  return (
    <div className="word-container" onClick={() => handleModalSelect(id)}>
      <h3 className="id">{id}</h3>
      <h3 className="german-word">{germanWord}</h3>
      <div className="bottom-right">
        <span className="part-of-speech">{partOfSpeech}</span>
        <span className="word-status">{wordStatus}</span>
      </div>
    </div>
  );
}

export default WordListCard;
