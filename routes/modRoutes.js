const express = require('express');
const router = express.Router();
const {
  getAllMods,
  getModById,
  createMod,
  updateMod,
  deleteMod,
} = require('../controllers/modController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getAllMods)
  .post(protect, admin, createMod);

router.route('/:id')
  .get(getModById)
  .put(protect, admin, updateMod)
  .delete(protect, admin, deleteMod);

module.exports = router;
