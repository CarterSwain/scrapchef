import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AllergyPage = ({ user }) => {
  const [allergies, setAllergies] = useState([]);
  const navigate = useNavigate(); // Correct library for React Router

  const handleAddAllergy = (event) => {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      setAllergies([...allergies, event.target.value.trim()]);
      event.target.value = '';
    }
  };

  const handleRemoveAllergy = (allergyToRemove) => {
    setAllergies(allergies.filter((allergy) => allergy !== allergyToRemove));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:5001/api/users/${user.uid}`, {
        allergies,
      });

      // Navigate to profile page after submission
      navigate('/profile');
    } catch (error) {
      console.error('Error saving allergies:', error.message);
      alert('Failed to save allergies. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-yellow-400 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-black mb-4">Avoided Ingredients</h1>
      <p className="text-lg text-gray-800 mb-6">
        Add the ingredients you wish to avoid.
      </p>

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
