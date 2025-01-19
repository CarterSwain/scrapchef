import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton.js";
import GenerateRecipePageButton from "../components/GenerateRecipePageButton.js";
import DeleteRecipeButton from "../components/DeleteRecipeButton.js";
import EditPreferences from "../components/EditPreferences.js";
import PrintRecipeButton from "../components/PrintRecipeButton.js";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DefaultUserImage from "../assets/ScrapChefDefaultUser.svg";


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
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== deletedId)
    );
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
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
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      {/* User Info and Recipes Section */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-6 justify-center items-start">
        {/* Sidebar Section */}
        <div className="flex flex-col items-center bg-cream border text-gray border-black rounded-xl shadow-lg p-8 md:w-1/3 lg:w-1/4 space-y-4 min-w-[250px]">
          <div className="bg-garden p-1 rounded-full">
            <img
              src={user.photoURL || DefaultUserImage}
              alt={`${user.displayName}'s profile`}
              className="w-24 h-24 rounded-full shadow-sm"
            />
          </div>
          <h2 className="text-2xl font-bold text-center">{user.displayName}</h2>
          <div className="w-full mt-4 flex justify-center">
            <GenerateRecipePageButton />
          </div>
          <div className="w-full">
            <EditPreferences uid={user?.uid} />
          </div>
         
           {/* Logout Button */}
      <div className="justify-center mt-4 z-10">
        <LogoutButton />
      </div>
        </div>

        {/* Recipes Section */}
        <div
          className="flex-1 bg-garden border border-black rounded-xl shadow-lg w-[500px]"
          style={{ height: "400px" }}
        >
          <h3 className="text-3xl font-bold text-center text-cream mt-6 mb-4">
            Your Recipes
          </h3>
          {recipes.length > 0 ? (
            <SliderComponent {...settings}>
              {recipes.map((recipe, index) => (
                <div
                  key={`${recipe.id}-${index}`}
                  className="bg-cream text-gray p-20 mt-12 rounded-lg shadow-md hover:shadow-lg transition"
                  style={{
                    width: "200px",
                    margin: "20 auto",
                    textAlign: "center",
                  }}
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  <h4 className="text-lg font-bold text-center">
                    {recipe.name.replace(/^Recipe:\s*/, "")}
                  </h4>
                  <p className="text-sm text-gray-700">{recipe.ingredients}</p>
                </div>
              ))}
            </SliderComponent>
          ) : (
            <p className="text-center text-white">No recipes found. Start creating!</p>
          )}
        </div>
      </div>


      {/*Selected Recipe Modal */}

      {selectedRecipe && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="relative bg-white p-6 shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto rounded-lg">
      {/* Close Button (X) */}
      <button
        onClick={handleCloseModal}
        className="absolute top-2 right-2 text-gray-500 hover:text-black transition text-xl font-bold"
        aria-label="Close"
      >
        &times;
      </button>

      {/* Modal Content */}
      <h3 className="text-3xl font-bold mb-4 text-center">
        {selectedRecipe.name.replace(/^Recipe:\s*/, "")}
      </h3>
      <div className="text-gray-700">
        {selectedRecipe.details
          .split(/(Ingredients:|Instructions:)/)
          .map((section, index) => {
            if (section.trim() === "Ingredients:") {
              return (
                <h4 key={index} className="text-xl font-semibold mt-4 mb-2">
                  Ingredients
                </h4>
              );
            } else if (section.trim() === "Instructions:") {
              return (
                <h4 key={index} className="text-xl font-semibold mt-4 mb-2">
                  Instructions
                </h4>
              );
            } else {
              return (
                <p key={index} className="mb-4 leading-tight">
                  {section.trim()}
                </p>
              );
            }
          })}
      </div>
      <div className="flex justify-center items-center gap-4 mt-6">
        <PrintRecipeButton
          recipe={selectedRecipe}
          className="flex-shrink-0 w-32 h-12 mt-2 text-center bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
        />
        <DeleteRecipeButton
          userId={user.uid}
          recipeId={selectedRecipe.id}
          className="flex-shrink-0 w-32 h-12 px-4 py-2 mt-2 text-center bg-red-500 text-white rounded-md hover:bg-red-700 transition"
          onDelete={(deletedId) => {
            handleDeleteRecipe(deletedId);
            handleCloseModal();
          }}
        />
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ProfilePage;
