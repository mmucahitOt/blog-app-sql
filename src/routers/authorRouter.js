const express = require("express");
const { getAllAuthors } = require("../services/entityServices/authorService");

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
