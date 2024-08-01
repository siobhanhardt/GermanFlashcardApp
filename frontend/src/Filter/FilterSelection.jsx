import React, { useState } from "react";
import "./Filter.css";

// Component specifically for filtering options, word types and word statuses as checkboxes
function FilterSelection({ onSelectionChange }) {
  const [checkedItems, setCheckedItems] = useState({});
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
  const wordStatuses = ["unseen", "seen", "learned", "mastered"];

  function handleChange(event) { // Adds and removes word types or word statuses from selectedOptions in WordListDataManage
    const updatedCheckedItems = {
      ...checkedItems, 
      [event.target.name]: event.target.checked,
    };
    setCheckedItems(updatedCheckedItems);
    onSelectionChange(updatedCheckedItems);
  }
  function handleClear() {
    const clearedItems = {};
    setCheckedItems(clearedItems);
    onSelectionChange(clearedItems);
  }

  return (
    <div className="selection-container">
      <button className="clearall-button" onClick={handleClear}>x Clear All</button>
      <p className="filter-selection-title">Word Types: </p>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                name={option}
                className="checkbox" 
                checked={checkedItems[option] || false}
                onChange={handleChange}
              />
              <span className="checkbox-label">{option}</span> 
            </label>
          </li>
        ))}
      </ul>
      <ul>
        <p className="filter-selection-title">Learning Status: </p>
        {wordStatuses.map((option, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                name={option}
                className="checkbox" 
                checked={checkedItems[option] || false}
                onChange={handleChange}
              />
              <span className="checkbox-label">{option}</span> 
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}  

export default FilterSelection;
