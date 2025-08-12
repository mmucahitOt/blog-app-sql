const { User, Blog } = require("../models");

const getUserById = async (id) => {
  const user = await User.findByPk(id);
  return user ? user.toJSON() : null;
};

const getUserByUsername = async (username) => {
  const user = await User.findOne({ where: { username } });
  return user ? user.toJSON() : null;
};

const getAllUsers = async () => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: ["id", "title", "url", "likes"],
    },
  });
  return users ? users.map((user) => user.toJSON()) : [];
};

const createUser = async ({ username, name }) => {
  const user = await User.create({
    username,
    name,
  });
  console.log("Created user:", user.toJSON());
  return user ? user.toJSON() : null;
};

const updateUserByUsername = async ({ username, updateUserData }) => {
  const user = await User.findOne({ where: { username } });
  Object.assign(user, updateUserData);
  await user.save();
  return user ? user.toJSON() : null;
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);

  await user.destroy();
  return true;
};

const deleteAllUsers = async () => {
  await User.destroy({ where: {}, force: true });
  return true;
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  getUserByUsername,
  updateUser: updateUserByUsername,
  deleteUser,
  deleteAllUsers,
};
