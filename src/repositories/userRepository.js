const { User, Blog } = require("../models");

/////////////////////
// Queries
/////////////////////

const getUserById = async ({ id, read }) => {
  let readQuery = {};
  if (read === "true") {
    readQuery = {
      where: { read: true },
    };
  }
  if (read === "false") {
    readQuery = {
      where: { read: false },
    };
  }
  const user = await User.findByPk(id, {
    include: [
      /*{
        model: Blog,
        attributes: {
          include: ["id", "title", "author"],
        },
      },*/
      {
        model: Blog,
        as: "readings",
        through: {
          attributes: ["read"],
          ...readQuery,
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
    /*include: [
      {
        model: Blog,
        attribute: {
          include: ["id", "title", "author"],
        },
      },
    ],*/
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

const enableUserById = async (id) => {
  const user = await User.findByPk(id);
  user.disabled = false;
  await user.save();
  return user ? user.toJSON() : null;
};

const disableUserById = async ({ id, transaction }) => {
  const user = await User.findByPk(id);
  if (user && user.name === "Admin") {
    throw new RequestErrorBuilder()
      .addMessage("Cannot disable admin user")
      .setCode(403)
      .build();
  }
  user.disabled = true;
  await user.save({ transaction });
  return user ? user.toJSON() : null;
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  getUserByUsername,
  updateUser: updateUserByUsername,
  deleteUser,
  deleteAllUsers,
  enableUserById,
  disableUserById,
};
