const { blogService } = require("../services");

const findBlogByIdMiddleware = async (req, res, next) => {
  const blog = await blogService.getBlogById(req.params.id);
  if (!blog) {
    return next(new Error("Blog not found"));
  }
  req.blog = blog;
  next();
};

module.exports = { findBlogByIdMiddleware };
