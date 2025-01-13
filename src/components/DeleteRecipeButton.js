import React, { useState } from 'react';
import axios from 'axios';

const DeleteRecipeButton = ({ userId, recipeId, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteRecipe = async () => {
    setLoading(true);
    setError(null);

    try {
      await axios.delete(`http://localhost:5001/api/users/${userId}/recipes/${recipeId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (onDelete) {
        onDelete(recipeId); // Callback to update parent component's state
      }
    } catch (err) {
      console.error('Error deleting recipe:', err.message);
      setError('Failed to delete the recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleDeleteRecipe}
        disabled={loading}
        className={`px-4 py-2 rounded-md text-white font-semibold shadow-md ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-red-500 hover:bg-red-600 transition'
        }`}
      >
        {loading ? 'Deleting...' : 'Delete Recipe'}
      </button>
      {error && (
        <p className="text-red-600 mt-2 text-sm">{error}</p>
      )}
    </div>
  );
};

export default DeleteRecipeButton;
