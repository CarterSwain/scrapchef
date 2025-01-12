import React, { useState } from 'react';

const GenerateRecipePage = () => {
  const [ingredients, setIngredients] = useState('');
  const [ingredientList, setIngredientList] = useState([]);

  const handleInputChange = (e) => {
    setIngredients(e.target.value);
  };

  const addIngredient = () => {
    if (ingredients.trim() !== '') {
      setIngredientList([...ingredientList, ingredients.trim()]);
      setIngredients(''); // Clear input field after adding
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {/* Header Section */}
      <h1 className="text-6xl font-bold text-black mb-4">ScrapChef</h1>
      <p className="text-2xl font-medium text-gray-800 mb-8">Waste less, feast more.</p>

      {/* Search Bar */}
      <div className="relative mb-8">
        <input
          type="text"
          value={ingredients}
          onChange={handleInputChange}
          placeholder="Enter ingredients..."
          className="w-96 px-4 py-2 text-lg text-gray-700 border-2 border-red-500 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <button
          onClick={addIngredient}
          className="absolute right-2 top-2 bg-red-500 hover:bg-red-700 text-white rounded-full p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M18 10a8 8 0 11-16 0 8 8 0 0116 0z"
            />
          </svg>
        </button>
      </div>

      {/* Display Added Ingredients */}
      {ingredientList.length > 0 && (
        <div className="w-96 bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Your Ingredients:</h2>
          <ul className="list-disc ml-6">
            {ingredientList.map((ingredient, index) => (
              <li key={index} className="text-gray-700">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pot Illustration */}
      <div className="w-64 h-64 relative mt-8">
        <img
          src="/assets/pot.png" // Replace with your actual image path
          alt="Cooking pot"
          className="w-full h-full object-contain"
        />
      </div>


    </div>
  );
};

export default GenerateRecipePage;
