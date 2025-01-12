import React, { useState, useEffect } from 'react';
import './styles/App.css'; // Assuming this has the background styles now
import LoginButton from './components/LoginButton.js';
import LogoutButton from './components/LogoutButton.js'; // Import the LogoutButton
import ProfilePageButton from './components/ProfilePageButton.js'; // Import the ProfilePageButton
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Diet from './pages/DietPage.js';
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
          // Prevent navigation if already on the `/profile` route
          if (location.pathname === '/profile') return;

          // Check if user already exists in the database
          const response = await axios.get(`http://localhost:4000/api/users/${currentUser.uid}`, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.data.exists) {
            console.log('User exists, redirecting to GenerateRecipePage...');
            navigate('/generate-recipe'); // Redirect existing user to GenerateRecipePage
          } else {
            console.log('New user, redirecting to DietPage...');
            // Save new user to the database
            await axios.post('http://localhost:4000/api/users', {
              email: currentUser.email,
              name: currentUser.displayName,
              image: currentUser.photoURL,
              uid: currentUser.uid,
            });
            navigate('/diet'); // Redirect new user to DietPage
          }
        } catch (error) {
          console.error('Error checking or saving user:', error.response?.data || error.message);
          alert('Failed to process user data. Please try again.');
        }
      }
    });

    return () => unsubscribe();
  }, [navigate, location.pathname]);

  return (
    <div className="App app-background min-h-screen flex flex-col justify-center items-center text-black relative">
      {/* Logout Button */}
      {user && (
        <div className="absolute top-4 right-4">
          <LogoutButton />
        </div>
      )}

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
            <header className="App-header text-center p-6 max-w-md w-full bg-yellow-200 bg-opacity-90 rounded-lg">
              <h1 className="text-5xl font-bold text-black mb-2">ScrapChef</h1>
              <p className="text-lg font-medium text-gray-700 mb-8">Waste less, feast more.</p>
              {user ? (
                <div>
                  <p className="mb-4 text-lg text-black">Welcome, {user.displayName}</p>
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
        <Route
          path="/generate-recipe"
          element={
            user ? (
              <GenerateRecipePage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            user ? (
              <ProfilePage
                user={user}
                preferences={{ dietType: 'Vegan', avoidedIngredients: 'Nuts, Dairy' }}
                recipes={[]} // Pass an array of recipes
              />
            ) : (
              <Navigate to="/" />
            )
          }
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
