import React, { useState } from "react";
import { signUp } from "./authFunctions";

// Component for signing up to firebase
function SignupForm({ onSignupSuccess }) {
  const [error, setError] = useState("");

  function getFriendlyErrorMessage(code) {
    // Provides better errors to users
    switch (code) {
      case 'auth/email-already-in-use':
        return 'The email address is already in use by another account.';
      case 'auth/invalid-email':
        return 'The email address is not valid.';
      case 'auth/operation-not-allowed':
        return 'Email/password accounts are not enabled.';
      case 'auth/weak-password':
        return 'The password is too weak.';
      default:
        return 'An unexpected error occurred. Please try again later.';
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();

    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());

    setError("");
    // Make sure passwords are equal
    if (data.password !== data["confirm-password"]) {
      setError("Passwords are not equal");
      return;
    }

    try {
      const result = await signUp(data.email, data.password, data.name);
      if (result.success) {
        onSignupSuccess(result.user);
      } else {
        console.log(error)
        setError(getFriendlyErrorMessage(result.code));
      }
    } catch (error) {
      console.log("catch: " + error)
      setError(getFriendlyErrorMessage(error.message));
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSignUp}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" name="name" required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required minLength={6} />
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            required
            minLength={6}
          />
        </div>
        <button type="submit">Sign Up</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </>
  );
}

export default SignupForm;
