const { RequestErrorBuilder } = require("../common/RequestError");
const { blogRepository, userRepository } = require("../repositories");

const findBlogByIdMiddleware = async (req, res, next) => {
  const blog = await blogRepository.getBlogById(req.params.id);
  if (!blog) {
    return next(
      new RequestErrorBuilder()
        .addMessage("Blog not found")
        .setCode(404)
        .build()
    );
  }
  req.blog = blog;
  next();
};

const findUserByIdMiddleware = async (req, res, next) => {
  const user = await userRepository.getUserById(req.params.id);
  if (!user) {
    return next(
      new RequestErrorBuilder()
        .addMessage("User not found")
        .setCode(404)
        .build()
    );
  }
  req.user = user;
  next();
};

const findUserByUsernameMiddleware = async (req, res, next) => {
  const user = await userRepository.getUserByUsername(req.params.username);
  if (!user) {
    return next(
      new RequestErrorBuilder()
        .addMessage("User not found")
        .setCode(404)
        .build()
    );
  }
  req.user = user;
  next();
};

module.exports = {
  findBlogByIdMiddleware,
  findUserByIdMiddleware,
  findUserByUsernameMiddleware,
};
