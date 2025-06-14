const mongoose = require('mongoose');

const modSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  tags: [{ type: String }],
  price: { type: Number },
  rating: { type: Number },
  reviewCount: { type: Number },
  images: [{ type: String }],
  creator: { type: String },
  downloadSize: { type: String },
  lastUpdated: { type: Date },
  downloads: { type: Number },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Mod', modSchema);
