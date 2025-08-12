const express = require("express");
const { readBlogController } = require("../controllers/index.js");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const blogId = req.body.blogId;
    const readBlog = await readBlogController.addBlogToReadingList({
      userId,
      blogId,
    });
    res.json(readBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
