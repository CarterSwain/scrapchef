import React, { useState } from "react";
import { getRecipeFromIngredients } from "../api/openai.js";
import RecipeDisplay from "../components/RecipeDisplay.js";
import ScrapChefPot from "../assets/ScrapChefPot.svg"; // Import the SVG file

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
    <div className="min-h-screen flex flex-col justify-center items-center">
      {/* Header Section */}
      <h1 className="text-6xl font-bold text-black mb-4">ScrapChef</h1>
      <p className="text-2xl font-medium text-gray-800 mb-12">Waste less, feast more.</p>

      {/* Ingredients Input */}
      <div className="relative mb-12">
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients (comma-separated)..."
          className="w-96 px-4 py-2 text-lg text-gray-700 border-2 border-red-500 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <button
          onClick={handleGenerateRecipe}
          className="absolute right-1 top-1 bg-red-500 text-white rounded-full px-4 py-2 hover:bg-red-700 transition"
        >
          Generate
        </button>
      </div>

      {/* SVG Display */}
      {!loading && !recipe && (
        <div className="absolute mb-4 bottom-0 z-0">
          <img
            src={ScrapChefPot}
            alt="ScrapChef Pot"
            className="w-[1200px] h-auto mb-6 mx-auto" // Explicitly set to 400px wide
          />
        </div>
      )}

      {/* Recipe Display */}
      {recipe || loading || error ? (
        <RecipeDisplay recipe={recipe} loading={loading} error={error} userId={user.uid} />
      ) : null} {/* Only render RecipeDisplay when necessary */}
    </div>
  );
};

export default GenerateRecipePage;
