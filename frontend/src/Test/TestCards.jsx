import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Test.css";
import { ListContext } from "../Context/ListContext";
import { ScoreContext } from "../Context/ScoreContext";
import { getBaseUrl } from "../util";
import TestResult from "./TestResult";
import AudioPlayer from "../Audio/AudioPlayer";

// Component for testing 
function TestCards() {
  let navigate = useNavigate();
  const location = useLocation();
  const { flashcards } = location.state || {};
  const { list, updateList } = useContext(ListContext);
  const { storedScore, updateStoredScore } = useContext(ScoreContext);
  const [number, setNumber] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const selectedWord = flashcards[number];
  const [wordChoices, setWordChoices] = useState([]);
  const cardsAmount = flashcards.length;
  const [score, setScore] = useState([]);
  const baseURL = getBaseUrl();
  const apiKey = import.meta.env.VITE_API_KEY;
  const mp3 = selectedWord.id + "_" + selectedWord.germanWord + ".mp3";
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
  }
  
  useEffect(() => {
    // If finished update score context
    if (isFinished) {
      const newScore = {
        tests: storedScore.tests + 1,
        wordsTested: storedScore.wordsTested + cardsAmount,
        wordsCorrect: storedScore.wordsCorrect + score.filter(Boolean).length
      };
      updateStoredScore(newScore);
    }
    
  }, [isFinished]); 

  useEffect(() => {
    const fetchWordChoices = async () => {
      try {
        const promises = flashcards.map((flashcard) =>
          axios.get(
            `${baseURL}/test?partOfSpeech=${flashcard.partOfSpeech}&id=${flashcard.id}` // For each word returns 3 other words that have the same part of speech
            , {
              headers: {
                'X-API-KEY': apiKey
              }
            })
        );
        const responses = await Promise.all(promises);
        const shuffledChoices = responses.map((response, index) => // Shuffle options so correct word isn't always first
          shuffleArray([flashcards[index], ...response.data]) // Add the correct word into the 3 other words and shuffle
        ); 
        setWordChoices(shuffledChoices);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchWordChoices();
  }, []);

  const testWords = wordChoices[number];

  function next() {
    if (number < cardsAmount - 1) {
      setNumber((prevNumber) => prevNumber + 1);
    } else {
      setIsFinished(true);
    }
  }

  function prev() {
    if (number === 0) {
    } else {
      setNumber(number - 1);
    }
  }

  function handleChoice(english) {
    // Handle correct or wrong
    if (selectedWord.englishTranslation === english) {
      setScore([...score, true]);
      setWordStatus(true);
    } else {
      setScore([...score, false]);
      setWordStatus(false);
    }

    if (number < cardsAmount - 1) {
      next();
    } else {
      setIsFinished(true);
    }
  }

  function setWordStatus(isCorrect) {
    // Logic for updating word status
    const wordIndex = list.findIndex((item) => item.id === selectedWord.id);
    let newList = [...list]; 
  
    if (wordIndex === -1) {
      if (isCorrect) {
        // If the word is new and correct add it
        newList.push({ id: selectedWord.id, status: "seen" });
      }
      // if the word is incorrect do nothing
    } else {
      // if the word is not in the list
      const currentStatus = newList[wordIndex].status;  // find current status
      // if its correct upgrade it, if its wrong set to seen
      const nextStatus = isCorrect ? (currentStatus === "seen" ? "learned" : (currentStatus === "learned" ? "mastered" : currentStatus)) : "seen";
      newList[wordIndex] = { ...newList[wordIndex], status: nextStatus };
    }
  
    updateList(newList);
  }
  

  const correctAnswers = score.filter(Boolean).length;

  if (isFinished) {
    // Render results if finished
    return (
      <div className="finished-test-container">
        <h1>Finished!</h1>
        <h2 style={{ textAlign: "center" }}>Here's your score:</h2>
        <p style={{ textAlign: "center", fontSize: "20px" }}>
          You got{" "}
          <b>
            {correctAnswers}/{flashcards.length}
          </b>{" "}
          right
        </p>
        {flashcards.map((word, index) => (
          <div key={index}>
            <TestResult
              german={word.germanWord}
              english={word.englishTranslation}
              isCorrect={score[index]}
            />
          </div>
        ))}
        <div className="test-buttons">
          <button className="test-button" onClick={() => navigate("/home")}>
            Home
          </button>
          <button className="test-button" onClick={() => navigate("/test")}>
            Take another test
          </button>
          <button className="test-button" onClick={() => navigate("/stats")}>
            See Stats
          </button>
        </div>
      </div>
    );
  }
  return (
      <div className="test-wrapper">
        <div className="test-word-wrapper">
          <button className="next-button dis" disabled={number===0} onClick={prev}>
            {"<"}
          </button>
          <h1>{selectedWord.germanWord}</h1>
          <AudioPlayer mp3FileName={mp3}/>
          <button className="next-button" onClick={next}>
            {">"}
          </button>
        </div>
        <div className="test-input-wrapper">
          <p>Select the correct word</p>
          {testWords?.map((word) => (
            <button className="option-buttons"
              key={word.id}
              onClick={() => handleChoice(word.englishTranslation)}
            >
              {word.englishTranslation}
            </button>
          )) || <p>Loading...</p>}
        </div>
      </div>
  );
}

export default TestCards;