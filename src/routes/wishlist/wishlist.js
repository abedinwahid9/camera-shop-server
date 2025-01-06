const express = require("express");
const {
  updateWishlist,
  getWishlist,
} = require("../../controllers/wishlists/wishlist");
const router = express.Router();

router.get("/:email", getWishlist);
router.put("/:id", updateWishlist);

module.exports = router;
