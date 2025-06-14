const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const modRoutes = require('./routes/modRoutes');
// ... import other routes as needed

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/mods', modRoutes);
// ... use other routes

// Error Handling Middleware (must be last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
