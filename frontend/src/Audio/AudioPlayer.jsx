import React, { useState, useEffect, useRef} from "react";
import axios from "axios";
import { getBaseUrl } from "../util";

function AudioPlayer({ mp3FileName }) {
  const [audioUrl, setAudioUrl] = useState("");
  const audioRef = useRef(null);
  const baseURL = getBaseUrl();
  const encodedFileName = encodeURIComponent(mp3FileName);
  const apiKey = import.meta.env.VITE_API_KEY;
  
  // useEffect hook to fetch the MP3 file when the component mounts or when the file name changes
  useEffect(() => {
    async function fetchMp3() {
      try {
        const response = await axios.get(`${baseURL}/mp3/${encodedFileName}`, {
          headers: {
            'X-API-KEY': apiKey
          },
          responseType: 'blob' // Expect a blob response to handle binary data
        });
        // The response data is now a Blob object, which represents binary data in a form that JavaScript can handle
        const blob = new Blob([response.data], { type: "audio/mpeg" });
        // URL.createObjectURL() creates a DOMString containing a URL representing the Blob object
        // This URL can be used as a source for an HTML audio element
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      } catch (error) {
        console.error("Error fetching MP3:", error);
      }
    }

    fetchMp3();
   // Cleanup function to revoke the object URL when the component unmounts or the URL changes
    return () => {
      if (audioUrl) {
        // Revoke the object URL to free up memory
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [mp3FileName, encodedFileName]);
  
  // Function to toggle play/pause of the audio
  function togglePlay(event) {
    event.stopPropagation();
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }

  // Function to handle the end of the audio playback, sets time to zero
  function handleAudioEnded() {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }

  return (
    <div className="audio-button" style={{ marginTop: "15px" }}>
      <audio ref={audioRef} src={audioUrl} onEnded={handleAudioEnded} />
      <button
        style={{
          backgroundColor: "transparent",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
        }}
        onClick={togglePlay}
      >
        <i className="fa-solid fa-volume-high fa-2xl"></i>
      </button>
    </div>
  );
}

export default AudioPlayer;
