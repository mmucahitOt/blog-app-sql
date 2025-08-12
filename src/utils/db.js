const { Sequelize } = require("sequelize");
const config = require("./config.js");
const { Umzug, SequelizeStorage } = require("umzug");

const sequelize = new Sequelize(config.databaseUrl);

const migrationConf = {
  migrations: {
    glob: "migrations/*.js",
  },
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  console.log("Migrations up to date", {
    files: migrations.map((mig) => mig.name),
  });
};

const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();

    // Initialize models after database connection
    require("../models");

    console.log("Connected to the database");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

module.exports = { connectToDatabase, sequelize, rollbackMigration };
