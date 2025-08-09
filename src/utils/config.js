const dotenv = require("dotenv");

dotenv.config();

const config = {
  port: process.env.PORT || 3001,
  databaseUrl: process.env.DATABASE_URL,
};

module.exports = config;
