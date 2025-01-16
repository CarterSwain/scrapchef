import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenerateRecipePageButton from "../components/GenerateRecipePageButton.js";
import DeleteRecipeButton from "../components/DeleteRecipeButton.js";
import EditPreferences from "../components/EditPreferences.js";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Workaround for react-slick export issues
// @ts-ignore
const SliderComponent = !!Slider.default ? Slider.default : Slider;

const ProfilePage = ({ user }) => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/users/${user.uid}/recipes`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Fetched Recipes:", response.data.recipes);
        setRecipes(response.data.recipes || []);
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
      }
    };

    if (user) {
      fetchUserRecipes();
    }
  }, [user]);


  const handleDeleteRecipe = (deletedId) => {
    setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== deletedId));
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1, // Show only the number of available recipes 
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  console.log("Recipes:", recipes);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full flex justify-between items-center p-6">
        <h1 className="text-4xl font-bold text-black">ScrapChef</h1>
        <button
          onClick={() => navigate("/logout")}
          className="text-black font-bold"
        >
          Log Out
        </button>
      </div>


      {/* User Info and Recipes Section */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl mt-8 gap-6">
        {/* Sidebar Section */}
        <div className="w-1/3 bg-white border border-black rounded-xl shadow-lg p-6 flex flex-col items-center">
          <img
            src={user.photoURL || "/default-profile.png"}
            alt={`${user.displayName}'s profile`}
            className="w-24 h-24 rounded-full shadow-md mb-4"
          />
          <h2 className="text-2xl font-bold mb-4">{user.displayName}</h2>
          <div className="w-full">
            <h3 className="font-semibold text-lg mb-2">Preferences:</h3>
            <EditPreferences uid={user?.uid} />
          </div>
        </div>

        {/* Recipes Section */}
        <div className="flex-1 ml-6 bg-tomato border border-black rounded-xl shadow-lg p-6" style={{ maxWidth: "100%" }}>
          <h3 className="text-3xl font-bold text-center text-white mb-6">Your Recipes</h3>
          {recipes.length > 0 ? (
            <SliderComponent {...settings}>
              {recipes.map((recipe, index) => (
                <div
                  key={`${recipe.id}-${index}`} // Ensure each slide has a unique key
                  className="bg-white text-black p-4 rounded-lg shadow-md hover:shadow-lg transition"
                  style={{ width: "90%",
                  margin: "0 auto",textAlign: "center" }}
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  <h4 className="text-lg font-bold text-center">{recipe.name}</h4>
                </div>
              ))}
            </SliderComponent>
          ) : (
            <p className="text-center text-white">No recipes found. Start creating!</p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <GenerateRecipePageButton />
      </div>

      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-2xl font-bold mb-4">{selectedRecipe.name}</h3>
            <p className="text-gray-700 mb-4">{selectedRecipe.details}</p>
            <DeleteRecipeButton
              userId={user.uid}
              recipeId={selectedRecipe.id}
              onDelete={(deletedId) => {
                handleDeleteRecipe(deletedId);
                handleCloseModal();
              }}
            />
            <button
              onClick={handleCloseModal}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
