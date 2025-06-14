const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  username: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);
