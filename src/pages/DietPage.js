import React, { useState } from 'react';

function DietPage() {
  const [selectedDiet, setSelectedDiet] = useState('');

  const handleDietSelection = (diet) => {
    setSelectedDiet(diet);
  };

  return (
    <div className="diet-page min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black">
      <h1 className="text-3xl font-bold mb-6">Choose Your Diet</h1>
      <div className="diet-options space-y-4">
        <button
          className="diet-option px-6 py-3 bg-green-500 text-white rounded-lg"
          onClick={() => handleDietSelection('Vegan')}
        >
          Vegan
        </button>
        <button
          className="diet-option px-6 py-3 bg-blue-500 text-white rounded-lg"
          onClick={() => handleDietSelection('Keto')}
        >
          Keto
        </button>
        <button
          className="diet-option px-6 py-3 bg-red-500 text-white rounded-lg"
          onClick={() => handleDietSelection('Paleo')}
        >
          Paleo
        </button>
        <button
          className="diet-option px-6 py-3 bg-yellow-500 text-white rounded-lg"
          onClick={() => handleDietSelection('Vegetarian')}
        >
          Vegetarian
        </button>
        <button
          className="diet-option px-6 py-3 bg-black text-white rounded-lg"
          onClick={() => handleDietSelection('Pescatarian')}
        >
          Pescatarian
        </button>
        <button
          className="diet-option px-6 py-3 bg-green-500 text-white rounded-lg"
          onClick={() => handleDietSelection('No Strict Diet')}
        >
          No Strict Diet
        </button>
      </div>
      {selectedDiet && (
        <div className="diet-selected mt-6">
          <p className="text-xl font-semibold">You selected: {selectedDiet}</p>
        </div>
      )}
    </div>
  );
}

export default DietPage;
