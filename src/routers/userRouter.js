const express = require("express");
const { userController } = require("../controllers/index.js");
const { findUserByIdMiddleware } = require("./common.js");
const userRouter = express.Router();

userRouter.get("/:id", findUserByIdMiddleware, async (req, res) => {
  res.json(req.user.toJSON());
});

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await userController.getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/", async (req, res, next) => {
  const { username, name } = req.body;
  try {
    const user = await userController.createUser({ username, name });
    res.json(user.toJSON());
  } catch (error) {
    next(error);
  }
});

userRouter.put("/:id", findUserByIdMiddleware, async (req, res, next) => {
  const { id } = req.params;
  const { username, name } = req.body;
  try {
    const user = await userController.updateUser({ id, username, name });
    res.json(user.toJSON());
  } catch (error) {
    next(error);
  }
});

userRouter.delete("/:id", findUserByIdMiddleware, async (req, res, next) => {
  try {
    await userController.deleteUser(req.user.id);
    res.json("User deleted successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
