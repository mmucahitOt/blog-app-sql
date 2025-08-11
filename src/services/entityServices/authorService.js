const { Blog } = require("../../models/index.js");
const { sequelize } = require("../../utils/db");
const { Op } = require("sequelize");

const getAllAuthors = async ({ search }) => {
  const whereClause = {};

  if (search) {
    whereClause.author = {
      [Op.substring]: search,
    };
  }

  const authors = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("id")), "articles"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    group: ["author"],
    where: whereClause,
    order: [["likes", "DESC"]],
    raw: true,
  });

  return authors;
};

module.exports = { getAllAuthors };
