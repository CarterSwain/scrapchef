import React, { useState } from 'react';
import { signInWithGoogle } from '../services/firebase.js';

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
    <div className="flex flex-col items-center">
      <button
        onClick={handleLogin}
        className="flex items-center shadow shadow-sm shadow-gray px-6 py-3 bg-cream text-gray rounded-full shadow-md hover:bg-blue-300 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        <span className="mr-2 font-semibold">Sign in with Google</span>
        <img
          src="https://img.icons8.com/color/48/google-logo.png"
          alt="google-logo"
          className="w-5 h-5"
        />
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default LoginButton;

