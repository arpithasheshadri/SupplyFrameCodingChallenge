const locationService = require("../services/weather-service.js");
const jwt = require("jsonwebtoken");
const { setErrorResponse, setResponse } = require("./response-handler.js");

const getCurrentWeather = async (request, response) => {
  try {
    const lat = request.query.lat;
    const lon = request.query.lon;
    const weather = await locationService.weatherByPlace(lat,lon);
      setResponse(weather, response);
  } catch (e) {
    // TODO: Check and add the valid status codes.
    setErrorResponse('500', e, response);
  }
};

module.exports = { getCurrentWeather };
