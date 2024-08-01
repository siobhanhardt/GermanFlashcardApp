import React, { useState, useEffect, useContext } from "react";
import { ListContext } from "../Context/ListContext";
import { ScoreContext } from "../Context/ScoreContext";
import { logOut } from "./authFunctions";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import "./Login.css";
import LoginSignup from "./LoginSignup";
import { UserContext } from "../Context/UserContext";

function User() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { handleLogout: handleListLogout } = useContext(ListContext);
  const { handleLogout: handleScoreLogout } = useContext(ScoreContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
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

  async function handleLogout() {
    const result = await logOut();
    if (result.success) {
      setUser(null); 
      handleListLogout();
      handleScoreLogout();
    } else {
      console.error("Logout failed:", result.error);
    }
  }
  return (
    <>
      {user ? (
        <div className="user-name">
          <span>Hi, {user.displayName}! </span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      ) : (
        <button onClick={loginModal} className="login-button">
          Login
        </button>
      )}
      <LoginSignup
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        setUser={setUser}
        isHomePage={false}
      />
    </>
  );
}

export default User;
