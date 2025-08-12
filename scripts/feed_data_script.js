const { feedData } = require("./utils");
const { sequelize } = require("../src/utils/db.js");

async function main() {
  try {
    await sequelize.authenticate();
    console.log("Feeding data start");
    await feedData();
    console.log("Feeding data complete");
    process.exit(0);
  } catch (error) {
    console.log("Feeding data failed");
    console.error(error);
    process.exit(1);
  }
}

main();
