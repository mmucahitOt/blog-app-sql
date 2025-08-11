const express = require("express");
const { requestLogger } = require("./middlewares/logger.js");
const errorHandler = require("./middlewares/errorHandler.js");
const apiRouter = require("./routers/index.js");

const initApp = async () => {
  const app = express();

  app.use(express.json());

  app.use(requestLogger);

  app.use("/api", apiRouter);

  app.use(errorHandler);

  return app;
};

module.exports = initApp;
