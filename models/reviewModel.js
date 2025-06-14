const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    mod: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Mod'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    isVerifiedPurchase: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Review', reviewSchema);
