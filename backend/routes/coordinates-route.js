const coordinateController = require("../controllers/coordinate-controller.js");
const express = require("express");

const router = express.Router();
router.route("/").get(coordinateController.getLocation);

module.exports = router;
