const dotenv = require("dotenv");
const express = require("express");
const {
  getAllBlogs,
  createBlog,
  updateBlog,
  getBlogById,
  deleteBlog,
} = require("./services/blogService.js");
const { requestLogger } = require("./utils/logger.js");
const errorHandler = require("./middlewares/errorHandler.js");

dotenv.config();

const app = express();

app.use(express.json());

app.use(requestLogger);

app.get("/api/blogs/:id", async (req, res) => {
  const blog = await getBlogById(req.params.id);
  res.json(blog.toJSON());
});

app.get("/api/blogs", async (req, res) => {
  const blogs = await getAllBlogs();
  res.json(blogs);
});

app.post("/api/blogs", async (req, res) => {
  const { author, title, url, likes } = req.body;
  const blog = await createBlog({ author, title, url, likes });
  res.json(blog.toJSON());
});

app.put("/api/blogs/:id", async (req, res) => {
  const { id } = req.params;
  const { author, title, url, likes } = req.body;
  const blog = await updateBlog({ id, author, title, url, likes });
  res.json(blog.toJSON());
});

app.delete("/api/blogs/:id", async (req, res) => {
  const { id } = req.params;
  await deleteBlog(id);
  res.json("Blog deleted successfully");
});

app.use(errorHandler);

module.exports = app;
