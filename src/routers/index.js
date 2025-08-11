const express = require("express");
const apiRouter = express.Router();
const blogRouter = require("./blogRouter");
const userRouter = require("./userRouter");
const authRouter = require("./authRouter");
const { tokenExtractor } = require("../middlewares/tokenExtractor");
const { userExtractor } = require("../middlewares/userExtractor");

apiRouter.use("/users", tokenExtractor, userExtractor, userRouter);
apiRouter.use("/blogs", tokenExtractor, userExtractor, blogRouter);
apiRouter.use("/auth", authRouter);

module.exports = apiRouter;
