import express from 'express';
import bodyParser from 'body-parser'; // Middleware to parse JSON request bodies
import userRoutes from './routes/userRoutes.js'; // Import the user routes
import cors from 'cors';

const app = express();
const PORT = 5000;

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests from the React app on localhost:3000
  methods: 'GET, POST, PUT, DELETE', // Allow only the necessary methods
  credentials: true,  // Enable cookies to be sent across domains
}));

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests

// Routes
app.get('/', (req, res) => {
    res.send('Hello, world!'); // Add a simple route for '/'
  });

app.use('/api', userRoutes); // Connect the userRoutes to the base path

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(express.static('public')); // assuming images are in a 'public' folder
