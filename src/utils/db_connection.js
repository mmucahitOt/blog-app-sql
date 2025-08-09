const { Sequelize } = require("sequelize");
const config = require("./config.js");

// Explicitly set dialect and enable SSL options via DATABASE_URL if provided
const sequelize = new Sequelize(config.databaseUrl);

module.exports = { sequelize };
