const { mongoose } = require("mongoose");
const Product = require("../../models/product");
const User = require("../../models/user");
const Wishlist = require("../../models/wishlist");

const getWishlist = async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email: email });
  if (user) {
    const wishList = user?.wishlist;
    const products = await Product.find({ _id: { $in: wishList } });
    res.status(201).send(products);
  }
};

const addWishList = async (req, res) => {
  try {
    const wishList = new Wishlist(req.body);
    await wishList.save();

    const user = await User.findByIdAndUpdate(
      req.body.user, // Filter by ID
      { $push: { wishlist: req.body.products } }, // Update the `status` field
      { new: true, runValidators: true } // Return the updated document and validate the update
    );

    console.log("user", user);

    res.status(201).json(wishList);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Failed to create product", error });
  }
};

const removeWishListById = (req, res) => {
  try {
    const { id } = req.params;
    const wishlist = Wishlist.findByIdAndDelete(id);
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    res.status(200).json({ message: "Wishlist deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to remove product", error });
  }
};

module.exports = { getWishlist, addWishList };
