const { Blog, User } = require("../models");
const { Op } = require("sequelize");

const getBlogById = async (id) => {
  const blog = await Blog.findByPk(id, {
    include: {
      model: User,
      attributes: ["username", "name"],
    },
  });
  return blog ? blog.toJSON() : null;
};

const getAllBlogs = async ({ search }) => {
  const whereClause = {
    [Op.or]: [
      { title: { [Op.substring]: search } },
      { author: { [Op.substring]: search } },
      { url: { [Op.substring]: search } },
    ],
  };

  const orderClause = [["likes", "DESC"]];

  const blogs = await Blog.findAll({
    include: {
      model: User,
      attributes: ["username", "name"],
    },
    where: search ? whereClause : {},
    order: orderClause,
  });
  return blogs ? blogs.map((blog) => blog.toJSON()) : [];
};

const createBlog = async ({
  userId,
  updateInput: { author, title, url, likes = 0, year },
}) => {
  const blog = await Blog.create({
    userId,
    author,
    title,
    url,
    likes: likes || 0,
    year: year || new Date().getFullYear(),
  });
  return blog ? blog.toJSON() : null;
};

const updateBlog = async (id, updateBlogData) => {
  const blog = await Blog.findByPk(id);

  Object.assign(blog, updateBlogData);
  await blog.save();
  return blog ? blog.toJSON() : null;
};

const deleteBlog = async (id) => {
  const blog = await Blog.findByPk(id);

  await blog.destroy();
  return true;
};

const deleteAllBlogs = async () => {
  await Blog.destroy({ where: {}, force: true });
  return true;
};

module.exports = {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
  deleteAllBlogs,
};
