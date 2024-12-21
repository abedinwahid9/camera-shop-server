const express = require("express");
const cors = require("cors");

const applyMiddlewares = (app) => {
  // middlewares
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

module.exports = applyMiddlewares;
