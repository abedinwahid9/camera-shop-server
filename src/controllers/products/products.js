const mongoose = require("mongoose");
const Product = require("../../models/product"); // Adjust the path to your Product model as needed

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("user", "name email");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve products", error });
  }
};

const getProductByEmail = async (req, res) => {
  const { email } = req.params; // Extract user ID from request parameters

  try {
    // Query products where the user field matches the specific user ID
    const products = await Product.find().populate({
      path: "user",
      match: { email: email }, // Filter the populated `user` documents by email
      select: "email",
    });

    const filter = products.filter((product) => product.user);

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this user ID" });
    }

    res.status(200).json(filter); // Send the products as a response
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({
      message: "Failed to retrieve the products by user ID",
      error: err.message, // Include the error message
    });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve the product", error });
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Failed to create product", error });
  }
};
// Update a product by ID
const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to update the product", error });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete the product", error });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductByEmail,
  createProduct,
  updateProduct,
  deleteProduct,
};
