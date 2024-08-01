import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import "./WordList.css";
import WordList from "./WordList";
import FilterPanel from "../Filter/FilterPanel";
import WordModalCard from "./WordModalCard";
import { ListContext } from "../Context/ListContext";
import { UserContext } from "../Context/UserContext";
import { getBaseUrl } from "../util";

// Component that handles logic for sorting and filtering words in word list
function WordListDataManage() {
  const [flashcards, setFlashcards] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [sortOption, setSortOption] = useState("Sort");
  const [searchOption, setSearchOption] = useState("");
  const [selectedWord, setSelectedWord] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [howMany, setHowMany] = useState("10");
  const [isGrid, setIsGrid] = useState(false);
  const { list, updateList } = useContext(ListContext);
  const { user, setUser } = useContext(UserContext);
  const [filterOpen, setFilterOpen] = useState(false);
  const filterPanelRef = useRef();
  const apiKey = import.meta.env.VITE_API_KEY;
  const baseURL = getBaseUrl();
  
  //let flashcards = [];
  // fetch flashcards data on component mount or user change
  useEffect(() => {
    const fetchData = async () => {
        try {
          setIsLoading(true); // used for displaying a loading message as it can take a few seconds
          const response = await axios.get(`${baseURL}/words`, {
            headers: {
              'X-API-KEY': apiKey
            }
          });
          setFlashcards(response.data); // never changes
          setSortedData(response.data); // what gets passed to the wordlist
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      };

    fetchData();
  }, [user]);

  useEffect(() => {
    applySortAndFilter(flashcards, selectedOptions);
  }, [selectedOptions, sortOption, list, searchOption]);

  function applySortAndFilter(data, selectedOptions) {
    // Filter the data based on selected options.
    let result = filterData(data, selectedOptions);
    // Sort the filtered data based on the sort option.
    result = sortData(result);
    setSortedData(result);
  }

  function filterData(data, selectedOptions) {
    const partOfSpeechFilters = [
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

    // initialize the filtered data to the original data set.
    let filteredByPartOfSpeech = data;
    
    // Check if any part of speech filter is selected.
    if (partOfSpeechFilters.some((filter) => selectedOptions[filter])) {
      // Filter the data based on the selected part of speech options.
      filteredByPartOfSpeech = data.filter(
        (flashcard) =>
          selectedOptions[flashcard.partOfSpeech] ||
          // if selected option is 'other' filter by interjection and article
          (selectedOptions["other"] &&
            (flashcard.partOfSpeech === "interjection" ||
              flashcard.partOfSpeech === "article"))
      );
    }

    const statusFilters = ["unseen", "seen", "learned", "mastered"];
    // Initialize the filtered data to the data filtered by part of speech.
    let filteredByStatus = filteredByPartOfSpeech;
    // Check if any status filter is selected.
    if (statusFilters.some((filter) => selectedOptions[filter])) {
      filteredByStatus = filterByStatus(
        filteredByPartOfSpeech,
        selectedOptions,
        list
      );
    }
    // Initialize the final filtered data to the data filtered by status.
    let filterBySearch = filteredByStatus;
    // Check if there is a search term entered.
    if (searchOption.length !== 0) {
      // Filter the data based on the search term matching the German word.
      filterBySearch = filteredByStatus.filter((flashcard) => {
        const german = flashcard.germanWord.toLowerCase();
        return german.includes(searchOption.toLowerCase());
      });
    }
    return filterBySearch;
  }

  function filterByStatus(data, selectedOptions, list) {
    // Filters the data by learning status
    return data.filter((flashcard) => {
      // Find the corresponding item in the list context by matching IDs.
      const listItem = list.find((item) => item.id === flashcard.id);
      // Determine the status of the flashcard. If not found in the list, default to "unseen".
      const status = listItem ? listItem.status : "unseen";
      // Check if the selected options include this status and return true if it should be included.
      return selectedOptions[status] === true;
    });
  }

  function sortData(data) {
    let sorted = [...data];

    switch (sortOption) {
      case "A - Z":
        sorted.sort((a, b) => a.germanWord.localeCompare(b.germanWord));
        break;
      case "Z - A":
        sorted.sort((a, b) => b.germanWord.localeCompare(a.germanWord));
        break;
      case "Most Common":
        sorted.sort((a, b) => b.frequency - a.frequency);
        break;
      case "Least Common":
        sorted.sort((a, b) => a.frequency - b.frequency);
        break;
      default:
        break;
    }
    return sorted;
  }

  function handleSelectionChange(selected) {
    setSelectedOptions(selected);
  }

  function handleSortChange(option) {
    setSortOption(option);
  }
  function handleSearchChange(option) {
    setSearchOption(option);
  }
  function handleHowManyChange(option) {
    setHowMany(option)
  }
  function handleModalSelect(id) {
    console.log(flashcards)
    const word = flashcards.find((card) => card.id === id);
    setSelectedWord(word);
  }
  function handleClose() {
    setSelectedWord(null);
  }

  return (
    <div className="container">
      <div className="word-list-title-container">
        <div
          className="filter-panel-button"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <i className="fa-solid fa-bars fa-2xl"></i>
        </div>
        <h1 className="flashcard-list-title">Word List</h1>
      </div>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className={`filter-panel ${filterOpen ? "open" : ""}`} ref={filterPanelRef}> 
            <FilterPanel
              onSortChange={handleSortChange}
              onSelectionChange={handleSelectionChange}
              onSearchChange={handleSearchChange}
              onHowManyChange={handleHowManyChange}
              searchOption={searchOption}
              setFilterOpen={setFilterOpen}
              setIsGrid={setIsGrid}
            />
          </div>
          <WordList wordData={sortedData} onModalSelect={handleModalSelect} howMany={howMany} isGrid={isGrid}/>
          {selectedWord && (
            <WordModalCard word={selectedWord} onClose={handleClose} />
          )}
        </>
      )}
    </div>
  );
}

export default WordListDataManage;
