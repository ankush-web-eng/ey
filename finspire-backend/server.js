const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const adviceRoutes = require('./routes/adviceRoutes');

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3039;

// CORS configuration (dynamic origin based on environment)
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', // Use environment variable or default to localhost for dev
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true, // Allow cookies or authorization headers
};

app.use(cors(corsOptions)); // Enable CORS with options
app.use(express.json()); // Parse JSON payloads

// Routes
app.use('/api/advice', adviceRoutes); // Advice-related routes

// Root route for testing server
app.get('/', (req, res) => {
  res.send('Welcome to the Finspire API');
});

// Global error handler for debugging
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error details
  res.status(500).send('Something went wrong!'); // Send generic error response
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
