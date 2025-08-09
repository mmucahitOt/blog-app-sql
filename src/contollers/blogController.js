const express = require("express");
const { blogService } = require("../services/index.js");
const { findBlogByIdMiddleware } = require("./common.js");
const blogRouter = express.Router();

blogRouter.get("/:id", findBlogByIdMiddleware, async (req, res) => {
  res.json(req.blog.toJSON());
});

blogRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await blogService.getAllBlogs();
    if (!blogs) {
      return next(new Error("No blogs found"));
    }
    res.json(blogs);
  } catch (error) {
    next(new Error("Failed to fetch blogs"));
  }
});

blogRouter.post("/", async (req, res, next) => {
  const { author, title, url, likes } = req.body;
  try {
    const blog = await blogService.createBlog({ author, title, url, likes });
    if (!blog) {
      return next(new Error("Failed to create blog"));
    }
    res.json(blog.toJSON());
  } catch (error) {
    next(new Error("Failed to fetch blogs"));
  }
});

blogRouter.put("/:id", findBlogByIdMiddleware, async (req, res, next) => {
  const { id, author, title, url, likes } = req.body;
  try {
    const blog = await blogService.updateBlog({
      id,
      author,
      title,
      url,
      likes,
    });
    res.json(blog.toJSON());
  } catch (error) {
    next(new Error("Failed to update blog"));
  }
});

blogRouter.delete("/:id", findBlogByIdMiddleware, async (req, res, next) => {
  try {
    await blogService.deleteBlog(req.blog.id);
    res.json("Blog deleted successfully");
  } catch (error) {
    next(new Error("Failed to delete blog"));
  }
});

module.exports = blogRouter;
