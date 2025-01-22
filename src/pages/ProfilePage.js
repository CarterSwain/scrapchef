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

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/users/${user.uid}/recipes`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
  
        const cleanedRecipes = response.data.recipes.map((recipe) => ({
          ...recipe,
          name: recipe.name.replace(/^Recipe Name:\s*/, ""), // Clean the name
        }));
  
        setRecipes(cleanedRecipes || []);
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
      }
    };
  
    if (user) {
      fetchUserRecipes();
    }
  }, [user]);

  
  useEffect(() => {
    document.body.style.overflow = selectedRecipe ? "hidden" : "auto";
  }, [selectedRecipe]);
  

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
    swipe: true, 
    touchMove: true, 
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
        arrows: true,
        prevArrow: <button style={{ left: "10px" }}>‹</button>,
        nextArrow: <button style={{ right: "10px" }}>›</button>,
        swipe: true,
        touchMove: true,
      },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        arrows: true,
        prevArrow: <button style={{ left: "30px" }}>‹</button>,
        nextArrow: <button style={{ right: "30px" }}>›</button>,
        swipe: true,
        touchMove: true,
      },
    },
  ],
};

  console.log("Recipes:", recipes);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">

    {/* Main Header Section */}
    <div className="flex flex-col justify-center items-center relative mt-4 sm:mt-8 md:mt-12 mb-4">
      {/* Main Content */}
      <h1 className="text-6xl">
        ScrapChef
      </h1>
      <p className="text-1xl text-gray-800 mb-8">
        Waste less, feast more.
      </p>
    </div>

      {/* User Info and Recipes Section */}
      <div className="flex flex-col md:flex-row sm:flex-row w-full max-w-6xl gap-6 justify-center items-start">
     {/* Sidebar Section */}
<div className="flex flex-col items-center bg-oatmeal text-gray rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-sm sm:max-w-md md:w-1/3 space-y-4 mx-auto">
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
          className="flex-1 px-18 py-10 mb-6 bg-garden sm:p-8 w-full max-w-sm sm:max-w-md md:w-1/3 rounded-xl shadow-lg "
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
                  className="bg-cream relative text-gray p-20 mt-6 rounded-lg shadow-md hover:shadow-lg transition"
                  style={{
                    width: "200px",
                    margin: "20 auto",
                    textAlign: "center",
                  }}
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  <h4 className="text-lg font-bold text-center">
                    {recipe.name.replace(/^Recipe:|Recipe Name:|Recipe Title:|Title:|\s*/, "")}
                  </h4>
                  <p className="text-sm text-gray-700">{recipe.ingredients}</p>
                </div>
              ))}
            </SliderComponent>
          ) : (
            <p className="text-center mt-4 p-12 text-cream">No saved recipes yet. Let's start cooking!</p>
          )}
        </div>
      </div>


      {/*Selected Recipe Modal */}

   {selectedRecipe && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div
      className="relative bg-white p-6 shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto rounded-lg touch-auto"
    >
      {/* Close Button */}
      <button
        onClick={handleCloseModal}
        className="absolute top-2 right-2 text-gray-500 hover:text-black transition text-xl font-bold"
        aria-label="Close"
      >
        &times;
      </button>

      {/* Modal Content */}
      <h3 className="text-3xl font-bold mb-4 text-center">
        {selectedRecipe.name.replace(/^Recipe:|Recipe Name:|Recipe Title:|Title:\s*/, "")}
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
