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

const updateReadBlog = async ({ userId, blogId, read }) => {
  const readBlog = await ReadBlog.findOne({
    where: { user_id: userId, blog_id: blogId },
  });
  if (!readBlog) {
    return null;
  }
  readBlog.read = read;
  await readBlog.save();
  return readBlog ? readBlog.toJSON() : null;
};

module.exports = { addBlogToReadingList, updateReadBlog };
