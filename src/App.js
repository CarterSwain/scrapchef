// src/App.js
import React, { useState, useEffect } from 'react';
import './styles/App.css';
import LoginButton from './components/LoginButton';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { logOut } from './services/firebase';
import backgroundImage from './assets/scrapchefBGImage.png';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';  // Updated imports
import Diet from './pages/DietPage.js'; // Import Diet page

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
    <Router>
      <div
        className="App min-h-screen flex flex-col justify-center items-center text-white"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed',
        }}
      >
        <Routes>  {/* Use Routes instead of Switch */}
          <Route path="/" element={
            <header className="App-header text-center p-6 max-w-md w-full bg-black bg-opacity-50 rounded-lg">
              <h1 className="text-4xl font-bold mb-4 text-yellow-400">Welcome to ScrapChef!</h1>
              {user ? (
                <div>
                  <p className="mb-4 text-lg text-white">Welcome, {user.displayName}</p>
                  <button
                    onClick={logOut}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                  >
                    Sign out
                  </button>
                  {/* Navigate logged-in users to the Diet page */}
                  <Navigate to="/diet" />
                </div>
              ) : (
                <LoginButton />
              )}
            </header>
          } />
          
          <Route path="/diet" element={
            user ? (
              <Diet />
            ) : (
              <Navigate to="/" />  
            )
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;




