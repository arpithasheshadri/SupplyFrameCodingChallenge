const jwt = require("jsonwebtoken");
const { setErrorResponse } = require("../controllers/response-handler.js");

/**
 * Verify if the token is present or not
 */
const verifyToken = (request, response, next) => {
    console.log(request.headers.authorization);
    if (!request.headers.authorization) {
        setErrorResponse('401', 'Token is required for authorization.', response);
    }

    try {
        const token = request.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, "secretEncryptKey");
        request.decodedToken = decodedToken;
    } catch(err) {
        setErrorResponse('401', 'Invalid token.', response)
    }

    return next();
};

module.exports = verifyToken;
