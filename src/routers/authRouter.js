const express = require("express");
const router = express.Router();
const { authController } = require("../controllers/index.js");
const { tokenExtractor } = require("../middlewares/tokenExtractor");
const {
  authenticationMiddleware,
} = require("../middlewares/authenticationMiddleware");
const { RequestErrorBuilder } = require("../common/RequestError.js");

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const result = await authController.login({ username, password });
    res.json({
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/logout", tokenExtractor, async (req, res, next) => {
  try {
    console.log("Router: req.token", req.token);
    const result = await authController.logout({ token: req.token });
    res.json({ message: "Logged out successfully" });
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

router.post(
  "/enable-user",
  tokenExtractor,
  authenticationMiddleware,
  async (req, res, next) => {
    if (req.user.name !== "Admin") {
      throw new RequestErrorBuilder()
        .addMessage("Forbidden")
        .setCode(403)
        .build();
    }
    const { userId } = req.body;
    const result = await authController.enableUser(userId);
    res.json(result);
  }
);

router.post(
  "/disable-user",
  tokenExtractor,
  authenticationMiddleware,
  async (req, res, next) => {
    console.log("Router: req.user", req.user);
    if (req.user.name !== "Admin") {
      throw new RequestErrorBuilder()
        .addMessage("Forbidden")
        .setCode(403)
        .build();
    }
    try {
      const { userId } = req.body;
      const result = await authController.disableUser(userId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
