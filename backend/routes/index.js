const loginRouter = require("./login-route.js");
const registerRoute = require("./register-route.js");
const sendInitialPage = require("../controllers/initial-controller.js");
const coordinateRoute = require("./coordinates-route.js");
const verifyToken = require("../auth/auth.js");
const currentWeatherRoute =  require("./current-weather-route.js");

module.exports = (app) => {
    app.use("/register", registerRoute);
    app.use("/login", loginRouter);
    app.use("/getLocation",coordinateRoute);
    app.use("/currentWeather",currentWeatherRoute);
    app.use("/",sendInitialPage);
};
