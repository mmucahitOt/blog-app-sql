const { RequestErrorBuilder } = require("../common/RequestError");
const { blogService, userService } = require("../services");

const findBlogByIdMiddleware = async (req, res, next) => {
  const blog = await blogService.getBlogById(req.params.id);
  if (!blog) {
    return next(
      new RequestErrorBuilder()
        .withMessage("Blog not found")
        .withCode(404)
        .build()
    );
  }
  req.blog = blog;
  next();
};

const findUserByIdMiddleware = async (req, res, next) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) {
    return next(
      new RequestErrorBuilder()
        .withMessage("User not found")
        .withCode(404)
        .build()
    );
  }
  req.user = user;
  next();
};

module.exports = { findBlogByIdMiddleware, findUserByIdMiddleware };
