const { RequestErrorBuilder } = require("../common/RequestError.js");
const { authorService } = require("../services/entityServices/index.js");

const getAuthors = async ({ search }) => {
  const authors = await authorService.getAllAuthors({ search });
  if (!authors) {
    throw new RequestErrorBuilder()
      .addMessage("No authors found")
      .setCode(404)
      .build();
  }
  return authors;
};

module.exports = { getAuthors };
