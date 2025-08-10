const { RequestErrorBuilder } = require("../common/RequestError.js");
const { userService } = require("../services/index.js");

const getUsers = async () => {
  const users = await userService.getAllUsers();
  if (!users) {
    throw new RequestErrorBuilder()
      .addMessage("No users found")
      .setCode(404)
      .build();
  }
  return users;
};

const createUser = async (user) => {
  try {
    const newUser = await userService.createUser(user);
    if (!newUser) {
      throw new RequestErrorBuilder()
        .addMessage("Failed to create user")
        .setCode(400)
        .build();
    }
    return newUser;
  } catch (error) {
    throw error;
  }
};

const updateUserByUsername = async ({ username, newUsername, name }) => {
  const updateUserData = {};
  if (newUsername) updateUserData.username = newUsername;
  if (name) updateUserData.name = name;

  const updatedUser = await userService.updateUser({
    username,
    updateUserData,
  });
  if (!updatedUser) {
    throw new RequestErrorBuilder()
      .addMessage("Failed to update user")
      .setCode(400)
      .build();
  }
  return updatedUser;
};

const deleteUser = async (id) => {
  const deletedUser = await userService.deleteUser(id);
  if (!deletedUser) {
    throw new RequestErrorBuilder()
      .addMessage("Failed to delete user")
      .setCode(400)
      .build();
  }
  return deletedUser;
};

module.exports = { getUsers, createUser, updateUserByUsername, deleteUser };
