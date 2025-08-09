const app = require("./src/app.js");
const config = require("./src/utils/config.js");

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
