const { Blog } = require("../../models");

const getBlogById = async (id) => {
  const blog = await Blog.findByPk(id);
  return blog;
};

const getAllBlogs = async () => {
  const blogs = Blog.findAll();
  return blogs;
};

const createBlog = async ({
  userId,
  updateInput: { author, title, url, likes = 0 },
}) => {
  const blog = await Blog.create({
    userId,
    author,
    title,
    url,
    likes: likes || 0, // Ensure likes is always a number, default to 0 if undefined/null
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
