const User = require("../models/User.js");

const getUserById = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const createUser = async ({ username, name }) => {
  const user = await User.create({
    username,
    name,
  });
  console.log("Created user:", user.toJSON());
  return user;
};

const updateUser = async ({ id, updateUserData }) => {
  const user = await User.findByPk(id);
  console.log("Updated user:", user);
  Object.assign(user, updateUserData);
  await user.save();
  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);

  await user.destroy();
  return true;
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
