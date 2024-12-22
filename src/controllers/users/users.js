const getUsers = async (req, res) => {
  res.send({ message: "get all users" });
};

module.exports = { getUsers };
