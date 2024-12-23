const User = require("../../models/user");

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.status(200).send(users);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to fetch users", details: error.message });
  }
};
// Get all users
const getUser = async (req, res) => {
  const { email } = req.params;
  console.log(email);
  try {
    const users = await User.findOne({ email: email }); // Fetch single user
    res.status(201).send(users);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to fetch users", details: error.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { name, email, role, status, wishlist } = req.body;

  // Basic validation
  if (!name || !email) {
    return res.status(400).send({ error: "Name and email are required" });
  }

  try {
    const user = new User({
      name,
      email,
      role: role || "user", // Default role is "user"
      status: status || "active", // Default status is "active"
      wishlist: wishlist || [],
    });

    await user.save(); // Save user to the database

    res.status(201).send(user);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to create user", details: error.message });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role, status, wishlist } = req.body;

  try {
    // Find user by ID and update
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, role, status, wishlist },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).send({ error: "User not found" });
    }

    res.status(200).send(updatedUser);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to update user", details: error.message });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Find user by ID and delete
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).send({ error: "User not found" });
    }

    res
      .status(200)
      .send({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to delete user", details: error.message });
  }
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
