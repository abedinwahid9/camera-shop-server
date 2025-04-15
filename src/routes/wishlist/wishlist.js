const express = require("express");
const {
  updateWishlist,
  getWishlist,
  addWishList,
} = require("../../controllers/wishlists/wishlist");
const router = express.Router();

// wishlist api
router.get("/:email", getWishlist);
router.post("/", addWishList);

module.exports = router;
