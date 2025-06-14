const express = require('express');
const router = express.Router();

// Placeholder route for mods
router.get('/', (req, res) => {
  res.json({ message: 'Mods route' });
});

module.exports = router;
