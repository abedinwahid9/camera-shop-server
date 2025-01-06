const { mongoose } = require("mongoose");
const Product = require("../../models/product");
const User = require("../../models/user");

const getWishlist = async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email: email });
  if (user) {
    const wishList = user?.wishlist;
    const products = await Product.find({ _id: { $in: wishList } });
    res.status(201).send(products);
  }
};

const updateWishlist = async (req, res) => {
  const { id } = req.params;
  const product = req.body.id;
  const updatedUser = await User.findByIdAndUpdate(
    id, // Filter by ID
    { $push: { wishlist: product } }, // Update the `status` field
    { new: true, runValidators: true } // Return the updated document and validate the update
  );
  res.status(201).send(updatedUser);
};

module.exports = { getWishlist, updateWishlist };
