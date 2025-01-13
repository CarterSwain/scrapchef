import React, { useState } from 'react';
import axios from 'axios';

const SaveRecipeButton = ({ userId, recipe }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSaveRecipe = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post('http://localhost:5001/api/save-recipe', {
        userId,
        recipeName: recipe.recipeName,
        recipeDetails: recipe.recipeDetails,
      });
      setSuccess(true);
    } catch (err) {
      console.error('Error saving recipe:', err.message);
      setError('Failed to save the recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleSaveRecipe}
        disabled={loading}
        className={`px-4 py-2 rounded-md text-white font-semibold shadow-md ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 transition'
        }`}
      >
        {loading ? 'Saving...' : 'Save Recipe'}
      </button>
      {success && (
        <p className="text-green-600 mt-2 text-sm">Recipe saved successfully!</p>
      )}
      {error && (
        <p className="text-red-600 mt-2 text-sm">{error}</p>
      )}
    </div>
  );
};

export default SaveRecipeButton;