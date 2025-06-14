const mongoose = require('mongoose');
const modSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  images: [{ type: String }],
  compatibleCars: [{ type: String }],
  tags: [{ type: String }],
  downloadUrl: { type: String, required: true },
  creator: { type: String },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });
module.exports = mongoose.model('Mod', modSchema);
