const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const Mod = require('../models/modModel');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, totalAmount } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  const order = new Order({
    user: req.user._id, // From 'protect' middleware
    items: orderItems,
    totalAmount,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

// @desc    Get logged in user's orders
// @route   GET /api/orders/my-history
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('items.mod', 'name images');
  res.json(orders);
});

module.exports = { createOrder, getMyOrders };
