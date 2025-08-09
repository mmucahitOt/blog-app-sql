const { Sequelize } = require("sequelize");
const config = require("./config.js");

const sequelize = new Sequelize(config.databaseUrl);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectToDatabase };
