const { RequestErrorBuilder } = require("../common/RequestError.js");
const { authorRepository } = require("../repositories/index.js");

const getAuthors = async ({ search }) => {
  const authors = await authorRepository.getAllAuthors({ search });
  if (!authors) {
    throw new RequestErrorBuilder()
      .addMessage("No authors found")
      .setCode(404)
      .build();
  }
  return authors;
};

module.exports = { getAuthors };
