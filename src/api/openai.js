import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your .env file
});

export const getRecipeFromIngredients = async (ingredients) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4", // Ensure you're using the right model
      messages: [
        {
          role: "system",
          content: "You are a chef assistant that generates recipes based on ingredients provided by the user.",
        },
        {
          role: "user",
          content: `Create a recipe using the following ingredients: ${ingredients.join(", ")}.`,
        },
      ],
      temperature: 1,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Extract and return the recipe from the response
    return response.choices[0]?.message?.content || "No recipe generated.";
  } catch (error) {
    console.error("Error generating recipe:", error.message);
    throw new Error("Failed to generate recipe. Please try again.");
  }
};
