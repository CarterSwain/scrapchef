import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api/openai"; // Update this if your server URL changes

export const getRecipeFromIngredients = async (ingredients) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate-recipe`, {
      ingredients, // Send ingredients as an array
    });

    const { recipeName, recipeDetails } = response.data;
    if (!recipeName || !recipeDetails) {
      throw new Error("Failed to generate recipe. The response is incomplete.");
    }

    return { recipeName, recipeDetails };
  } catch (error) {
    console.error(
      "Error generating recipe:",
      error.response?.data || error.message
    );
    throw new Error("Failed to generate recipe. Please try again.");
  }
};
