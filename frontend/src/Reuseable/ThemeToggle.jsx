import React, { useEffect, useState } from "react";
import "./ThemeToggle.css";

// Component used across app for toggling light or dark mode 
function ThemeToggle({ top, left }) {
  // Default values for 'top' and 'left' if not provided
  const topValue = top === undefined ? "10px" : top; 
  const leftValue = left === undefined ? "10px" : left;

  // Retrieve the stored theme from localStorage, or determine default theme based on system preference
  const storedTheme = localStorage.getItem("theme");
  const defaultTheme =
    storedTheme ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  const [theme, setTheme] = useState(defaultTheme);
  
  // Apply the current theme to the document and store it in localStorage
  useEffect(() => {
    console.log(`Applying theme: ${theme}`);
    // Apply the current theme to the root HTML element
    document.documentElement.className = theme;
    // Save the current theme in localStorage for persistence
    localStorage.setItem("theme", theme);
  }, [theme]); // Runs whenever 'theme' changes

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="toggle-container" style={{top:topValue, left: leftValue}}>
      <button
        className={`toggle-button ${theme === "dark" ? "dark" : ""}`}
        onClick={toggleTheme}
      >
        <div className={`thumb ${theme === "dark" ? "dark" : ""}`}></div>
      </button>
    </div>
  );
}

export default ThemeToggle;
