import React, { useState, useEffect } from 'react';
import './styles/App.css'; // Assuming this has the background styles now
import LoginButton from './components/LoginButton.js';
import ProfilePageButton from './components/ProfilePageButton.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import DietPage from './pages/DietPage.js';
import AllergyPage from './pages/AllergyPage.js';
import GenerateRecipePage from './pages/GenerateRecipePage.js';
import ProfilePage from './pages/ProfilePage.js';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          // Check if user already exists in the database
          const response = await axios.get(`http://localhost:5001/api/users/${currentUser.uid}`, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.data.exists) {
            console.log('New user detected, redirecting to diet setup...');
            navigate('/diet');
          } else if (!response.data.hasPreferences) {
            console.log('User exists but preferences are not set. Redirecting...');
            navigate('/diet');
          } else {
            console.log('Existing user with preferences detected.');
            if (location.pathname === '/profile' || location.pathname === '/generate-recipe') {
              console.log(`Staying on the current page: ${location.pathname}`);
              return; // Do not navigate if already on the desired page
            }
            console.log('Navigating to profile page...');
            navigate('/profile');
          }
        } catch (error) {
          console.error('Error checking user existence:', error.response?.data || error.message);
          alert('An error occurred while processing user data. Please try again.');
        }
      }
    });

    return () => unsubscribe();
  }, [navigate, location.pathname]);

  return (
    <div className="App app-background min-h-screen flex flex-col justify-center items-center text-black relative">
      {/* Profile Page Button */}
      {user && location.pathname !== '/profile' && (
        <div className="absolute bottom-4 right-4">
          <ProfilePageButton />
        </div>
      )}

      {/* Main Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <header className="App-header text-center p-8 max-w-md w-full bg-garden bg-opacity-70 rounded-lg">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-black mb-2">ScrapChef</h1>
              <p className="text-lg font-medium text-gray-700 mb-8">Waste less, feast more.</p>
              {user ? (
                <div>
                  <p className="mb-4 text-lg text-black">Welcome, {user.displayName}</p>
                </div>
              ) : (
                <div className="rounded-md p-4">
                  <LoginButton />
                </div>
              )}
            </header>
          }
        />
        <Route
          path="/diet"
          element={user ? <DietPage uid={user.uid} /> : <Navigate to="/" />}
        />
        <Route
          path="/avoided-ingredients"
          element={user ? <AllergyPage uid={user.uid} /> : <Navigate to="/" />}
        />
        <Route
          path="/generate-recipe"
          element={user ? <GenerateRecipePage user={user} /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={user ? <ProfilePage user={user} recipes={[]} /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

