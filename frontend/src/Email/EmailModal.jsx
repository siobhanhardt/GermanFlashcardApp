import React, { useState, useRef} from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from "../Reuseable/Dropdown";
import { getBaseUrl } from "../util";
import "./Email.css";

export default function EmailModal({ word, setIsOpen }) {
  const [issue, setIssue] = useState();
  const [isError, setIsError] = useState(false);
  const messageRef = useRef();
  const baseURL = getBaseUrl();
  const apiKey = import.meta.env.VITE_API_KEY;
  const issueList = [
    "German word",
    "English Translation",
    "German Example Sentence",
    "English Example Sentence",
    "Other",
  ];

  const email = {
    word: "",
    issue: "",
    message: "",
  };

  function handleIssueChange(option) {
    setIssue(option);
  }

  function handleSend() {
    email.word = word; // Passed from email alert, which is passed from WordModalCard
    email.issue = issue;
    email.message = messageRef.current.value;
    const apiUrl = `${baseURL}/send-email`;
      // POST request with email object
      axios
        .post(apiUrl, email, {
          headers: {
            'X-API-KEY': apiKey
          }
        })
        .then(() => {
          setIsOpen(false); //Close modal
          setIsError(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setIsError(true);
        });
    if (!isError) {
      toast.success("Email sent successfully!");
    } else {
      toast.error("Failed to send email");
    }
  }
  return (
    <div className="email-modal">
      <h2 className="email-title">Report issue with word</h2>
      <p style={{ textAlign: "center", padding: "10px" }}>
        Word with issue: <b>{word}</b>
      </p>
      <div className="dropdown-container">
        <Dropdown
          dropdownList={issueList}
          startWord={"Choose Issue"}
          onDropDownChange={handleIssueChange}
          fontSize={"15px"}
        />
        <textarea
          ref={messageRef}
          rows="6"
          cols="30"
          placeholder="Comments..."
        ></textarea>
        <div>
          <button className="send-button" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={false}
        hideProgressBar={true}
        closeOnClick
      />
    </div>
  );
}
