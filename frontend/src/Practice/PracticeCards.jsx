import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Practice.css";
import ThemeToggle from "../Reuseable/ThemeToggle";
import Slider from "./Slider";

// Component that wraps the slider component
function PracticeCards() {
  let navigate = useNavigate();
  const location = useLocation();
  const { flashcards } = location.state || {}; // Flashcards passed from Selection Component
  const [isFinished, setIsFinished] = useState(false); // USed to conditionally render end screen

  function repeatCards() {
    setIsFinished(false);
  }

  if (isFinished) {
    return (
      <div className="finished-container">
        <ThemeToggle />
        <h1>Finished!</h1>
        <div className="practice-end-buttons">
          <button onClick={repeatCards}>Repeat these cards</button>
          <button onClick={() => navigate("/practice")}>New Cards</button>
          <button onClick={() => navigate("/home")}>Home</button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <ThemeToggle />
      <Slider flashcards={flashcards} setIsFinished={setIsFinished} />
    </div>
  );
}

export default PracticeCards;
