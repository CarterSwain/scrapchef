import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AllergyPage = ({ uid }) => {
  const [allergies, setAllergies] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // React Router navigation hook

  // Add an allergy to the list
  const handleAddAllergy = (event) => {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      setAllergies([...allergies, event.target.value.trim()]);
      event.target.value = ''; // Clear the input field
    }
  };

  // Remove an allergy from the list
  const handleRemoveAllergy = (allergyToRemove) => {
    setAllergies(allergies.filter((allergy) => allergy !== allergyToRemove));
  };

  // Submit allergies to the backend and navigate to profile
  const handleSubmit = async () => {
    try {
      console.log('Saving allergies for UID:', uid);
      setError(null); // Clear any previous error

      // Update allergies in the backend
      await axios.put(`http://localhost:5001/api/users/${uid}/preferences`, {
        allergies,
      });

      console.log('Allergies saved:', allergies);

      // Navigate to profile page
      navigate('/profile');
    } catch (error) {
      console.error('Error saving allergies:', error.message);
      setError('Failed to save allergies. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-yellow-400 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-black mb-4">Avoided Ingredients</h1>
      <p className="text-lg text-gray-800 mb-6">
        Add the ingredients you wish to avoid.
      </p>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-center mb-4">
          {error}
        </p>
      )}

      {/* Allergy Input and List */}
      <div className="w-96">
        <input
          type="text"
          placeholder="Enter an ingredient..."
          onKeyDown={handleAddAllergy}
          className="w-full px-4 py-2 mb-4 text-lg border border-gray-400 rounded shadow focus:outline-none focus:ring-2 focus:ring-yellow-600"
        />

        <ul className="list-disc list-inside bg-white p-4 rounded shadow">
          {allergies.map((allergy, index) => (
            <li
              key={index}
              className="flex justify-between items-center mb-2 text-lg"
            >
              <span>{allergy}</span>
              <button
                onClick={() => handleRemoveAllergy(allergy)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-3 bg-green-500 text-white font-bold rounded shadow hover:bg-green-700 transition"
      >
        Save and Continue
      </button>
    </div>
  );
};

export default AllergyPage;

