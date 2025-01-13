import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GenerateRecipePageButton from '../components/GenerateRecipePageButton.js';
import DeleteRecipeButton from '../components/DeleteRecipeButton.js';
import axios from 'axios';

const ProfilePage = ({ user }) => {
  const [preferences, setPreferences] = useState({ dietType: '', avoidedIngredients: [] });
  const [recipes, setRecipes] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // Tracks editing state
  const [updatedPreferences, setUpdatedPreferences] = useState(preferences); // Temp preferences for editing
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user preferences
        const userResponse = await axios.get(`http://localhost:5001/api/users/${user.uid}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const userData = userResponse.data;
        if (userData) {
          setPreferences({
            dietType: userData.diet || 'Not specified',
            avoidedIngredients: userData.allergies || [],
          });
          setUpdatedPreferences({
            dietType: userData.diet || 'Not specified',
            avoidedIngredients: userData.allergies || [],
          });
        }

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
        console.error('Error fetching user data:', error.message);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleDeleteRecipe = (deletedId) => {
    setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== deletedId));
  };

  const handleEditPreferences = () => {
    setIsEditing(true); // Enable editing mode
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Cancel editing
    setUpdatedPreferences(preferences); // Reset to original preferences
  };

  const handleSavePreferences = async () => {
    try {
      await axios.put(`http://localhost:5001/api/users/${user.uid}/preferences`, updatedPreferences, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setPreferences(updatedPreferences); // Save the updated preferences
      setIsEditing(false); // Disable editing mode
    } catch (error) {
      console.error('Error updating preferences:', error.message);
    }
  };

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPreferences((prev) => ({ ...prev, [name]: value }));
  };

  const handleAllergiesChange = (e) => {
    const { value } = e.target;
    setUpdatedPreferences((prev) => ({
      ...prev,
      avoidedIngredients: value.split(',').map((item) => item.trim()), // Convert comma-separated string to array
    }));
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

        {/* Preferences Section */}
        <div className="mt-6 bg-green-300 p-4 rounded-lg shadow-md w-full max-w-md">
          <h3 className="text-xl font-semibold mb-4">Preferences</h3>
          {isEditing ? (
            <div>
              <label className="block mb-2 font-semibold">
                Diet Type:
                <select
                  name="dietType"
                  value={updatedPreferences.dietType}
                  onChange={handlePreferenceChange}
                  className="block w-full mt-1 p-2 border rounded"
                >
                  <option value="VEGAN">Vegan</option>
                  <option value="VEGETARIAN">Vegetarian</option>
                  <option value="OMNIVORE">Omnivore</option>
                  <option value="PESCATARIAN">Pescatarian</option>
                </select>
              </label>
              <label className="block mb-2 font-semibold">
                Ingredients to Avoid (comma-separated):
                <input
                  type="text"
                  value={updatedPreferences.avoidedIngredients.join(', ')}
                  onChange={handleAllergiesChange}
                  className="block w-full mt-1 p-2 border rounded"
                />
              </label>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 bg-gray-400 text-white rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p>
                <strong>Diet Type:</strong> {preferences.dietType}
              </p>
              <p>
                <strong>Ingredients to Avoid:</strong>{' '}
                {preferences.avoidedIngredients.length > 0
                  ? preferences.avoidedIngredients.join(', ')
                  : 'None'}
              </p>
              <button
                onClick={handleEditPreferences}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Edit Preferences
              </button>
            </div>
          )}
        </div>
      </div>

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



