const loginUser = require("../models/user.js");

const userLogin = async (userCredentials = {}) => {
  const user = await loginUser.findOne(userCredentials).exec();
  return user;
};

module.exports = { userLogin };
