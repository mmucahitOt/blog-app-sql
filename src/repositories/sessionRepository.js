const { Session } = require("../models");
const { RequestErrorBuilder } = require("../common/RequestError");

const getSessionByToken = async ({ token }) => {
  const session = await Session.findOne({ where: { token } });
  return session ? session.toJSON() : null;
};

const getAllSessions = async () => {
  const sessions = await Session.findAll({
    where: {
      isRevoked: false,
    },
  });
  return sessions ? sessions.map((session) => session.toJSON()) : [];
};

const createSession = async ({ userId, token, transaction }) => {
  const session = await Session.create({
    userId,
    token,
    transaction: transaction,
  });
  return session ? session.toJSON() : null;
};

const updateSession = async (id, updateSessionData) => {
  const session = await Session.findByPk(id);

  Object.assign(session, updateSessionData);
  await session.save();
  return session ? session.toJSON() : null;
};

const revokeSessionByToken = async ({ token }) => {
  const session = await Session.findOne({ where: { token } });
  console.log("Repository: session", session);
  if (!session) {
    throw new RequestErrorBuilder()
      .addMessage("Session not found")
      .setCode(404)
      .build();
  }
  session.isRevoked = true;
  await session.save();
  return session ? session.toJSON() : null;
};

const revokeAllSessionsByUserId = async ({ userId, transaction }) => {
  await Session.update({ isRevoked: true }, { where: { userId }, transaction });
  return true;
};

const deleteSession = async (id) => {
  const session = await Session.findByPk(id);

  await session.destroy();
  return true;
};

const deleteAllSessions = async () => {
  await Session.destroy({ where: {}, force: true });
  return true;
};

module.exports = {
  getSessionByToken,
  getAllSessions,
  createSession,
  updateSession,
  revokeSessionByToken,
  deleteSession,
  deleteAllSessions,
  revokeAllSessionsByUserId,
};
