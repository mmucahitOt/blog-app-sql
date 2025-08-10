const { RequestErrorBuilder } = require("../common/RequestError.js");
const { blogService } = require("../services/index.js");

const getBlogs = async () => {
  const blogs = await blogService.getAllBlogs();
  if (!blogs) {
    throw new RequestErrorBuilder()
      .withMessage("No blogs found")
      .withCode(404)
      .build();
  }
  return blogs;
};

const createBlog = async (blog) => {
  const newBlog = await blogService.createBlog(blog);
  if (!newBlog) {
    throw new RequestErrorBuilder()
      .withMessage("Failed to create blog")
      .withCode(400)
      .build();
  }
  return newBlog;
};

const updateBlog = async ({ id, author, title, url, likes }) => {
  const updateBlogData = {};
  if (author) updateBlogData.author = author;
  if (title) updateBlogData.title = title;
  if (url) updateBlogData.url = url;
  if (likes) updateBlogData.likes = likes;

  const updatedBlog = await blogService.updateBlog(id, updateBlogData);
  if (!updatedBlog) {
    throw new RequestErrorBuilder()
      .withMessage("Failed to update blog")
      .withCode(400)
      .build();
  }
  return updatedBlog;
};

const deleteBlog = async (id) => {
  const deletedBlog = await blogService.deleteBlog(id);
  if (!deletedBlog) {
    throw new RequestErrorBuilder()
      .withMessage("Failed to delete blog")
      .withCode(400)
      .build();
  }
  return deletedBlog;
};

module.exports = { getBlogs, createBlog, updateBlog, deleteBlog };
