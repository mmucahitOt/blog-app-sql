require("../../src/utils/db");
const { Blog, User } = require("../../src/models");

const resetDb = async () => {
  try {
    await Blog.drop({
      cascade: true,
      force: true,
    });
    await User.drop({
      cascade: true,
      force: true,
    });
  } catch (error) {
    console.error("Database reset error:", error);
    throw error;
  }
};

module.exports = { resetDb };
