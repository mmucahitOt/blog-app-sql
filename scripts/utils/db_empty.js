require("../../src/utils/db");
const { blogRepository, userRepository } = require("../../src/repositories");

const emptyDb = async () => {
  try {
    await blogRepository.deleteAllBlogs();
    await userRepository.deleteAllUsers();
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};

module.exports = { emptyDb };
