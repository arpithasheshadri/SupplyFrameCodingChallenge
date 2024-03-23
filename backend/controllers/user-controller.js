const userService = require("../services/user-service.js");
const { validateUser } = require("../validate/validation.js");
const { setErrorResponse, setResponse } = require("./response-handler.js");

const getUser = async (request, response) => {
  try {
    let user;

    // fetch query params
    const { email, id } = request.query;

    // check if we need to search data in db by email / id
    if (email && email !== null && email.trim() !== '') {
      user = await userService.searchByEmail({ email });
    } else {
      user = await userService.searchById({ id });
    }

    setResponse(user, response);
  } catch (e) {
    // TODO: Check and add the valid status codes.
    setErrorResponse('500', e, response);
  }
};

const createUser = async (request, response) => {
  try {
    const params = { ...request.body };
    params.previousPasswords = [];

    // search if the user already exists
    const existingUser = await userService.searchByEmail(params);
    // if the user exists then throw error
    if (existingUser && Object.keys(existingUser).length !== 0) {
      setErrorResponse('403', "User already exists.", response);
    } else {
      // validate user

      const validatedResult = validateUser(params);
      if (validatedResult.length === 0) {
        const newUser = await userService.create(params);
        setResponse(newUser, response);
      } else {
        setErrorResponse('400', validatedResult, response);
      }
    }

  } catch (e) {
    // TODO: Check and add the valid status codes.
    setErrorResponse('500', e, response);
  }
};

const removeUser = async (request, response) => {
  try {
    const id = request.params.id;
    const registerUser = await userService.remove(id);
    setResponse({}, response);
  } catch (e) {
    // TODO: Check and add the valid status codes.
    setErrorResponse('500', e, response);
  }
};

const updateUser = async (request, response) => {
  try {
    const id = request.params.id;
    const params = { ...request.body };

    const validatedResult = validateUser(params);

    if (id && validatedResult.length === 0) {
      // update user in user db
      const updatedUser = await userService.update(params, id);
      setResponse(updatedUser, response);
    } else {
      setErrorResponse('400', validatedResult, response);
    }
  } catch (e) {
    // TODO: Check and add the valid status codes.
    setErrorResponse('500', e, response);
  }
};

const updatePassword = async(request, response) => {
  try{
    const params = {...request.body};
    const user = await userService.searchByEmail(params);
    if(!user.previousPasswords.includes(user.currentPassword)){
      user.previousPasswords.push(user.currentPassword);
    }

    if(user.previousPasswords.includes(params.currentPassword)){
      setErrorResponse('400', 'The password entered matches the previous passwords', response);
    } 

    user.currentPassword = params.currentPassword;

    const updatedUser = await userService.update(user,user._id);
    setResponse(updatedUser,response);
  } catch (err){
    setErrorResponse('500',err,response);
  }
};

module.exports = { getUser, createUser, removeUser, updateUser, updatePassword };
