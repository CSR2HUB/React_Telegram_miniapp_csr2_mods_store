const Mod = require('../models/modModel');

// @desc    Fetch all mods with optional filters
// @route   GET /api/mods
// @access  Public
const getAllMods = async (req, res) => {
  try {
    const { category, tags } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (tags) {
      const tagsArray = tags.split(',').map(tag => tag.trim());
      filter.tags = { $in: tagsArray };
    }

    const mods = await Mod.find(filter);
    res.json(mods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get mod by ID
// @route   GET /api/mods/:id
// @access  Public
const getModById = async (req, res) => {
  try {
    const mod = await Mod.findById(req.params.id);
    if (!mod) {
      return res.status(404).json({ message: 'Mod not found' });
    }
    res.json(mod);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a mod
// @route   POST /api/mods
// @access  Admin
const createMod = async (req, res) => {
  try {
    const mod = new Mod(req.body);
    const createdMod = await mod.save();
    res.status(201).json(createdMod);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid mod data' });
  }
};

// @desc    Update a mod
// @route   PUT /api/mods/:id
// @access  Admin
const updateMod = async (req, res) => {
  try {
    const mod = await Mod.findById(req.params.id);
    if (!mod) {
      return res.status(404).json({ message: 'Mod not found' });
    }

    Object.assign(mod, req.body);
    const updatedMod = await mod.save();
    res.json(updatedMod);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid mod data' });
  }
};

// @desc    Delete a mod
// @route   DELETE /api/mods/:id
// @access  Admin
const deleteMod = async (req, res) => {
  try {
    const mod = await Mod.findById(req.params.id);
    if (!mod) {
      return res.status(404).json({ message: 'Mod not found' });
    }

    await mod.deleteOne();
    res.json({ message: 'Mod removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllMods,
  getModById,
  createMod,
  updateMod,
  deleteMod,
};
