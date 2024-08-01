import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import "./Login.css";

// Component that lets you login or signup 
function LoginSignup({ modalIsOpen, setModalIsOpen, setUser, isHomePage }) {
  const [isLogin, setIsLogin] = useState(true); // Handles Login or Signup Button
  let navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // If a user is logged in, set the user state
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  function loginModal() {
    setModalIsOpen(!modalIsOpen);
  }

  function changeLoginSignup() {
    setIsLogin(!isLogin);
  }

  function handleLoginSuccess(user) {
    setUser(user);
    setModalIsOpen(false);
    if (isHomePage) {
      navigate("/home");
    }
  }

  return (
    <>
      {modalIsOpen && (
        <div className="signup-container">
          <div className="signup-modal">
            <button className="signup-modal-close" onClick={loginModal}>
              <i className="fa fa-close fa-2x" />
            </button>
            <div className="login-modal">
              {isLogin ? (
                <LoginForm onLoginSuccess={handleLoginSuccess} />
              ) : (
                <SignupForm onSignupSuccess={handleLoginSuccess} />
              )}
              <button
                onClick={changeLoginSignup}
                className="signup-switch-button"
              >
                {isLogin
                  ? "Don't have an account? Create one"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginSignup;
