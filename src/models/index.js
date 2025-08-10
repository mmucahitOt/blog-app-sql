const User = require("./User");
const Blog = require("./Blog");

User.sync({ alter: true });
Blog.sync({ alter: true });

module.exports = { Blog, User };
