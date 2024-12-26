const express = require("express");
const Wishlist = require("../models/Wishlist");
const User = require("../models/User");
const Product = require("../models/Product");

const router = express.Router();

// CREATE a new wishlist or add products to an existing wishlist
router.post("/wishlist", async (req, res) => {
  try {
    const { userId, productIds } = req.body; // userId and productIds are expected to be passed in the request body

    // Ensure user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if wishlist already exists for the user
    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      // Create a new wishlist if none exists
      wishlist = new Wishlist({ user: userId, products: productIds });
    } else {
      // Add products to the existing wishlist if it exists
      wishlist.products.push(...productIds);
    }

    // Save the wishlist
    await wishlist.save();
    return res.status(201).json({ message: "Wishlist updated", wishlist });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});
// GET user's wishlist
router.get("/wishlist/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user's wishlist
    const wishlist = await Wishlist.findOne({ user: userId }).populate(
      "products"
    );

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    return res.status(200).json({ wishlist });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});
// PUT to update wishlist (e.g., adding/removing products)
router.put("/wishlist/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { productIdsToAdd, productIdsToRemove } = req.body;

    // Find the wishlist
    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    // Add products to wishlist
    if (productIdsToAdd && productIdsToAdd.length > 0) {
      wishlist.products.push(...productIdsToAdd);
    }

    // Remove products from wishlist
    if (productIdsToRemove && productIdsToRemove.length > 0) {
      wishlist.products = wishlist.products.filter(
        (productId) => !productIdsToRemove.includes(productId.toString())
      );
    }

    // Save the updated wishlist
    await wishlist.save();
    return res.status(200).json({ message: "Wishlist updated", wishlist });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});
// DELETE product(s) from user's wishlist
router.delete("/wishlist/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { productIdsToRemove } = req.body;

    // Find the wishlist
    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    // Remove specified products from the wishlist
    if (productIdsToRemove && productIdsToRemove.length > 0) {
      wishlist.products = wishlist.products.filter(
        (productId) => !productIdsToRemove.includes(productId.toString())
      );
    }

    // Save the updated wishlist
    await wishlist.save();
    return res
      .status(200)
      .json({ message: "Products removed from wishlist", wishlist });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// DELETE entire wishlist
router.delete("/wishlist/clear/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Remove the wishlist for the user
    const wishlist = await Wishlist.findOneAndDelete({ user: userId });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    return res.status(200).json({ message: "Wishlist cleared" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});
