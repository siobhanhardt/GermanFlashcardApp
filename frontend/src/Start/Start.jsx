import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Start.css";
import ThemeToggle from "../Reuseable/ThemeToggle";
import LoginSignup from "../Login/LoginSignup";
import { UserContext } from "../Context/UserContext";

// Landing Page - Login or Start
function Start() {
  const { user, setUser } = useContext(UserContext); //User context to be used around application
  const [loginModal, setLoginModal] = useState(false);
  let navigate = useNavigate(); 

  return (
    <div className="start-container">
      <ThemeToggle />
      <div className="title-container">
        <h1 className="title _1001">1001</h1>
        <div className="title-subcontainer">
          <h1 className="title german">German</h1>
          <h1 className="title words">Words</h1>
        </div>
      </div>
      <img src={logo} alt="logo" />{" "}
      <div className="start-button-container">
        <button onClick={() => navigate("/home")} className="practice-button">
          Start
        </button>
        <button className="practice-button" onClick={() => setLoginModal(true)}>
          Login
        </button>
      </div>
      {loginModal && (
        <>
          <LoginSignup
            modalIsOpen={loginModal}
            setModalIsOpen={setLoginModal}
            setUser={setUser}
            isHomePage={true}
          />
        </>
      )}
    </div>
  );
}

export default Start;
