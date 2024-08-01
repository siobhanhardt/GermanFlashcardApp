import React, { useState, useContext } from "react";
import "./Modal.css";
import axios from "axios";
import { ListContext } from "../Context/ListContext";
import AudioPlayer from "../Audio/AudioPlayer";
import EmailAlert from "../Email/EmailAlert";
import { getBaseUrl } from "../util";

function WordModalCard({ word, onClose }) {
  const baseURL = getBaseUrl();
  const apiKey = import.meta.env.VITE_API_KEY;
  const { list, updateList } = useContext(ListContext);
  const mp3 = word.id + "_" + word.germanWord + ".mp3";

  const modalClassName =
    word.partOfSpeech === "verb"
      ? "center b list-modal-german-word"
      : "center list-modal-german-word";
  const [verbCon, setVerbCon] = useState([]); 
  const [conjugationToggle, setConjugationToggle] = useState(false);
  const [buttonName, setButtonName] = useState("Conjugation");
  const [settings, setSettings] = useState(false);

  function handleClick() {
    const isRegular = word.irregularVerb ? "irregular" : "regular";
    const verb = word.germanWord;
    const apiUrl = `${baseURL}/${isRegular}/${verb}`;
    axios
      .get(apiUrl , {
        headers: {
          'X-API-KEY': apiKey
        }
      })
      .then((response) => {
        setVerbCon(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setConjugationToggle(!conjugationToggle);
    setButtonName(buttonName === "Conjugation" ? "Word" : "Conjugation");
  }

  function handleSettingsToggle() {
    setSettings(!settings);
  }

  function setWordStatus(status) {
    const wordIndex = list.findIndex((item) => item.id === word.id);

    if (status === "unseen") {
      if (wordIndex !== -1) {
        const newList = list.filter((item, index) => index !== wordIndex);
        updateList(newList);
      }
    } else {
      let newList;
      if (wordIndex !== -1) {
        newList = [...list];
        newList[wordIndex] = { ...newList[wordIndex], status: status };
      } else {
        newList = [...list, { id: word.id, status: status }];
      }
      updateList(newList);
    }
  }

  const wordObj = list.find((item) => item.id === word.id);
  const wordStatus = wordObj ? wordObj.status : "unseen";
  const wordStatusCSS = "modal-word-status " + wordStatus;

  const tenses = ["Präsens", "Präteritum", "Perfekt", "Futur"];
  function formatConjugation(conjugation, title) {
    const formattedText = `ich ${conjugation.ich}\ndu ${conjugation.du}\ner/sie/es ${conjugation.erSieEs}\nwir ${conjugation.wir}\nihr ${conjugation.ihr}\nSie/sie ${conjugation.sieSie}`;
    return (
      <>
        <h4>{title}</h4>
        <pre className="conjugation-text">{formattedText}</pre>
      </>
    );
  }

  return (
    <div className="list-word-modal-container">
      <div className="list-modal">
        <button className="list-modal-close" onClick={onClose}>
          <i className="fa fa-close fa-2x" />
        </button>
        <button className="modal-settings" onClick={handleSettingsToggle}>
          <i className="fa fa-cog fa-2x" />
        </button>
        <div className="email">
          <EmailAlert word={word.germanWord} />
        </div>
        <div
          className={`modal-settings-option-container ${
            settings ? "visible" : "hidden"
          }`}
        >
          <p
            className="modal-settings-option"
            onClick={() => setWordStatus("unseen")}
          >
            Set Unseen
          </p>
          <p
            className="modal-settings-option"
            onClick={() => setWordStatus("seen")}
          >
            Set Seen
          </p>
          <p
            className="modal-settings-option"
            onClick={() => setWordStatus("learned")}
          >
            Set Learned
          </p>
          <p
            className="modal-settings-option"
            onClick={() => setWordStatus("mastered")}
          >
            Set Mastered
          </p>
        </div>
        {word.partOfSpeech === "verb" && (
          <button className="list-button-conjugations" onClick={handleClick}>
            {buttonName}
          </button>
        )}
        {conjugationToggle ? (
          <div className="conjugation-grid">
            {verbCon.length > 0 &&
              verbCon.map((conjugation, index) => (
                <div key={index} className="conjugation-item">
                  {formatConjugation(conjugation, tenses[index])}
                </div>
              ))}
          </div>
        ) : (
          <>
            <h3 className={modalClassName}>{word.germanWord}</h3>
            <p className="center list-modal-english">
              {word.englishTranslation}
            </p>
            <p className="center list-modal-part-of-speech">
              {word.partOfSpeech}
            </p>
            <AudioPlayer mp3FileName={mp3} />
            <p className="left list-modal-sentence">{word.exampleSentence}</p>
            <p className="left list-modal-sentence-en">
              {word.exampleSentenceEn}
            </p>
            <p className={wordStatusCSS}>{wordStatus}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default WordModalCard;
