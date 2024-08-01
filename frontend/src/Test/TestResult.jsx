import React from "react";
import "./Test.css";

// Component for rendering word cards at results
function TestResult({ german, english, isCorrect}) {

    const correct = isCorrect ? "correct" : "incorrect";
    
    const css = "test-card-result " + correct;

    return <div className={css}>
    <b className="german">{german}</b>
    <p className="english">{english}</p>
  </div>;
}

export default TestResult;
