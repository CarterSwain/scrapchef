import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GenerateRecipePageButton from '../components/GenerateRecipePageButton.js';
import DeleteRecipeButton from '../components/DeleteRecipeButton.js';
import EditPreferences from '../components/EditPreferences.js'; // Import the new component
import axios from 'axios';

const ProfilePage = ({ user }) => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        // Fetch user recipes
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
    <div className="min-h-screen bg-yellow-400 flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex justify-between items-center p-6 bg-yellow-300">
        <h1 className="text-4xl font-bold text-black">ScrapChef</h1>
      </div>

      {/* User Info */}
      <div className="mt-8 flex flex-col items-center">
        <img
          src={user.photoURL || '/default-profile.png'}
          alt={`${user.displayName}'s profile`}
          className="w-32 h-32 rounded-full shadow-md"
        />
        <h2 className="text-2xl font-bold mt-4">{user.displayName}</h2>
      </div>

      {/* Preferences Section */}
      <EditPreferences user={user} />

      {/* Recipes Section */}
      <div className="mt-12 w-full max-w-4xl">
        <h3 className="text-3xl font-bold text-center mb-6">Your Recipes</h3>
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
            <p className="text-center col-span-3">No recipes found. Start creating!</p>
          )}
        </div>
      </div>

      {/* Generate New Recipe Button */}
      <GenerateRecipePageButton />
    </div>
  );
};

export default ProfilePage;
