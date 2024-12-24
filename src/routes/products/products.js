const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByEmail,
} = require("../../controllers/products/products");
const router = express.Router();

router.get("/", getProducts);
router.get("/single/:email", getProductByEmail);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
