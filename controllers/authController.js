const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const loginOrRegister = asyncHandler(async (req, res) => {
  const { telegramId, username } = req.body;
  let user = await User.findOne({ telegramId });

  if (!user) {
    user = await User.create({ telegramId, username });
  }

  res.json({
    _id: user._id,
    telegramId: user.telegramId,
    username: user.username,
    token: generateToken(user._id),
  });
});

module.exports = { loginOrRegister };
