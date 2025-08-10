const initApp = require("./src/app.js");
const config = require("./src/utils/config.js");
const { connectToDatabase } = require("./src/utils/db.js");

const startServer = async () => {
  await connectToDatabase();
  const app = await initApp();
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
};

startServer();
