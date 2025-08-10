const express = require("express");
const apiRouter = express.Router();
const blogRouter = require("./blogRouter");
const userRouter = require("./userRouter");

apiRouter.use("/users", userRouter);
apiRouter.use("/blogs", blogRouter);

module.exports = apiRouter;
