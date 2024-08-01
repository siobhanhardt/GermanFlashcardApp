import React, { useState } from "react";
import EmailModal from "./EmailModal";

export default function EmailAlert({ word }) {
  const [isOpen, setIsOpen] = useState(false);
  
  if (isOpen) {
    return (
      <div >
        <i
          className="fa-solid fa-circle-exclamation fa-2x"
          onClick={() => setIsOpen(!isOpen)}
        ></i>
        <EmailModal word={word} setIsOpen={setIsOpen} />
      </div>
    );
  }
  return (
    <div>
      <i
        className="fa-solid fa-circle-exclamation fa-2x"
        onClick={() => setIsOpen(!isOpen)}
      ></i>
    </div>
  );
}
