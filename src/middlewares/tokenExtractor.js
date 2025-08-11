const { RequestErrorBuilder } = require("../common/RequestError");

const tokenExtractor = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader) {
    console.log("Authorization header is required");
    const error = new RequestErrorBuilder()
      .addMessage("Authorization header is required")
      .setCode(401)
      .build();

    console.log("tokenExtractor", JSON.stringify(error, null, 2));
    return next(error);
  }
  const token = authorizationHeader.replace("Bearer ", "");
  req.token = token;
  next();
};

module.exports = { tokenExtractor };
