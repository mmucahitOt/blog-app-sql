const { RequestError } = require("../common/RequestError");

const errorHandler = (error, req, res, next) => {
  if (error instanceof RequestError) {
    return res.status(error.code).json({ error: error.message });
  }
  console.log(JSON.stringify(error.message, null, 2));
  res.status(500).json({ error: "Internal server error" });
};

module.exports = errorHandler;
