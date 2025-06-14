const express = require('express');
const { loginOrRegister } = require('../controllers/authController');
const router = express.Router();

// Placeholder route for auth
router.get('/', (req, res) => {
  res.json({ message: 'Auth route' });
});

// Actual auth logic for Telegram login/register
router.post('/telegram', loginOrRegister);

module.exports = router;
