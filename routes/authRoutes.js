const express = require('express');
const { loginOrRegister } = require('../controllers/authController');
const router = express.Router();

router.post('/telegram', loginOrRegister);

module.exports = router;
