const { RequestErrorBuilder } = require("../common/RequestError.js");
const { readBlogRepository } = require("../repositories/index.js");

const addBlogToReadingList = async ({ userId, blogId }) => {
  try {
    const readBlog = await readBlogRepository.addBlogToReadingList({
      userId,
      blogId,
    });
    if (!readBlog) {
      throw new RequestErrorBuilder()
        .addMessage("Failed to add blog to reading list")
        .setCode(400)
        .build();
    }
    return readBlog;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addBlogToReadingList,
};
