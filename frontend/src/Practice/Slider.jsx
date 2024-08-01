import React, { useState, useEffect, useContext } from "react";
import { ListContext } from "../Context/ListContext";
import { isMobile } from "react-device-detect";
import { useSwipeable } from "react-swipeable";
import "./Slider.css"; 
import FlashCard from "./FlashCard";

function Slider({ flashcards, setIsFinished }) {
  const { list, updateList } = useContext(ListContext);
  const [active, setActive] = useState(0);
  const [isGermanFirst, setIsGermanFirst] = useState(true);
  const showButtons = !isMobile; 
  const items = flashcards;

  const handlers = useSwipeable({
    // Allow to swipe on mobile
    onSwipedLeft: () => next(),
    onSwipedRight: () => prev(),
    preventDefaultTouchmoveEvent: true, 
    trackMouse: true, 
  });

  function next() {
    if (active === flashcards.length - 1) {
      setIsFinished(true);
    } else {
      setActive((prev) => prev + 1);
    }
    setWordStatus("seen");
  }

  function prev() {
    setActive(Math.max(active - 1, 0));
  }

  function setWordStatus(status) {
    // Function for updating word status
    const wordIndex = list.findIndex(
      (item) => item.id === flashcards[active].id
    );

    let newList = [...list]; // Copy the list for immutability
    if (wordIndex !== -1) {
      // If word is already in the list
      const existingStatus = newList[wordIndex].status;
      if (
        status === "seen" &&
        (existingStatus === "learned" || existingStatus === "mastered")
      ) {
        // If trying to set to 'seen' but it's already 'learned' or 'mastered', do nothing
      } else {
        // Otherwise update the status
        newList[wordIndex] = { ...newList[wordIndex], status };
      }
    } else {
      // If word is new to the list, add it
      newList.push({ id: flashcards[active].id, status });
    }

    updateList(newList); // Update the context with the new list
  }

  useEffect(() => {
    // styling for sliders
    const sliders = document.querySelectorAll(".item");
    sliders.forEach((slider, index) => {
      let stt = index - active;
      let scale = 1 - 0.2 * Math.abs(stt);
      let opacity = Math.abs(stt) > 1 ? 0 : 0.6 - 0.2 * Math.abs(stt);
      let translateX = 150 * stt;
      let rotateY = stt === 0 ? 0 : stt > 0 ? -1 : 1;
      let filter = stt === 0 ? "none" : "blur(8px) contrast(97%)";
      let zIndex = -Math.abs(stt);

      slider.style.transform = `translateX(${translateX}px) scale(${scale}) perspective(30px) rotateY(${rotateY}deg)`;
      slider.style.zIndex = zIndex;
      slider.style.opacity = stt === 0 || Math.abs(stt) === 1 ? 1 : opacity;
      slider.style.filter = filter;
    });
  }, [active]);

  return (
    <div className="card-container" {...handlers}>
      <div className="progress-bar">
        <label htmlFor="progressBar">
          {active + 1}/{flashcards.length}
        </label>
        <progress
          id="progressBar"
          value={active + 1}
          max={flashcards.length}
        ></progress>
      </div>
      <button
        className="german-toggle-button"
        onClick={() => setIsGermanFirst(!isGermanFirst)}
      >
        {isGermanFirst ? "German" : "English"}
      </button>
      <div className="slider">
        {items.map((item, index) => (
          <div key={item.id} className="item">
            <FlashCard key={item.id} word={item} german={isGermanFirst} />
          </div>
        ))}
        {showButtons && (
          <>
            <button id="prev" className="slider-prev" disabled={active===0} onClick={prev}>
              &lt;
            </button>
            <button id="next" className="slider-next" onClick={next}>
              &gt;
            </button>
          </>
        )}
      </div>
      <div className="state-buttons-wrapper">
        <button
          className="state-button learned"
          onClick={() => setWordStatus("learned")}
        >
          Mark Learned
        </button>
        <button
          className="state-button mastered"
          onClick={() => setWordStatus("mastered")}
        >
          Mark Mastered
        </button>
      </div>
    </div>
  );
}

export default Slider;
