const { RequestErrorBuilder } = require("../common/RequestError.js");
const { blogRepository } = require("../repositories");

const getBlogs = async ({ search }) => {
  const blogs = await blogRepository.getAllBlogs({ search });
  if (!blogs) {
    throw new RequestErrorBuilder()
      .addMessage("No blogs found")
      .setCode(404)
      .build();
  }
  return blogs;
};

const createBlog = async ({
  userId,
  updateInput: { author, title, url, likes },
}) => {
  console.log("userId", userId);
  const newBlog = await blogRepository.createBlog({
    userId,
    updateInput: { author, title, url, likes },
  });
  if (!newBlog) {
    throw new RequestErrorBuilder()
      .addMessage("Failed to create blog")
      .setCode(400)
      .build();
  }
  return newBlog;
};

const updateBlog = async ({ id, author, title, url, likes }) => {
  const updateBlogData = {};
  if (author) updateBlogData.author = author;
  if (title) updateBlogData.title = title;
  if (url) updateBlogData.url = url;
  if (likes) updateBlogData.likes = likes;

  const updatedBlog = await blogRepository.updateBlog(id, updateBlogData);
  if (!updatedBlog) {
    throw new RequestErrorBuilder()
      .addMessage("Failed to update blog")
      .setCode(400)
      .build();
  }
  return updatedBlog;
};

const deleteBlog = async (id) => {
  const deletedBlog = await blogRepository.deleteBlog(id);
  if (!deletedBlog) {
    throw new RequestErrorBuilder()
      .addMessage("Failed to delete blog")
      .setCode(400)
      .build();
  }
  return deletedBlog;
};

module.exports = { getBlogs, createBlog, updateBlog, deleteBlog };
