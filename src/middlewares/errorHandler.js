const { ValidationError } = require("sequelize");
const { RequestErrorBuilder, RequestError } = require("../common/RequestError");

const errorHandler = (error, req, res, next) => {
  console.log("=== ERROR DETAILS ===");
  console.log("Error name:", error.name);
  console.log("Error message:", error.message);
  console.log("Error stack:", error.stack);
  console.log("Full error object:", JSON.stringify(error, null, 2));
  console.log("=====================");

  if (error instanceof ValidationError) {
    const requestError = new RequestErrorBuilder()
      .fromSequelizeError(error)
      .build();
    return res.status(requestError.code).json({ error: requestError.messages });
  }
  if (error instanceof RequestError) {
    return res.status(error.code).json({ error: error.messages });
  }
  res.status(500).json({ error: "Internal server error:" });
};

module.exports = errorHandler;
