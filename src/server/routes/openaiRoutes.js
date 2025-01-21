import express from 'express';
import OpenAI from 'openai';

const router = express.Router();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure the API key is set in your .env file
});

// POST route to generate a recipe
router.post('/generate-recipe', async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || !ingredients.length) {
    return res.status(400).json({ error: 'Ingredients are required.' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a strict chef recipe assistant. Your job is to create recipes that use ONLY the ingredients provided by the user. You cannot add any ingredients not explicitly mentioned by the user. Ensure the recipe is realistic, clear, and has a title.',
        },
        {
          role: 'user',
          content: `Create a recipe using ONLY the following ingredients: ${ingredients.join(', ')}.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const recipe = response?.choices?.[0]?.message?.content;
    if (!recipe) {
      return res.status(500).json({ error: 'Failed to generate recipe. The response is empty.' });
    }

// Parse OpenAI's response to split into title and details
const lines = recipe.split("\n");
const recipeName = lines[0] || "Unnamed Recipe";
const recipeDetails = lines.slice(1).join("\n");

    res.status(200).json({ recipeName, recipeDetails });
  } catch (error) {
    console.error('Error generating recipe:', error.message);
    res.status(500).json({ error: 'An error occurred while generating the recipe.' });
  }
});

export default router;

