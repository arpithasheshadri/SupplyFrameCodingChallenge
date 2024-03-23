const weatherController = require("../controllers/weather-controller.js");
const express = require("express");

const router = express.Router();
router.route("/").get(weatherController.getCurrentWeather);

module.exports = router;
