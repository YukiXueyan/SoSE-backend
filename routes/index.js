const post = require("./post");
const getQuestion = require("./getQuestion");
const user = require("./user");
const question = require("./question");
const record = require("./record");
const achieve = require("./achieve");
const note = require("./note");

module.exports = (app) => {
  app.use("/post", post);
  app.use("/getQuestion", getQuestion);
  app.use("/user", user);
  app.use("/question", question);
  app.use("/record", record);
  app.use("/achieve", achieve);
  app.use("/note", note);

};