// src/components/LogoutButton.js
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
    <div>
      <button onClick={handleLogout}>Sign out</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LogoutButton;
