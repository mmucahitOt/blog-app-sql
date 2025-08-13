const express = require("express");
const apiRouter = express.Router();
const blogRouter = require("./blogRouter");
const userRouter = require("./userRouter");
const authRouter = require("./authRouter");
const authorRouter = require("./authorRouter");
const readBlogRouter = require("./readBlogRouter");
const { tokenExtractor } = require("../middlewares/tokenExtractor");
const { authenticationMiddleware } = require("../middlewares/authenticationMiddleware");

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", tokenExtractor, authenticationMiddleware, userRouter);
apiRouter.use("/blogs", tokenExtractor, authenticationMiddleware, blogRouter);
apiRouter.use("/authors", tokenExtractor, authenticationMiddleware, authorRouter);
apiRouter.use("/readinglists", tokenExtractor, authenticationMiddleware, readBlogRouter);

module.exports = apiRouter;
