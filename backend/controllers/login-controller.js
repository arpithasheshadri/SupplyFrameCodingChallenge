const userService = require("../services/user-service.js");
const { setErrorResponse, setResponse } = require("./response-handler.js");
const jwt = require("jsonwebtoken");

const login = async (request, response) => {
  try {
    const params = { ...request.body };
    const user = await userService.searchByEmail(params);

    if (user && params.currentPassword === user.currentPassword) {
      // create token
      const payload = { id: user._id, email: user.email, password: user.currentPassword, type: user.userType };
      const token = jwt.sign(payload, "secretEncryptKey", { expiresIn: '30m' });

      // send it in the response
      setResponse({ token }, response);
    } else {
      setErrorResponse('401', "Invalid credentials", response);
    }
  } catch (e) {
    // TODO: Check and add the valid status codes.
    setErrorResponse('500', e, response);
  }
};

module.exports = { login };
