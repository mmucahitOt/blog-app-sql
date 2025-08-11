const { userService } = require("../services/entityServices");
const { jwtService } = require("../services/jwtService");

const login = async (username, password) => {
  try {
    const user = await userService.getUserByUsername(username);
    if (!user) {
      throw new RequestErrorBuilder()
        .addMessage("User not found")
        .setCode(404)
        .build();
    }

    // TODO: Refactor this to use bcrypt
    if (password !== "secret") {
      throw new RequestErrorBuilder()
        .addMessage("Invalid password")
        .setCode(401)
        .build();
    }
    const token = jwtService.generateToken({
      username: user.username,
      password: "secret",
    });
    return { token, user };
  } catch (error) {
    next(error);
  }
};

const register = async (username, name) => {
  try {
    const user = await userService.createUser({ username, name });
    return user;
  } catch (error) {
    next(error);
  }
};

module.exports = { login, register };
