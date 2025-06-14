const asyncHandler = require('express-async-handler');
const Review = require('../models/reviewModel');
const Mod = require('../models/modModel');
const Order = require('../models/orderModel');

// @desc    Get all reviews for a mod
// @route   GET /api/reviews/:modId
// @access  Public
const getReviewsForMod = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ mod: req.params.modId }).populate('user', 'username');
  res.json(reviews);
});

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private
const createReview = asyncHandler(async (req, res) => {
  const { modId, rating, comment } = req.body;
  const mod = await Mod.findById(modId);

  if (!mod) {
    res.status(404);
    throw new Error('Mod not found');
  }

  // Check if user has already reviewed this mod
  const alreadyReviewed = await Review.findOne({
    mod: modId,
    user: req.user._id,
  });

  if (alreadyReviewed) {
    res.status(400);
    throw new Error('You have already reviewed this mod');
  }

  // Check if the user has purchased this mod for 'isVerifiedPurchase' flag
  const hasPurchased = await Order.findOne({
    user: req.user._id,
    'items.mod': modId,
    status: 'completed' // Ensure the order was successful
  });

  const review = await Review.create({
    mod: modId,
    user: req.user._id,
    rating,
    comment,
    isVerifiedPurchase: !!hasPurchased,
  });

  // After creating the review, update the parent Mod's rating
  const reviews = await Review.find({ mod: modId });
  mod.reviewCount = reviews.length;
  mod.rating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

  await mod.save();

  res.status(201).json(review);
});

module.exports = { getReviewsForMod, createReview };
