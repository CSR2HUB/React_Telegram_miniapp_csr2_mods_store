const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  mod: { type: mongoose.Schema.Types.ObjectId, ref: 'Mod', required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 }
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  transactionId: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
