// src/server/routes/userRoutes.js
import express from 'express';
import { prisma } from '../prismaClient.js'; // Import Prisma client

const router = express.Router();

// GET: Check if a user exists by UID
router.get('/users/:uid', async (req, res) => {
  const { uid } = req.params;

  console.log('Checking user existence for UID:', uid);

  try {
    const user = await prisma.user.findUnique({
      where: { uid },
    });

    if (!user) {
      console.log('User not found for UID:', uid);
      return res.status(404).json({ exists: false });
    }

    console.log('User exists:', user);

    const preferences = await prisma.preferences.findUnique({
      where: { userId: user.id },
    });

    const hasPreferences = !!preferences;

    res.status(200).json({ exists: true, user, hasPreferences });
  } catch (error) {
    console.error('Error checking user existence:', error.message);
    res.status(500).json({ error: 'Failed to check user existence' });
  }
});


// POST: Save a new user or update existing user data
router.post('/users', async (req, res) => {
  const { email, name, image, uid } = req.body;

  console.log('Received user data:', { email, name, image, uid }); // Log the received data

  try {
    // Check if the user already exists in the database
    let user = await prisma.user.findUnique({
      where: { uid },
    });

    if (!user) {
      // If the user doesn't exist, create a new user
      console.log('User does not exist, creating new user...');
      user = await prisma.user.create({
        data: {
          email,
          name,
          image,
          uid,
        },
      });
      console.log('User created:', user);
    } else {
      console.log('User already exists. Updating user data...');
      // Update user data if already exists
      user = await prisma.user.update({
        where: { uid },
        data: {
          email,
          name,
          image,
        },
      });
      console.log('User updated:', user);
    }

    res.status(200).json(user); // Respond with the user data
  } catch (error) {
    console.error('Error creating or updating user:', error.message);
    res.status(500).json({ error: 'Failed to save user data' });
  }
});





// POST: Save recipe
router.post('/save-recipe', async (req, res) => {
  const { userId, recipeName, recipeDetails } = req.body;

  if (!userId || !recipeName || !recipeDetails) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const savedRecipe = await prisma.recipe.create({
      data: {
        name: recipeName,
        details: recipeDetails,
        user: {
          connect: { uid: userId }, // Ensure `userId` is an integer
        },
      },
    });

    res.status(200).json({ message: 'Recipe saved successfully.', recipe: savedRecipe });
  } catch (error) {
    console.error('Error saving recipe:', error);
    res.status(500).json({ error: 'Failed to save recipe.' });
  }
});








// GET: Fetch recipes for a specific user
router.get('/users/:uid/recipes', async (req, res) => {
  const { uid } = req.params;

  try {
    const recipes = await prisma.recipe.findMany({
      where: {
        user: {
          uid, // Match the user by UID
        },
      },
    });

    res.status(200).json({ recipes });
  } catch (error) {
    console.error('Error fetching recipes:', error.message);
    res.status(500).json({ error: 'Failed to fetch recipes.' });
  }
});

// DELETE: Delete a specific recipe for a user
router.delete('/users/:uid/recipes/:recipeId', async (req, res) => {
  const { uid, recipeId } = req.params;

  try {
    // Ensure the recipe belongs to the user
    const recipe = await prisma.recipe.findUnique({
      where: { id: parseInt(recipeId) },
      include: { user: true },
    });

    if (!recipe || recipe.user.uid !== uid) {
      return res.status(404).json({ error: 'Recipe not found or does not belong to the user.' });
    }

    // Delete the recipe
    await prisma.recipe.delete({
      where: { id: parseInt(recipeId) },
    });

    res.status(200).json({ message: 'Recipe deleted successfully.' });
  } catch (error) {
    console.error('Error deleting recipe:', error.message);
    res.status(500).json({ error: 'Failed to delete recipe.' });
  }
});

// GET: Retrieve user preferences
router.get('/users/:uid/preferences', async (req, res) => {
  const { uid } = req.params;

  try {
    // Find the user by `uid`
    const user = await prisma.user.findUnique({
      where: { uid },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find preferences by `user.id`
    const preferences = await prisma.preferences.findUnique({
      where: { userId: user.id },
    });

    if (!preferences) {
      return res.status(404).json({ error: 'Preferences not found' });
    }

    res.json(preferences);
  } catch (error) {
    console.error('Error fetching preferences:', error.message);
    res.status(500).json({ error: 'Failed to fetch preferences.' });
  }
});



// PUT: Update user preferences
router.put('/users/:uid/preferences', async (req, res) => {
  const { uid } = req.params;
  const { diet, allergies } = req.body;

  try {
    // Find the user by `uid`
    const user = await prisma.user.findUnique({
      where: { uid },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate request body
    if (!diet || !Array.isArray(allergies)) {
      return res.status(400).json({ error: 'Invalid preferences data' });
    }

    // Upsert preferences by `user.id`
    const updatedPreferences = await prisma.preferences.upsert({
      where: { userId: user.id },
      update: { diet, allergies },
      create: { diet, allergies, userId: user.id },
    });

    res.status(200).json(updatedPreferences);
  } catch (error) {
    console.error('Error updating preferences:', error.message);
    res.status(500).json({ error: 'Failed to update preferences.' });
  }
});

export default router;
