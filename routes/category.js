// routes/categories.js
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category");

// Route to get all categories
router
  .get("/", categoryController.getAllCategories)
  .post("/", categoryController.createCategory);

module.exports = router;
