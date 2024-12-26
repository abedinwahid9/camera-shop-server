const jwt = require("jsonwebtoken");

const createToken = async (req, res) => {
  const email = req.body;
  const token = jwt.sign(email, process.env.ACCESS_KEY_TOKEN, {
    expiresIn: "10d",
  });
  res.send({ token });
};

module.exports = createToken;
