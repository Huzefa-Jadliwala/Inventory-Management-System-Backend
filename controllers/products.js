// controllers/productController.js
const Product = require("../model/products");

// Controller function to get all products
async function getAllProducts(req, res) {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Controller function to create a new product
async function createProduct(req, res) {
  try {
    // Extract data from request body
    const { name, description, price, quantity, category, batchNumber } =
      req.body;

    // Create new product object
    const newProduct = new Product({
      name,
      description,
      price,
      quantity,
      category,
      batchNumber,
    });

    // Save the new product to the database
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllProducts,
  createProduct,
};
