import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logOut } from '../services/firebase.js'; // Adjust the import path as needed

function DietPage({ uid }) {
  const [selectedDiet, setSelectedDiet] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDietSelection = async (diet) => {
    setSelectedDiet(diet);

    try {
      // Save the selected diet to the backend
      await axios.put(`http://localhost:5001/api/users/${uid}/preferences`, {
        diet,
        allergies: [], // Initialize allergies as an empty array
      });

      // Redirect to the allergy setup page
      navigate('/avoided-ingredients');
    } catch (err) {
      console.error('Error saving diet preference:', err.message);
      setError('Failed to save diet preference. Please try again.');
    }
  };

  return (
    <div className="diet-page min-h-screen flex flex-col items-center text-black relative">
      {/* Log Out Button */}
      <button
        onClick={logOut}
        className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-700 transition duration-300"
      >
        Log Out
      </button>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-8 mt-16">What is your diet?</h1>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-center mb-4">
          {error}
        </p>
      )}

      {/* Diet Options */}
      <div className="diet-options grid grid-cols-2 gap-6 sm:grid-cols-4">
        <button
          onClick={() => handleDietSelection('VEGAN')}
          className="diet-option bg-white rounded-lg shadow-md flex flex-col items-center p-4 hover:shadow-lg transition"
        >
          <img src="/path-to-vegan-icon.png" alt="Vegan" className="w-12 h-12 mb-2" />
          <span className="font-medium">Vegan</span>
        </button>
        <button
          onClick={() => handleDietSelection('VEGETARIAN')}
          className="diet-option bg-white rounded-lg shadow-md flex flex-col items-center p-4 hover:shadow-lg transition"
        >
          <img src="/path-to-vegetarian-icon.png" alt="Vegetarian" className="w-12 h-12 mb-2" />
          <span className="font-medium">Vegetarian</span>
        </button>
        <button
          onClick={() => handleDietSelection('PESCATARIAN')}
          className="diet-option bg-white rounded-lg shadow-md flex flex-col items-center p-4 hover:shadow-lg transition"
        >
          <img src="/path-to-pescatarian-icon.png" alt="Pescatarian" className="w-12 h-12 mb-2" />
          <span className="font-medium">Pescatarian</span>
        </button>
        <button
          onClick={() => handleDietSelection('OMNIVORE')}
          className="diet-option bg-white rounded-lg shadow-md flex flex-col items-center p-4 hover:shadow-lg transition"
        >
          <img src="/path-to-omnivore-icon.png" alt="Omnivore" className="w-12 h-12 mb-2" />
          <span className="font-medium">Omnivore</span>
        </button>
      </div>

      {/* Selected Diet */}
      {selectedDiet && (
        <div className="mt-8 text-xl font-semibold">
          <p>You selected: {selectedDiet}</p>
        </div>
      )}
    </div>
  );
}

export default DietPage;



