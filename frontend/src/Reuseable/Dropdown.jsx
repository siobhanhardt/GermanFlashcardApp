import React, { useState} from "react";
import "./Dropdown.css";

// Dropdown Component used across app
function Dropdown({ dropdownList, startWord, onDropDownChange, fontSize}){
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(startWord);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function handleSortChange(option) {
    // Removes the startword once a choice has been made
    if(option !== startWord) {
      setSelectedOption(option);
      onDropDownChange(option);
      setIsOpen(false);
    }   
  }

  return (
    <div className="dropdown">
      <div style={{fontSize: fontSize}}className="dropdown-selected" onClick={toggleDropdown}>
        {selectedOption} <span className="arrow">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {dropdownList.map((option) => (
            <li key={option} onClick={() => handleSortChange(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;