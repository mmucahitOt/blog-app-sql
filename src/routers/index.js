const express = require("express");
const apiRouter = express.Router();
const blogRouter = require("./blogRouter");
const userRouter = require("./userRouter");
const authRouter = require("./authRouter");
const authorRouter = require("./authorRouter");
const readBlogRouter = require("./readBlogRouter");
const { tokenExtractor } = require("../middlewares/tokenExtractor");
const { userExtractor } = require("../middlewares/userExtractor");

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", tokenExtractor, userExtractor, userRouter);
apiRouter.use("/blogs", tokenExtractor, userExtractor, blogRouter);
apiRouter.use("/authors", tokenExtractor, userExtractor, authorRouter);
apiRouter.use("/readinglists", tokenExtractor, userExtractor, readBlogRouter);

module.exports = apiRouter;
