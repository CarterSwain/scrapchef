import dotenv from 'dotenv';
dotenv.config(); // Load environment variables as early as possible

import express from 'express';
import bodyParser from 'body-parser'; // Middleware to parse JSON request bodies
import userRoutes from './routes/userRoutes.js'; // Import the user routes
import openaiRoutes from './routes/openaiRoutes.js'; // Import the OpenAI routes
import cors from 'cors';

const app = express();
const PORT = 5001;

// CORS configuration
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow requests from the React app on localhost:3000
    methods: 'GET, POST, PUT, DELETE', // Allow only the necessary methods
    credentials: true, // Enable cookies to be sent across domains
  })
);

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests

// Routes
app.get('/', (req, res) => {
  res.send('Hello, world!'); // Add a simple route for '/'
});

app.use('/api', userRoutes); // Connect the userRoutes to the base path
app.use('/api/openai', openaiRoutes); // Connect the OpenAI routes to '/api/openai'

// Serve static files
app.use(express.static('public')); // Assuming images are in a 'public' folder

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
