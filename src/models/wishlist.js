const mongoose = require("mongoose");

// Define the Wishlist Schema
const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Reference to the Product model
        required: true,
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Wishlist model
const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
