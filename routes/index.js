var path = require("path");
var router = require('express').Router();

module.exports = function(app) {
  app.use("/api/user", require("./user.route"));
  app.use("/api/group", require("./group.route"));
  app.use("/api/lecture", require("./subject.route"));
  app.use("/api/activity", require("./activity.route"));
  app.use("/api/speciality", require("./speciality.route"));
};
