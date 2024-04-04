// routes/products.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");

// Route to get all products
router
  .get("/", productController.getAllProducts)
  .post("/", productController.createProduct);

module.exports = router;
