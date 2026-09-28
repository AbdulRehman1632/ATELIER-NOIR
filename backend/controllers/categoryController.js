const Category = require('../models/Category');
const store = require('../config/store');
const { getIsMongoConnected } = require('../config/db');

// @desc    Get all jacket categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    if (getIsMongoConnected()) {
      const categories = await Category.find().sort({ isFeatured: -1, name: 1 });
      return res.json({ success: true, count: categories.length, data: categories });
    }

    const categories = store.getCategories();
    return res.json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving categories', error: error.message });
  }
};

// @desc    Create new jacket category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req, res) => {
  try {
    const { name, description, image, isFeatured } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }

    if (getIsMongoConnected()) {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const category = await Category.create({
        name,
        slug,
        description: description || '',
        image: image || '',
        isFeatured: Boolean(isFeatured)
      });
      return res.status(201).json({ success: true, data: category });
    }

    const category = store.createCategory({ name, description, image, isFeatured });
    return res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create category', error: error.message });
  }
};

module.exports = { getCategories, createCategory };
