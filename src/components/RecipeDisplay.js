import React from 'react';

const RecipeDisplay = ({ recipe, loading, error }) => {
  return (
    <div className="mt-8 p-4 bg-white text-black rounded-lg shadow-lg max-w-xl">
      {loading && <p className="text-lg font-medium text-gray-800">Generating recipe...</p>}
      {error && <p className="text-lg font-medium text-red-500">{error}</p>}
      {recipe && (
        <>
          <h3 className="text-2xl font-bold mb-4">Generated Recipe:</h3>
          <p className="text-lg">{recipe}</p>
        </>
      )}
    </div>
  );
};

export default RecipeDisplay;
