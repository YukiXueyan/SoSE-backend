"use strict";

var post = require("./post");

var getQuestion = require("./getQuestion");

var user = require("./user");

var question = require("./question");

var record = require("./record");

var achieve = require("./achieve");

var note = require("./note");

module.exports = function (app) {
  app.use("/post", post);
  app.use("/getQuestion", getQuestion);
  app.use("/user", user);
  app.use("/question", question);
  app.use("/record", record);
  app.use("/achieve", achieve);
  app.use("/note", note);
};