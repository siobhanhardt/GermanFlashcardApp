import React, { useState } from "react";
import Dropdown from "../Reuseable/Dropdown";
import "./Filter.css";
import FilterSelection from "./FilterSelection";
import ThemeToggle from "../Reuseable/ThemeToggle";
import { isMobile } from "react-device-detect";

// Handles the popout filter panel visuals, FilterSelection handles filtering options
function FilterPanel({
  onSortChange,
  onSelectionChange,
  onSearchChange,
  onHowManyChange,
  searchOption,
  setFilterOpen,
  setIsGrid,
}) {
  const sortOptions = ["A - Z", "Z - A", "Most Common", "Least Common"];
  const [inputValue, setInputValue] = useState(searchOption);

  function handleSortChange(sortOption) {
    onSortChange(sortOption);
  }

  function handleSelectionChange(selectionOption) {
    onSelectionChange(selectionOption);
  }

  function handleHowManyChange(manyOption) {
    onHowManyChange(manyOption);
  }

  function handleSearch(event) {
    setInputValue(event.target.value);
    onSearchChange(event.target.value);
  }

  function handleSpecChar(char) {
    // Handles special german characters buttons in search box
    const newValue = inputValue + char;
    setInputValue(newValue);
    onSearchChange(newValue);
  }

  function clearSearch() {
    setInputValue("");
    onSearchChange("");
  }

  return (
    <div className="filter-container">
      <ThemeToggle />
      <h2 className="filter-title">Filter</h2>
      <div
        className="filter-panel-close-button"
        onClick={() => setFilterOpen(false)}
      >
        <i className="fa-solid fa-xmark fa-2xl"></i>
      </div>
      <div className="search-bar-wrapper">
        <input
          className="search-bar"
          value={inputValue}
          onChange={handleSearch}
          placeholder="Search..."
        />
        {inputValue && (
          <button className="search-clear-button" onClick={clearSearch}>
            X
          </button>
        )}
      </div>
      <div className="special-char-button">
        <button onClick={() => handleSpecChar("ä")}>ä</button>
        <button onClick={() => handleSpecChar("ö")}>ö</button>
        <button onClick={() => handleSpecChar("ü")}>ü</button>
        <button onClick={() => handleSpecChar("ß")}>ß</button>
      </div>
      <div style={{ marginLeft: "20px" }}>
        <Dropdown
          dropdownList={sortOptions}
          startWord="Sort"
          onDropDownChange={handleSortChange}
          fontSize="20px"
        />
      </div>
      <FilterSelection onSelectionChange={handleSelectionChange} />
      {!isMobile && (
        // Only show grid options and how many per page option on desktop
        <>
          <div style={{ marginLeft: "20px" }}>
            <Dropdown
              dropdownList={["10", "25", "50", "100", "All"]}
              startWord="How Many"
              onDropDownChange={handleHowManyChange}
              fontSize="20px"
            />
          </div>
          <div style={{ marginLeft: "8px" }}>
            <button onClick={() => setIsGrid(true)} style={{ backgroundColor:"transparent"}}>
              <i className="fa-solid fa-table-cells fa-2xl"></i>
            </button>
            <button onClick={() => setIsGrid(false)} style={{ backgroundColor:"transparent"}}>
              <i className="fa-solid fa-list-ul fa-2xl"></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default FilterPanel;
