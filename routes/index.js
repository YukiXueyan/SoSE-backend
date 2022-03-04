const post = require("./post");
const getQuestion = require("./getQuestion");
const user = require("./user");

module.exports = (app) => {
  app.use("/post", post);
  app.use("/getQuestion", getQuestion);
  app.use("/user", user);

};