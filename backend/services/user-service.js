const User = require("../models/user.js");

const searchByEmail = async (params = {}) => {
  const user = await User.findOne({email: params.email}).exec(); // exec returns a promise
  return user;
};

const searchById = async (params = {}) => {
  const user = await User.findOne({_id: params.id}).exec(); // exec returns a promise
  return user;
};

const create = async (params = {}) => {
  const user = new User(params);
  return await user.save();
};

const remove = async (id) => {
  return await User.findByIdAndDelete(id).exec();
};

const update = async (params, id) => {
  const user = await User
    .findByIdAndUpdate(id, params, { new: true })
    .exec();
  return user;
};

module.exports = { searchByEmail, searchById, create, remove, update };
