const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  items: [{
    mod: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Mod' },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  transactionId: { type: String },
}, { timestamps: true });
module.exports = mongoose.model('Order', orderSchema);
