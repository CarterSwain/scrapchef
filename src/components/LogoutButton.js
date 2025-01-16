import React, { useState } from 'react';
import { logOut } from '../services/firebase.js';

const LogoutButton = () => {
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    try {
      await logOut();
      // Redirect or update UI as needed
    } catch (err) {
      setError(err.message);
      console.error("Error logging out: ", err.message);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white font-medium px-6 py-2 rounded-md hover:bg-red-700 transition"
      >
        Log Out
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default LogoutButton;

