const loginController = require("../controllers/login-controller.js");
const express = require("express");

const router = express.Router();
router.route("/").post(loginController.login);

module.exports = router;
