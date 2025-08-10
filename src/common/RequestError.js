class RequestError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

class RequestErrorBuilder {
  constructor() {
    this.error = new RequestError();
  }

  withMessage(message) {
    this.error.message = message;
    return this;
  }

  withCode(code) {
    this.error.code = code;
    return this;
  }

  build() {
    return this.error;
  }
}

module.exports = { RequestError, RequestErrorBuilder };
