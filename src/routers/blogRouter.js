const express = require("express");
const { blogController } = require("../controllers/index.js");
const { findBlogByIdMiddleware } = require("./common.js");
const blogRouter = express.Router();

blogRouter.get("/:id", findBlogByIdMiddleware, async (req, res) => {
  res.json(req.blog.toJSON());
});

blogRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await blogController.getBlogs();
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", async (req, res, next) => {
  const { author, title, url, likes } = req.body;
  try {
    const blog = await blogController.createBlog({ author, title, url, likes });
    res.json(blog.toJSON());
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
    res.json(blog.toJSON());
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", findBlogByIdMiddleware, async (req, res, next) => {
  try {
    await blogController.deleteBlog(req.blog.id);
    res.json("Blog deleted successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
