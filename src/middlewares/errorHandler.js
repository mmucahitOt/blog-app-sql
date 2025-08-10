const { ValidationError, UniqueConstraintError } = require("sequelize");
const { RequestError, RequestErrorBuilder } = require("../common/RequestError");

const errorHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    const requestError = new RequestErrorBuilder()
      .fromSequelizeError(error)
      .build();
    return res.status(requestError.code).json({ error: requestError.messages });
  }

  res.status(500).json({ error: "Internal server error" });
};

module.exports = errorHandler;
