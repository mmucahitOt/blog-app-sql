const User = require("./User");
const Blog = require("./Blog");
const ReadBlog = require("./ReadBlog");

console.log("Models loaded:", {
  User: !!User,
  Blog: !!Blog,
  ReadBlog: !!ReadBlog,
  ReadBlogTableName: ReadBlog?.getTableName?.(),
});

User.hasMany(Blog, { foreignKey: "userId" });
Blog.belongsTo(User, { foreignKey: "userId" });

User.belongsToMany(Blog, {
  through: ReadBlog,
  foreignKey: "userId",
  otherKey: "blogId",
  as: "readings",
});

Blog.belongsToMany(User, {
  through: ReadBlog,
  foreignKey: "blogId",
  otherKey: "userId",
  as: "read_by_users",
});

module.exports = { Blog, User, ReadBlog };
