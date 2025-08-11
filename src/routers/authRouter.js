const express = require("express");
const router = express.Router();
const { authController } = require("../controllers/index.js");

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await authController.login(username, password);
    res.json({
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, name, _ } = req.body;
    const result = await authController.register(username, name);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
