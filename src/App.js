// src/App.js
import React, { useState, useEffect } from 'react';
import './styles/App.css';
import LoginButton from './components/LoginButton';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { logOut } from './services/firebase';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state when auth state changes
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to ScrapChef!</h1>
        {user ? (
          <div>
            <p>Welcome, {user.displayName}</p>
            <button onClick={logOut}>Sign out</button>
          </div>
        ) : (
          <LoginButton />
        )}
      </header>
    </div>
  );
}

export default App;


