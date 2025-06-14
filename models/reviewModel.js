const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
  mod: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Mod' },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  isVerifiedPurchase: { type: Boolean, default: false },
}, { timestamps: true });
module.exports = mongoose.model('Review', reviewSchema);
