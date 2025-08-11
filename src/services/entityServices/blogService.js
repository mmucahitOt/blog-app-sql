const { Blog, User } = require("../../models");

const getBlogById = async (id) => {
  const blog = await Blog.findByPk(id, {
    include: {
      model: User,
      attributes: ["username", "name"],
    },
  });
  return blog.toJSON();
};

const getAllBlogs = async () => {
  const blogs = await Blog.findAll({
    include: {
      model: User,
      attributes: ["username", "name"],
    },
  });
  return blogs.map((blog) => blog.toJSON());
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
  return blog.toJSON();
};

const updateBlog = async (id, updateBlogData) => {
  const blog = await Blog.findByPk(id);

  Object.assign(blog, updateBlogData);
  await blog.save();
  return blog.toJSON();
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
