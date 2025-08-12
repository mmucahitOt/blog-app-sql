const { emptyDb } = require("./utils/index.js");
const { sequelize } = require("../src/utils/db.js");

async function main() {
  try {
    await sequelize.authenticate();
    console.log("Emptying database");
    await emptyDb();
    console.log("Database empty complete");
  } catch (error) {
    console.error(error);
    console.log("Database empty failed");
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

main();
