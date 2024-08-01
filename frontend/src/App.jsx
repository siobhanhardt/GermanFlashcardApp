import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import WordListDataManage from "./WordList/WordListDataManage";
import Start from "./Start/Start";
import Selection from "./Practice/Selection";
import PracticeCards from "./Practice/PracticeCards";
import TestCards from "./Test/TestCards";
import Statistics from "./Statistics/Statistics";
import Home from "./Start/Home";
import User from "./Login/User";
import NavBar from "./Navbar/NavBar";
import { isMobile } from "react-device-detect";

function App() {
  const location = useLocation();
  const noNavBarRoutes = ["/", "/home"];
  const noUserRoutes = ["/"];

  const showNavBar = !isMobile && !noNavBarRoutes.includes(location.pathname); // Don't show navbar on home and start page
  const showUser = !noUserRoutes.includes(location.pathname); // Dont show user on landing page

  return (
    <>
      {showNavBar && <NavBar />}
      {showUser && <User />}
      <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/home" element={<Home />} />
          <Route path="/practice" element={<Selection />} />
          <Route path="/all-words" element={<WordListDataManage />} />
          <Route path="/flashcards" element={<PracticeCards />} />
          <Route path="/test" element={<Selection />} />
          <Route path="/test-cards" element={<TestCards />} />
          <Route path="/stats" element={<Statistics />} />
          </Routes>
          </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
