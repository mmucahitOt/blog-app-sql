const { ValidationError, UniqueConstraintError } = require("sequelize");
const { RequestErrorBuilder, RequestError } = require("../common/RequestError");

const errorHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    const requestError = new RequestErrorBuilder()
      .fromSequelizeError(error)
      .build();
    return res.status(requestError.code).json({ error: requestError.messages });
  }
  if (error instanceof RequestError) {
    return res.status(error.code).json({ error: error.messages });
  }
  console.log(JSON.stringify(error, null, 2));
  res.status(500).json({ error: "Internal server error" });
};

module.exports = errorHandler;
