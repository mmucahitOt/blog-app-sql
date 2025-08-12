const { RequestErrorBuilder } = require("../common/RequestError.js");
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
  if (readBlog.user_id === userId && readBlog.blog_id === blogId) {
    return new RequestErrorBuilder()
      .setCode(400)
      .setMessage("Cannot update read blog that you do not own")
      .build();
  }
  readBlog.read = read;
  await readBlog.save();
  return readBlog ? readBlog.toJSON() : null;
};

module.exports = { addBlogToReadingList, updateReadBlog };
