// src/server/routes/userRoutes.js
import express from 'express';
import { prisma } from '../prismaClient.js'; // Import Prisma client

const router = express.Router();

// GET: Check if a user exists by UID
router.get('/users/:uid', async (req, res) => {
  const { uid } = req.params;

  console.log('Checking user existence for UID:', uid); // Log the UID being checked

  try {
    const user = await prisma.user.findUnique({
      where: { uid },
    });

    if (user) {
      console.log('User exists:', user);
      res.status(200).json({ exists: true, user });
    } else {
      console.log('User not found for UID:', uid);
      res.status(404).json({ exists: false });
    }
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
          connect: { uid: userId },
        },
      },
    });

    res.status(200).json({ message: 'Recipe saved successfully.', recipe: savedRecipe });
  } catch (error) {
    console.error('Error saving recipe:', error.message);
    res.status(500).json({ error: 'Failed to save recipe.' });
  }
});


export default router;
