const User = require("./User");
const Blog = require("./Blog");

User.hasMany(Blog);
Blog.belongsTo(User);
Blog.sync({ alter: true });
User.sync({ alter: true });

module.exports = { Blog, User };
