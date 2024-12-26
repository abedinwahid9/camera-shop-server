const express = require("express");
const createToken = require("../../controllers/authentication/createToken");
const router = express.Router();

router.post("/authentication", createToken);

module.exports = router;
