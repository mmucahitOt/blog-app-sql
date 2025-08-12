const { jwtService } = require("../services/jwtService");
const { userRepository } = require("../repositories");
const { RequestErrorBuilder } = require("../common/RequestError");

const userExtractor = async (req, res, next) => {
  try {
    const token = req.token;
    console.log("token", token);
    const { username } = jwtService.verifyToken(token);
    const user = await userRepository.getUserByUsername(username);
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
