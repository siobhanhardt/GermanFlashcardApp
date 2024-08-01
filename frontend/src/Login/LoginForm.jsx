import React, { useState } from "react";
import { signIn } from "./authFunctions"; 

// Component for logging into firebase
function LoginForm({ onLoginSuccess }) {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function getFriendlyErrorMessage(code) {
    // Provides better errors to users
    switch (code) {
      case 'auth/user-not-found':
        return 'No user found with this email address.';
      case 'auth/invalid-email':
        return 'The email address is not valid.';
      case 'auth/wrong-password':
        return 'The password is incorrect.';
      case 'auth/user-disabled':
        return 'The user account has been disabled.';
      default:
        return 'An unexpected error occurred. Please try again later.';
    }
  }

  async function handleLogin(e) {
    e.preventDefault();

    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());

    setError("");
    setMessage("");

    try {
      const result = await signIn(data.email, data.password);
      if (result.success) {
        setMessage("Login successful.");
        onLoginSuccess(result.user);
      } else {
        setError(getFriendlyErrorMessage(result.code));
      }
    } catch (error) {
      setError(getFriendlyErrorMessage(error.message));
    }
  }

  return (
    <div>
      <h2>Log in</h2>
      <form className="signup-form" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required minLength={6} />
        </div>
        <button type="submit">Log in</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
