const { userRepository } = require("../../src/repositories/index.js");
const { blogRepository } = require("../../src/repositories/index.js");
require("../../src/utils/db");
const { resetDb } = require("./db_empty.js");

const users = [
  { username: "admin@example.com", name: "Admin" },
  { username: "user@example.com", name: "User" },
];

const blogs = [
  {
    title: "Test Blog",
    author: "Test Author",
    url: "https://test.com",
    likes: 0,
  },
  {
    title: "Test Blog 2",
    author: "Test Author 2",
    url: "https://test.com/2",
    likes: 0,
  },
  {
    title: "Test Blog 3",
    author: "Test Author 3",
    url: "https://test.com/3",
    likes: 0,
  },
  {
    title: "Test Blog 4",
    author: "Test Author 4",
    url: "https://test.com/4",
    likes: 0,
  },
];

const feedData = async () => {
  const admin = await userRepository.createUser(users[0]);
  await userRepository.createUser(users[1]);
  await blogRepository.createBlog({
    userId: admin.id,
    updateInput: {
      ...blogs[0],
    },
  });
  await blogRepository.createBlog({
    userId: admin.id,
    updateInput: {
      ...blogs[1],
    },
  });
  await blogRepository.createBlog({
    userId: admin.id,
    updateInput: {
      ...blogs[2],
    },
  });
  await blogRepository.createBlog({
    userId: admin.id,
    updateInput: {
      ...blogs[3],
    },
  });
};

module.exports = { feedData };
