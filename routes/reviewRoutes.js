const express = require('express');
const router = express.Router();
const { getReviewsForMod, createReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

// Anyone can get reviews for a mod
router.route('/:modId').get(getReviewsForMod);
// Only logged-in users can create a review
router.route('/').post(protect, createReview);

module.exports = router;
