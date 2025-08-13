const { RequestErrorBuilder } = require("../common/RequestError");
const { userRepository } = require("../repositories");
const { jwtService } = require("../services/jwtService");
const { sessionService } = require("../services/sessionService");
const { sequelize } = require("../utils/db");

const login = async ({ username, password }) => {
  const transaction = await sequelize.transaction({
    logging: console.log,
  });

  try {
    const user = await userRepository.getUserByUsername(username);
    if (!user) {
      throw new RequestErrorBuilder()
        .addMessage("User not found")
        .setCode(404)
        .build();
    }
    if (user.disabled) {
      throw new RequestErrorBuilder()
        .addMessage("User is disabled")
        .setCode(403)
        .build();
    }

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

    const session = await sessionService.createSession({
      userId: user.id,
      token,
    });

    if (!session) {
      throw new RequestErrorBuilder()
        .addMessage("Failed to create session")
        .setCode(500)
        .build();
    }

    return { token, user };
  } catch (error) {
    throw error;
  }
};

const logout = async ({ token }) => {
  try {
    const result = await sessionService.revokeSession({ token });
    return result;
  } catch (error) {
    throw error;
  }
};

const register = async (username, name) => {
  try {
    const user = await userRepository.createUser({ username, name });
    return user;
  } catch (error) {
    throw error;
  }
};

const enableUser = async (userId) => {
  try {
    const user = await userRepository.enableUserById(userId);
    return user;
  } catch (error) {
    throw error;
  }
};

const disableUser = async (userId) => {
  try {
    const transaction = await sequelize.transaction({
      logging: console.log,
    });
    await sessionService.revokeAllSessionsByUserId({ userId, transaction });
    const user = await userRepository.disableUserById({ userId, transaction });
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = { login, register, logout, enableUser, disableUser };
