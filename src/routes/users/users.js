const express = require("express");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
} = require("../../controllers/users/users");
const router = express.Router();

router.get("/", getUsers);
router.get("/:email", getUser);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
