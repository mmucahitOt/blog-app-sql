const { resetDb } = require("./utils/index.js");
const { sequelize } = require("../src/utils/db.js");

async function main() {
  try {
    await sequelize.authenticate();
    console.log("Resetting database");
    await resetDb();
    console.log("Database reset complete");
  } catch (error) {
    console.error(error);
    console.log("Database reset failed");
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

main();
