const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../../controllers/products/products");
const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/", deleteProduct);

module.exports = router;
