const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const modRoutes = require('./routes/modRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/mods', modRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mods';

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Mongo connection error', err);
  });
