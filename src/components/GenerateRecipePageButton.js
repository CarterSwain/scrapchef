import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const GenerateRecipePageButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = () => {
    console.log("Current location:", location.pathname); // Logs the current route
    if (location.pathname === '/generate-recipe') {
      console.log("Already on /generate-recipe. Navigation skipped.");
      return; // Prevent navigation if already on the target route
    }
    console.log("Navigating to /generate-recipe");
    navigate('/generate-recipe');
  };

  return (
    <button
      onClick={handleNavigate}
      className="bg-garden text-cream font-bold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
    >
      Generate Recipe
    </button>
  );
};

export default GenerateRecipePageButton;

