const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByEmail,
} = require("../../controllers/products/products");
const tokenVerify = require("../../middlewares/tokenVerify");
const sellerVerify = require("../../middlewares/sellerVerify");
const router = express.Router();

router.get("/", getProducts);
router.get("/single/:email", getProductByEmail);
router.get("/:id", getProductById);
router.post("/", tokenVerify, sellerVerify, createProduct);
router.patch("/:id", tokenVerify, sellerVerify, updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
