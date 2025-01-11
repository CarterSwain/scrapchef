// src/App.js
import React, { useState, useEffect } from 'react';
import './styles/App.css';
import LoginButton from './components/LoginButton';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { logOut } from './services/firebase';
import backgroundImage from './assets/scrapchefBGImage.png';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
        className="App min-h-screen flex flex-col justify-center items-center text-black"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed',
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <header className="App-header text-center p-6 max-w-md w-full bg-yellow-200 bg-opacity-90 rounded-lg">
                <h1 className="text-5xl font-bold text-black mb-2">ScrapChef</h1>
                <p className="text-lg font-medium text-gray-700 mb-8">Waste less, feast more.</p>
                {user ? (
                  <div>
                    <p className="mb-4 text-lg text-black">Welcome, {user.displayName}</p>
                    <button
                      onClick={logOut}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                      Sign out
                    </button>
                    <Navigate to="/diet" />
                  </div>
                ) : (
                  <div className="bg-white rounded-md p-4 shadow-lg border border-gray-300">
                    <LoginButton />
                  </div>
                )}
              </header>
            }
          />
          <Route
            path="/diet"
            element={
              user ? (
                <Diet />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;





