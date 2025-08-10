const Blog = require("../models/Blog.js");

const getBlogById = async (id) => {
  const blog = await Blog.findByPk(id);
  return blog;
};

const getAllBlogs = async () => {
  const blogs = await Blog.findAll();
  return blogs;
};

const createBlog = async ({ author, title, url, likes }) => {
  const blog = await Blog.create({
    author,
    title,
    url,
    likes,
  });
  console.log("Created blog:", blog.toJSON());
  return blog;
};

const updateBlog = async (id, updateBlogData) => {
  const blog = await Blog.findByPk(id);

  Object.assign(blog, updateBlogData);
  await blog.save();
  return blog;
};

const deleteBlog = async (id) => {
  const blog = await Blog.findByPk(id);

  await blog.destroy();
  return true;
};

module.exports = {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
};
