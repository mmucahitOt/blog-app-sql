const { ReadBlog } = require("../models/index.js");

const addBlogToReadingList = async ({ userId, blogId }) => {
  console.log("userId", userId);
  const readBlog = await ReadBlog.create({
    user_id: userId,
    blog_id: blogId,
    read: false,
  });
  return readBlog ? readBlog.toJSON() : null;
};

module.exports = { addBlogToReadingList };
