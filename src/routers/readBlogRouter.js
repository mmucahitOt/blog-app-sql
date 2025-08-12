const express = require("express");
const { readBlogController } = require("../controllers/index.js");
const { RequestErrorBuilder } = require("../common/RequestError.js");

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

router.put("/:id", async (req, res, next) => {
  try {
    const { read } = req.body;
    if (!read) {
      next(
        new RequestErrorBuilder()
          .setCode(400)
          .setMessage("Read is required")
          .build()
      );
    }
    const userId = req.user.id;
    const blogId = req.params.id;
    const readBlog = await readBlogController.updateReadBlog({
      userId,
      blogId,
      read,
    });
    res.json(readBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
