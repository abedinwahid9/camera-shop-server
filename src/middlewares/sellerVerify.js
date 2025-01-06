const User = require("../models/user");

const sellerVerify = async (req, res, next) => {
  const email = req.decoded.email;

  const query = { email: email };
  const user = await User.find(query);

  if (user[0].role !== "seller") {
    return res.send({ message: "forbidden access" });
  }
  if (user[0].status !== "approved") {
    return res.status(203).send({ message: "user not approved" });
  }
  next();
};

module.exports = sellerVerify;
