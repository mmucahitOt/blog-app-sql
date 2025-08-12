const { User, Blog } = require("../models");

/////////////////////
// Queries
/////////////////////

const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    include: [
      {
        model: Blog,
        as: "reading_list",
        through: {
          attributes: ["read"],
        },
      },
    ],
  });

  if (!user) return null;

  const userData = user.toJSON();

  if (userData.reading_list) {
    userData.reading_list = userData.reading_list.map((item) => ({
      read: item.readBlog?.read || false,
      blog: {
        id: item.id,
        author: item.author,
        title: item.title,
        url: item.url,
        likes: item.likes,
        year: item.year,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        userId: item.userId,
      },
    }));
  }

  return userData;
};

const getUserByUsername = async (username) => {
  const user = await User.findOne({ where: { username } });
  return user ? user.toJSON() : null;
};

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: [""] },
    include: [
      {
        model: Blog,
        attribute: {
          exclude: ["user_id"],
        },
      },
      {
        model: Blog,
        through: { attributes: [], as: "reading_list" },
      },
    ],
  });
  return users ? users.map((user) => user.toJSON()) : [];
};

/////////////////////
// Mutations
/////////////////////

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
