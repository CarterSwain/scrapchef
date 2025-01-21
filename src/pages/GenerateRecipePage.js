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


  const handleCloseRecipeDisplay = () => {
    setRecipe(null); // Clear the recipe when the "X" button is clicked
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 relative">
    {/* Main Content */}
    <h1
      className={`text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-4 transition-all ${
        recipe ? "mt-8" : "mt-0"
      }`}
    >
      ScrapChef
    </h1>
    <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-800 mb-8 text-center">
      Waste less, feast more.
    </p>
  
    {/* Ingredients Input */}
    <div className="relative mb-8 w-full max-w-2xl">
      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients (comma-separated)"
        rows={3}
        className="w-full px-4 py-3 text-base bg-cream sm:text-lg text-gray-700 border-2 border-tomato rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 resize-y"
      />
      <button
        onClick={handleGenerateRecipe}
        className="absolute right-4 bottom-4 bg-tomato text-white rounded-lg px-6 py-2 hover:bg-red-700 transition text-sm sm:text-base"
      >
        Generate
      </button>
    </div>
  
    {/* Recipe Display */}
    {(loading || recipe || error) && (
      <div className="w-full flex justify-center px-4">
        <RecipeDisplay recipe={recipe} loading={loading} error={error} userId={user.uid} onClose={handleCloseRecipeDisplay}/>
      </div>
    )}
  </div>
  
  

  
  );
};

export default GenerateRecipePage;
