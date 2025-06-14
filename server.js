const express = require('express');
// Other required imports would go here
const modRoutes = require('./routes/modRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(express.json());

// Mount existing routes
app.use('/api/mods', modRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
