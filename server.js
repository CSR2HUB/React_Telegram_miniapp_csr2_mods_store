const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Route imports
const authRoutes = require('./routes/authRoutes');
const modRoutes = require('./routes/modRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Route mounting
app.use('/api/auth', authRoutes);
app.use('/api/mods', modRoutes);
app.use('/api/orders', orderRoutes);

// Error handling middleware
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
app.use(notFound);
app.use(errorHandler);

// Port config
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
