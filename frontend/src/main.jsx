import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ListProvider } from "./Context/ListContext";
import "./index.css";
import { ScoreProvider } from "./Context/ScoreContext.jsx";
import Slider from "./Practice/Slider.jsx";
import { UserProvider } from "./Context/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ListProvider>
    <ScoreProvider>
      <UserProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </UserProvider>
    </ScoreProvider>
  </ListProvider>
);
