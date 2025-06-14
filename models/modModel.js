const mongoose = require('mongoose');

const modSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  images: [{ type: String }],
  compatibleCars: [{ type: String }],
  downloadUrl: { type: String, required: true },
  creator: { type: String },
  downloadSize: { type: String },
  lastUpdated: { type: Date },
  downloads: { type: Number },
  isFeatured: { type: Boolean, default: false }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Mod', modSchema);
