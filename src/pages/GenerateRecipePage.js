import React, { useState } from "react";
import { getRecipeFromIngredients } from "../api/openai.js";

const GenerateRecipePage = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateRecipe = async () => {
    setLoading(true);
    setError(null);
    setRecipe(null);

    try {
      // Call the OpenAI API to generate a recipe
      const recipeResult = await getRecipeFromIngredients(
        ingredients.split(",").map((item) => item.trim())
      );
      setRecipe(recipeResult);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-400 flex flex-col justify-center items-center">
      {/* Header Section */}
      <h1 className="text-6xl font-bold text-black mb-4">ScrapChef</h1>
      <p className="text-2xl font-medium text-gray-800 mb-8">Waste less, feast more.</p>

      {/* Ingredients Input */}
      <div className="relative mb-8">
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients (comma-separated)..."
          className="w-96 px-4 py-2 text-lg text-gray-700 border-2 border-red-500 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <button
          onClick={handleGenerateRecipe}
          className="absolute right-2 top-2 bg-red-500 text-white rounded-full px-4 py-2 hover:bg-red-700 transition"
        >
          Generate
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && <p className="text-lg font-medium text-gray-800">Generating recipe...</p>}

      {/* Error Message */}
      {error && <p className="text-lg font-medium text-red-500">{error}</p>}

      {/* Recipe Output */}
      {recipe && (
        <div className="mt-8 p-4 bg-white text-black rounded-lg shadow-lg max-w-xl">
          <h3 className="text-2xl font-bold mb-4">Generated Recipe:</h3>
          <p className="text-lg">{recipe}</p>
        </div>
      )}
    </div>
  );
};

export default GenerateRecipePage;

