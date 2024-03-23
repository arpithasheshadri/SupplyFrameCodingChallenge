const locationService = require("../services/coordinate-service.js");
const jwt = require("jsonwebtoken");
const { setErrorResponse, setResponse } = require("./response-handler.js");

const getLocation = async (request, response) => {
  try {
    const params = request.query.place;
    const location = await locationService.searchByPlace(params);
      setResponse(location, response);
  } catch (e) {
    // TODO: Check and add the valid status codes.
    setErrorResponse('500', e, response);
  }
};

module.exports = { getLocation };
