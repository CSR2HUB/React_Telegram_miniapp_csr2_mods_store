const express = require('express');
const router = express.Router();

// Placeholder route for auth
router.get('/', (req, res) => {
  res.json({ message: 'Auth route' });
});

module.exports = router;
