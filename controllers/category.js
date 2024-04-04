// controllers/categoryController.js
const Category = require("../model/category");

// Controller function to get all categories
async function getAllCategories(req, res) {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Controller function to create a new category
async function createCategory(req, res) {
  try {
    // Extract data from request body
    const { name } = req.body;
    // Create new category object
    const newCategory = new Category({
      name: name,
    });

    // Save the new category to the database
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllCategories,
  createCategory,
};
