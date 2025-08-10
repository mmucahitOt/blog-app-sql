const { RequestErrorBuilder } = require("../common/RequestError.js");
const { userService } = require("../services/index.js");

const getUsers = async () => {
  const users = await userService.getAllUsers();
  if (!users) {
    throw new RequestErrorBuilder()
      .withMessage("No users found")
      .withCode(404)
      .build();
  }
  return users;
};

const createUser = async (user) => {
  const newUser = await userService.createUser(user);
  if (!newUser) {
    throw new RequestErrorBuilder()
      .withMessage("Failed to create user")
      .withCode(400)
      .build();
  }
  return newUser;
};

const updateUser = async ({ id, username, name }) => {
  console.log("user id", id);
  const updateUserData = {};
  if (username) updateUserData.username = username;
  if (name) updateUserData.name = name;

  const updatedUser = await userService.updateUser({
    id,
    updateUserData,
  });
  if (!updatedUser) {
    throw new RequestErrorBuilder()
      .withMessage("Failed to update user")
      .withCode(400)
      .build();
  }
  return updatedUser;
};

const deleteUser = async (id) => {
  const deletedUser = await userService.deleteUser(id);
  if (!deletedUser) {
    throw new RequestErrorBuilder()
      .withMessage("Failed to delete user")
      .withCode(400)
      .build();
  }
  return deletedUser;
};

module.exports = { getUsers, createUser, updateUser, deleteUser };
