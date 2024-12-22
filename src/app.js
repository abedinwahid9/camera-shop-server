const express = require("express");
const applyMiddlewares = require("./middlewares/applyMiddlewares");
const connectDb = require("./db/connentDb");
const users = require("./routes/users/users");
const products = require("./routes/products/products");

const PORT = process.env.PORT || 3000;
const app = express();

// middlewares
applyMiddlewares(app);

// user router
app.use("/users", users);
app.use("/products", products);

app.get("/", (req, res) => {
  res.send({ message: "server is running" });
});

app.all("*", (req, res, next) => {
  const error = new Error(`the requested url is invalid : ${req.url}`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

const main = async () => {
  // db connect
  await connectDb();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

main();
