class RequestError extends Error {
  constructor(code) {
    super();
    this.messages = [];
    this.code = code;
  }
}

class RequestErrorBuilder {
  constructor() {
    this.error = new RequestError();
  }

  addMessage(message) {
    this.error.messages.push(message);
    return this;
  }

  setCode(code) {
    this.error.code = code;
    return this;
  }

  build() {
    return this.error;
  }

  fromSequelizeError(error) {
    this.error.messages = error.errors.map((error) => error.message);
    this.error.code = 400;
    return this;
  }
}

module.exports = { RequestError, RequestErrorBuilder };
