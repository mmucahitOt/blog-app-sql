const { jwtService } = require("../services/jwtService");
const { userRepository } = require("../repositories");
const { RequestErrorBuilder } = require("../common/RequestError");
const { sessionService } = require("../services/sessionService");

const authenticationMiddleware = async (req, res, next) => {
  try {
    const token = req.token;
    const session = await sessionService.getSession({ token });
    if (!session) {
      throw new RequestErrorBuilder()
        .addMessage("Session not found")
        .setCode(401)
        .build();
    }

    if (session.isRevoked) {
      throw new RequestErrorBuilder()
        .addMessage("Session is revoked")
        .setCode(401)
        .build();
    }

    const { username } = jwtService.verifyToken(token);
    const user = await userRepository.getUserByUsername(username);
    if (!user) {
      throw new RequestErrorBuilder()
        .addMessage("User not found")
        .setCode(401)
        .build();
    }
    if (user.disabled) {
      throw new RequestErrorBuilder()
        .addMessage("User is disabled")
        .setCode(401)
        .build();
    }

    req.user = user;
    
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticationMiddleware };
