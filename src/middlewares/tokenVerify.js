var jwt = require("jsonwebtoken");

const tokenVerify = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).send({ message: "No token provided" });
  }

  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_KEY_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "Invalid token" });
    }
    req.decoded = decoded;

    next();
  });
};

module.exports = tokenVerify;
