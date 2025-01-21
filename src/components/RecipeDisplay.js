import React from "react";
import SaveRecipeButton from "./SaveRecipeButton.js";
import AnimationWebM from "../assets/Animation - 1737322300801.webm";



const RecipeDisplay = ({ recipe, loading, error, userId, onClose }) => {
    return (
        <div className="mt-4 p-6 bg-oatmeal text-gray-900 rounded-xl shadow-2xl max-w-3xl border border-2 border-garden relative">
          {/* Loading Animation */}
          {loading && (
            <div className="flex flex-col items-center justify-center">
              <video
                src={AnimationWebM}
                autoPlay
                loop
                muted
                className="w-50 h-50 mb-4"
              />
              <p className="text-lg font-medium text-gray">
                Generating your recipe...
              </p>
            </div>
          )}
      
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-md border border-red-200">
              <p className="text-lg font-medium">{error}</p>
            </div>
          )}
      
          {/* Recipe Display */}
          {recipe && (
            <>
              {/* Close Button (Only for Recipe) */}
              <button
                onClick={onClose}
                className="absolute right-2 top-2 text-blue hover:text-gray-800 text-2xl font-bold"
                aria-label="Close"
              >
                &times;
              </button>
      
              <h3 className="text-3xl font-extrabold text-green-700 mb-6 text-center capitalize">
                {recipe.recipeName.replace(/^(Recipe Name:|Recipe:)\s*/, "")}
              </h3>
      
              <p className="text-lg leading-relaxed text-gray-800 whitespace-pre-wrap">
                {recipe.recipeDetails}
              </p>
              <SaveRecipeButton userId={userId} recipe={recipe} />
            </>
          )}
        </div>
      );
      
};

export default RecipeDisplay;
