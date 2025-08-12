const express = require("express");
const { getAllAuthors } = require("../repositories/authorRepository");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { search } = req.query;
    const authors = await getAllAuthors({ search });
    res.json(authors);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
