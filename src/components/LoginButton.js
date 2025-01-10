// src/components/LoginButton.js
import React, { useState } from 'react';
import { signInWithGoogle } from '../services/firebase';

const LoginButton = () => {
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      // Redirect or update UI as needed
    } catch (err) {
      setError(err.message);
      console.error("Error logging in: ", err.message);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Sign in with Google</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginButton;
