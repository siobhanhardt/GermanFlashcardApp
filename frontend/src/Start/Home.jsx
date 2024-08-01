import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Start.css";
import ThemeToggle from "../Reuseable/ThemeToggle";

// Component for navigation
function Home() {
  let navigate = useNavigate(); 
  return (
    <div className="start-container">
      <ThemeToggle />
      <img src={logo} alt="logo" />{" "}
      <div className="home-button-container">
        <button
          onClick={() => navigate("/practice")}
          className="home-button"
        >
          Practice
        </button>
        <button
          onClick={() => navigate("/all-words")}
          className="home-button"
        >
          All Words
        </button>
        <button onClick={() => navigate("/test")} className="home-button">
          Test
        </button>
        <button onClick={() => navigate("/stats")} className="home-button">
          Stats
        </button>
      </div>
    </div>
  );
}

export default Home;
