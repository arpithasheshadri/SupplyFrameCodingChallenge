const loginRouter = require("./login-route.js");
const registerRoute = require("./register-route.js");
const sendInitialPage = require("../controllers/initial-controller.js");

module.exports = (app) => {
    app.use("/register", registerRoute);
    app.use("/login", loginRouter);
    app.use("/",sendInitialPage);
};
