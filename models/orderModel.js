const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  mod: { type: mongoose.Schema.Types.ObjectId, ref: 'Mod', required: true },
  qty: { type: Number, default: 1 }
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    status: { type: String, default: 'pending' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
