const { RequestErrorBuilder } = require("../../common/RequestError");
const { sessionRepository } = require("../../repositories");

const createSession = async ({ userId, token }) => {
  try {
    const session = await sessionRepository.createSession({
      userId,
      token,
    });
    return session;
  } catch (error) {
    throw new RequestErrorBuilder()
      .addMessage("Failed to create session")
      .setCode(500)
      .build();
  }
};

const revokeSession = async ({ token }) => {
  try {
    console.log("Service: token", token);
    const session = await sessionRepository.revokeSessionByToken({ token });
    if (!session) {
      throw new RequestErrorBuilder()
        .addMessage("Session not found")
        .setCode(500)
        .build();
    }
    return session;
  } catch (error) {
    throw error;
  }
};

const getSession = async ({ token }) => {
  try {
    const session = await sessionRepository.getSessionByToken({ token });
    return session;
  } catch (error) {
    throw new RequestErrorBuilder()
      .addMessage("Failed to get session by token")
      .setCode(500)
      .build();
  }
};

const revokeAllSessionsByUserId = async ({ userId, transaction }) => {
  try {
    const result = await sessionRepository.revokeAllSessionsByUserId({
      userId,
      transaction,
    });
    return true;
  } catch (error) {
    throw new RequestErrorBuilder()
      .addMessage("Failed to revoke all sessions by user id")
      .setCode(500)
      .build();
  }
};

module.exports = {
  createSession,
  revokeSession,
  getSession,
  revokeAllSessionsByUserId,
};
