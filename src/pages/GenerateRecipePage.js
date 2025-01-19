import React, { useState } from "react";
import { getRecipeFromIngredients } from "../api/openai.js";
import RecipeDisplay from "../components/RecipeDisplay.js";

const GenerateRecipePage = ({ user }) => {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateRecipe = async () => {
    setLoading(true);
    setError(null);
    setRecipe(null);

    try {
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
    <div className="min-h-screen flex flex-col justify-center items-center relative">
      {/* Main Content */}
      <h1
        className={`text-6xl font-bold text-black mb-4 transition-all ${
          recipe ? "mt-8" : "mt-0"
        }`}
      >
        ScrapChef
      </h1>
      <p className="text-2xl font-medium text-gray-800 mb-8">Waste less, feast more.</p>
  
      {/* Ingredients Input */}
      <div className="relative mb-8">
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients (comma-separated)..."
          className="w-[700px] px-4 py-2 text-lg text-gray-700 border-2 border-red-500 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <button
          onClick={handleGenerateRecipe}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 text-white rounded-full px-6 py-2 hover:bg-red-700 transition"
        >
          Generate
        </button>
      </div>
  
      {/* Recipe Display */}
      {(loading || recipe || error) && (
        <div className="w-full flex justify-center">
          <RecipeDisplay recipe={recipe} loading={loading} error={error} userId={user.uid} />
        </div>
      )}
    </div>
  );
};

export default GenerateRecipePage;
