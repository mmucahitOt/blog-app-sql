const { jwtService } = require("../services/jwtService");
const { userService } = require("../services/entityServices");

const userExtractor = async (req, res, next) => {
  try {
    const token = req.token;
    const { username } = jwtService.verifyToken(token);
    const user = await userService.getUserByUsername(username);
    if (!user) {
      throw new RequestErrorBuilder()
        .addMessage("Unauthorized")
        .setCode(401)
        .build();
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { userExtractor };
