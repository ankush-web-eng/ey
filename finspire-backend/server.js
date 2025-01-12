const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const adviceRoutes = require('./routes/adviceRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3039;

// Explicit CORS configuration
const corsOptions = {
  origin: 'https://finspire.vercel.app',
  // origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

app.use('/api/advice', adviceRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Finspire API");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
