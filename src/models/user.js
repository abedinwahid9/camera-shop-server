const { mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  role: {
    type: String,
    require: true,
    enum: ["buyer", "seller", "admin"],
    message: "{VALUE} is not supported",
  },
  status: {
    type: String,
    require: [true, "need status"],
  },
  wishlist: [],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
