const { sequelize } = require("../../src/utils/db");

const resetDb = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.query("DROP TABLE IF EXISTS migrations");
    await sequelize.query("DROP TABLE IF EXISTS blogs");
    await sequelize.query("DROP TABLE IF EXISTS users");
    console.log("Database reset complete");
  } catch (error) {
    console.error("Database reset error:", error);
    throw error;
  }
};

module.exports = { resetDb };