const setResponse = (data, response) => {
    response.status(200).json(data);
  };
  
  const setErrorResponse = (errorCode, errorMessage, response) => {
    console.log({ errorCode, errorMessage });
  
    switch (errorCode) {
      case '400': {
        response.status(400).json({
          code: "BadRequest",
          message: errorMessage ? errorMessage : "Invalid request, check the payload.",
        });
        break;
      }
      case '401': {
        response.status(401).json({
          code: "UnauthorizedRequest",
          message: errorMessage ? errorMessage : "User is not authenticated to access the resource.",
        });
        break;
      }
      case '403': {
        response.status(403).json({
          code: "Forbidden",
          message: errorMessage ? errorMessage : "User already exists.",
        });
        break;
      }
      case '500': {
        response.status(500).json({
          code: "ServicesError",
          message: errorMessage ? errorMessage : "Error occurred while processing your request.",
        });
        break;
      }
      default: {}
    }
  };
  
  module.exports = { setResponse, setErrorResponse };
  
  