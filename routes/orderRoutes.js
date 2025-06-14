const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// Both routes are protected and require a valid user token
router.route('/').post(protect, createOrder);
router.route('/my-history').get(protect, getMyOrders);

module.exports = router;
