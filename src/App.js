// src/App.js
import React, { useState, useEffect } from 'react';
import './styles/App.css';
import LoginButton from './components/LoginButton';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { logOut } from './services/firebase';
import backgroundImage from './assets/scrapchefBGImage.png';

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
    <div className="App min-h-screen flex flex-col justify-center items-center text-white"   style={{
      backgroundImage: `url(${backgroundImage})`, 
      backgroundSize: 'cover', // Ensures the image stretches to cover the whole container
      backgroundPosition: 'center center' // Centers the image in the viewport
    }}>
      <header className="App-header text-center p-6 max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4">Welcome to ScrapChef!</h1>
        {user ? (
          <div>
            <p className="mb-4 text-lg">Welcome, {user.displayName}</p>
            <button 
              onClick={logOut} 
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign out
            </button>
          </div>
        ) : (
          <LoginButton />
        )}
      </header>
    </div>
  );
}

export default App;



