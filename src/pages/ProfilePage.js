import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GenerateRecipePageButton from '../components/GenerateRecipePageButton.js';
import DeleteRecipeButton from '../components/DeleteRecipeButton.js';
import EditPreferences from '../components/EditPreferences.js'; 
import axios from 'axios';

const ProfilePage = ({ user }) => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const recipesResponse = await axios.get(
          `http://localhost:5001/api/users/${user.uid}/recipes`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setRecipes(recipesResponse.data.recipes || []);
      } catch (error) {
        console.error('Error fetching user recipes:', error.message);
      }
    };

    if (user) {
      fetchUserRecipes();
    }
  }, [user]);

  const handleDeleteRecipe = (deletedId) => {
    setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== deletedId));
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex justify-between items-center p-6">
        <h1 className="text-4xl font-bold text-black">ScrapChef</h1>
        <button
          onClick={() => navigate('/logout')}
          className="text-black font-bold"
        >
          Log Out
        </button>
      </div>

      {/* User Info Section */}
      <div className="flex flex-row w-full max-w-6xl mt-8">
        {/* Sidebar Section */}
        <div className="w-1/3 bg-white border border-black rounded-xl shadow-lg p-6 flex flex-col items-center">
          <img
            src={user.photoURL || '/default-profile.png'}
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
        <div className="flex-1 ml-6 bg-tomato border border-black rounded-xl shadow-lg p-6 rounded-xl">
          <h3 className="text-3xl font-bold text-center text-white mb-6">Your Recipes</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white text-black p-4 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <h4 className="text-lg font-bold mb-2">{recipe.name}</h4>
                  <p className="text-sm text-gray-700">{recipe.details}</p>
                  <DeleteRecipeButton
                    userId={user.uid}
                    recipeId={recipe.id}
                    onDelete={handleDeleteRecipe}
                  />
                </div>
              ))
            ) : (
              <p className="text-center col-span-3 text-white">No recipes found. Start creating!</p>
            )}
          </div>
        </div>
      </div>

      {/* Generate New Recipe Button */}
      <div className="mt-6">
        <GenerateRecipePageButton />
      </div>
    </div>
  );
};

export default ProfilePage;

