const express = require("express");
const { blogController } = require("../controllers/index.js");
const { findBlogByIdMiddleware } = require("./common.js");
const { RequestErrorBuilder } = require("../common/RequestError.js");
const blogRouter = express.Router();

blogRouter.get("/:id", findBlogByIdMiddleware, async (req, res) => {
  res.json(req.blog);
});

blogRouter.get("/", async (req, res, next) => {
  try {
    const { search } = req.query;
    const blogs = await blogController.getBlogs({ search });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", async (req, res, next) => {
  const { id: userId } = req.user;
  const { author, title, url, likes, year } = req.body;
  try {
    const blog = await blogController.createBlog({
      userId,
      updateInput: { author, title, url, likes, year },
    });
    res.json(blog);
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", findBlogByIdMiddleware, async (req, res, next) => {
  const { id } = req.params;
  const { author, title, url, likes } = req.body;
  try {
    const blog = await blogController.updateBlog({
      id,
      author,
      title,
      url,
      likes,
    });
    res.json(blog);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", findBlogByIdMiddleware, async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const blog = req.blog;
    console.log("blog", blog);
    console.log("userId", userId);
    if (blog.userId !== userId) {
      throw new RequestErrorBuilder()
        .addMessage("Unauthorized")
        .setCode(401)
        .build();
    }
    await blogController.deleteBlog(blog.id);
    res.json("Blog deleted successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
