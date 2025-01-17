import React, { useState } from "react";
import { getRecipeFromIngredients } from "../api/openai.js";
import RecipeDisplay from "../components/RecipeDisplay.js";
import Sandwich from "../assets/ScrapChefSandwich.svg";
import Spaghetti from "../assets/ScrapChefSpaghetti.svg";

const GenerateRecipePage = ({ user }) => {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);

  // Define the array of falling items
  const fallingItems = [
    { src: Sandwich, alt: "Sandwich" },
    { src: Spaghetti, alt: "Spaghetti" },
  ];

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

  const startAnimation = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false); // Reset animation state
      handleGenerateRecipe(); // Call recipe generation
    }, 3000); // Match this duration to animation timing
  };

  const getRandomStyle = () => {
    const randomLeft = Math.random() * 80 + 10; // Random left between 10% and 90%
    const randomDelay = Math.random() * 1.5; // Random delay between 0s and 1.5s
    return {
      left: `${randomLeft}%`,
      animationDelay: `${randomDelay}s`,
    };
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative">
      {/* Main Content Wrapper */}
      <div className="flex flex-col items-center justify-center relative mt-12">
        <h1 className="text-6xl font-bold text-black mb-4">ScrapChef</h1>
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
            onClick={startAnimation}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 text-white rounded-full px-6 py-2 hover:bg-red-700 transition"
          >
            Generate
          </button>
        </div>
      </div>

      {/* Recipe Display */}
      {(recipe || loading || error) && (
        <div className="w-full flex justify-center z-10 -mb-20">
          <RecipeDisplay recipe={recipe} loading={loading} error={error} userId={user.uid} />
        </div>
      )}

      {/* Animation */}
      <div className="relative w-full h-screen">
        {showAnimation &&
          fallingItems.map((item, index) => {
            const style = getRandomStyle();
            return (
              <img
                key={index}
                src={item.src}
                alt={item.alt}
                className="absolute top-0 w-100 h-100 animate-fall"
                style={style} // Apply random styles
              />
            );
          })}
      </div>
    </div>
  );
};

export default GenerateRecipePage;
