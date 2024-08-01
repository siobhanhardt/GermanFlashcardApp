import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { getRandomObjects, getBaseUrl } from "../util";
import "./Practice.css";
import { ListContext } from "../Context/ListContext";
import ThemeToggle from "../Reuseable/ThemeToggle";

// Component that lets users select the cards they want to practice or test
function Selection() {
  const location = useLocation();
  let navTo = "";

  if (location.pathname === "/practice") {
    // Determine the navigation path based on the current route
    navTo = "/flashcards";
  } else {
    navTo = "/test-cards";
  }

  const apiKey = import.meta.env.VITE_API_KEY;
  let navigate = useNavigate();
  const { list, updateList } = useContext(ListContext);
  const [cardsAmount, setCardsAmount] = useState(10);
  const [flashcards, setFlashCards] = useState([]);
  const [selection, setSelection] = useState(["random", "fixed"]);
  const [range, setRange] = useState([1, 10]);
  const [checkDisabled, setCheckDisabled] = useState(true);
  const [startDisabled, setStartDisabled] = useState(true);
  const [style, setStyle] = useState({ cursor: "not-allowed" });
  const [isLoading, setIsLoading] = useState(true);
  const [loadingTimeout, setLoadingTimeout] = useState(null);
  const rangeStart = useRef(1);
  const rangeEnd = useRef(10);
  const [types, setTypes] = useState({
    noun: true,
    pronoun: true,
    conjunction: true,
    verb: true,
    adjective: true,
    adverb: true,
    other: true,
    numeral: true,
    preposition: true,
    unseen: true,
    seen: true,
    learned: true,
    mastered: true,
  });

  const options = [
    "noun",
    "pronoun",
    "conjunction",
    "verb",
    "adjective",
    "preposition",
    "adverb",
    "numeral",
    "other",
  ];
  const statusFilters = ["unseen", "seen", "learned", "mastered"];

  useEffect(() => {
    const enabledTypes = Object.entries(types)
      .filter(([type, isEnabled]) => isEnabled && !statusFilters.includes(type)) // Filter out the statuses and get enabled types
      .map(([type]) => type); // Extract the type names

    // Check if no types are selected
    const noSelection =
      Object.entries(types)
        .filter(([type, isEnabled]) => isEnabled)
        .map(([type]) => type).length === 0;

    if (noSelection) {
      // If there are no types selected, set flashcards to empty and disable the start button
      setFlashCards([]);
      setStartDisabled(true);
      return;
    } else {
      setStartDisabled(false);
    }

    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 1000);
    setLoadingTimeout(timer); // Store the timer ID to clear it later

    // Case for if other is selected
    const otherIndex = enabledTypes.indexOf("other");
    const baseURL = getBaseUrl();
    if (otherIndex !== -1) {
      // If other is selected
      enabledTypes[otherIndex] = "interjection"; // Replace other with interjection
      enabledTypes.push("article"); // Add article
    }

    // Create query parameters for API request
    const queryParams = enabledTypes
      .map((type) => `partOfSpeech=${encodeURIComponent(type)}`)
      .join("&");

    let url = `${baseURL}/types?${queryParams}`;

    if (enabledTypes.length === 0) {
      // If no types selected, use a default URL
      url = `${baseURL}/words`;
    }

    axios
      .get(url, {
        headers: {
          "X-API-KEY": apiKey,
        },
      })
      .then((response) => {
        const filteredData = filterData(response.data, types);
        setFlashCards(filteredData);
        setStartDisabled(filteredData.length === 0); // Disable the start button if no flashcards are found
        clearTimeout(timer);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        clearTimeout(timer);
        setIsLoading(false);
      });
  }, [types]); // This effect runs whenever 'types' changes

  // Cleanup function to clear loading timeout when component unmounts
  useEffect(() => {
    return () => {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
    };
  }, [loadingTimeout]);

  // Function to filter flashcards based on selected status options
  function filterData(data, selectedOptions) {
    let filteredByStatus = data;
    // Check if any status filter is selected
    if (statusFilters.some((filter) => selectedOptions[filter])) {
      filteredByStatus = data.filter((flashcard) => {
        const listItem = list.find((item) => item.id === flashcard.id);
        const status = listItem ? listItem.status : "unseen"; // Get the status, if it doesn't exist, set to unseen
        return selectedOptions[status] === true; // Return true if the status is selected
      });
    }
    return filteredByStatus;
  }

  // Function to handle changes when pick random or choose
  function handleChange(event) {
    const value = event.target.value; // Get the value of the selected radio button
    if (value === "random" || value === "choose") {
      setSelection([value, selection[1]]); // Update the selection state
    } else {
      setSelection([selection[0], value]);
    }

    if (value === "random") {
      setStyle({ cursor: "not-allowed" });
      setCheckDisabled(true);
      setTypes({
        noun: true,
        pronoun: true,
        conjunction: true,
        verb: true,
        adjective: true,
        adverb: true,
        other: true,
        numeral: true,
        preposition: true,
        unseen: true,
        seen: true,
        learned: true,
        mastered: true,
      });
      setStartDisabled(false);
    } else if (value === "choose") {
      setStyle({ cursor: "pointer" });
      setCheckDisabled(false);
    }
  }

  function handleTypeChange(event) {
    const updatedTypes = {
      ...types,
      [event.target.name]: event.target.checked,
    };
    setTypes(updatedTypes);
  }

  function handleClear() {
    const clearedItems = {};
    setTypes(clearedItems);
    setFlashCards([]);
    setStartDisabled(true);
  }

  function handleStart() {
    if (selection[1] === "fixed") {
      const count = Math.min(cardsAmount, flashcards.length);
      const random = getRandomObjects(flashcards, count); // Take random selection out of selection
      navigate(`${navTo}`, { state: { flashcards: random } }); // Pass flashcards to PracticeCards
    } else {
      const rangeSelection = flashcards.slice(range[0] - 1, range[1]);
      navigate(`${navTo}`, { state: { flashcards: rangeSelection } }); // Pass flashcards to PracticeCards
    }
  }
  function handleRangeChange() {
    let max = flashcards.length;
    let start = rangeStart.current ? parseInt(rangeStart.current.value, 10) : 1;
    let end = rangeEnd.current ? parseInt(rangeEnd.current.value, 10) : max;

    // Validate and adjust the start value
    if (isNaN(start) || start < 1) start = 1;
    if (start > max - 1) start = max - 1;

    // Validate and adjust the end value
    if (isNaN(end) || end > max) end = max;
    if (end < 2) end = 2;

    // Ensure start is less than end
    if (start >= end) start = end - 1;
    if (end <= start) end = start + 1;

    setRange([start, end]);

    // Update input values to reflect changes
    if (rangeStart.current) rangeStart.current.value = start;
    if (rangeEnd.current) rangeEnd.current.value = end;
  }

  return (
    <>
    <ThemeToggle />
      <div className="practice-container">
        <p className="selection-title">Practice</p>
        <div className="range-selection-container">
          <div className="range-selection">
            <form>
              <label className="range-selection-label">
                <input
                  type="radio"
                  value="fixed"
                  checked={selection[1] === "fixed"}
                  onChange={handleChange}
                  className="radio-button"
                />
                {cardsAmount} Random Cards
              </label>
              <label className="range-selection-label">
                <input
                  type="radio"
                  value="range"
                  checked={selection[1] === "range"}
                  onChange={handleChange}
                  className="radio-button"
                />
                Specify Range
              </label>
            </form>
          </div>
          {selection[1] === "fixed" ? (
            <div className="card-amount">
              {[10, 20, 30, 40, 50].map((amount) => (
                <button
                  key={amount}
                  className={
                    "amount-button " + (amount === cardsAmount ? "clicked" : "")
                  }
                  onClick={() => setCardsAmount(amount)}
                >
                  {amount}
                </button>
              ))}
            </div>
          ) : (
            <>
              <p className="range-paragraph">Ordered by most used words</p>
              <div className="specify-range-container">
                <input
                  type="number"
                  value={range[0]}
                  ref={rangeStart}
                  onChange={handleRangeChange}
                />
                <p style={{ fontSize: "3vh" }}>-</p>
                <input
                  type="number"
                  value={range[1]}
                  ref={rangeEnd}
                  onChange={handleRangeChange}
                />
              </div>
            </>
          )}
        </div>
        <div className="word-type-container">
          <div className="random">
            <form>
              <label className="radio-button-label">
                <input
                  type="radio"
                  value="random"
                  checked={selection[0] === "random"}
                  onChange={handleChange}
                  className="radio-button"
                />
                All
              </label>
              <label className="radio-button-label">
                <input
                  type="radio"
                  value="choose"
                  checked={selection[0] === "choose"}
                  onChange={handleChange}
                  className="radio-button"
                />
                Choose
              </label>
            </form>
          </div>
          <div className="header-flex">
            <p className="selection-type">Word Type: </p>
            <button onClick={handleClear} className="clear-all">
              x Clear All
            </button>
          </div>
          <ul className="word-type">
            {options.map((option, index) => (
              <li key={index}>
                <label>
                  <input
                    type="checkbox"
                    name={option}
                    checked={types[option] || false}
                    onChange={handleTypeChange}
                    disabled={checkDisabled}
                    style={style}
                    className="check"
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
          <p className="selection-type">Learning Status: </p>
          <ul className="word-type">
            {statusFilters.map((option, index) => (
              <li key={index}>
                <label>
                  <input
                    type="checkbox"
                    name={option}
                    checked={types[option] || false}
                    onChange={handleTypeChange}
                    disabled={checkDisabled}
                    style={style}
                    className="check"
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
        {isLoading ? (
          <div style={{ textAlign: "center", fontSize: "4vh" }}>Loading...</div>
        ) : (
          <button
            className="start-button"
            onClick={handleStart}
            disabled={startDisabled}
          >
            Start
          </button>
        )}
      </div>
    </>
  );
}

export default Selection;
