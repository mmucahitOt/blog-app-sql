const express = require("express");
const apiRouter = express.Router();
const blogRouter = require("./blogController");

apiRouter.use("/blogs", blogRouter);

module.exports = apiRouter;
