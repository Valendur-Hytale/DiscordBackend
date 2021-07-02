require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("_helpers/jwt");
const errorHandler = require("_helpers/error-handler");
const schedule = require("node-schedule");
const db = require("_helpers/db");
const Member = db.Member;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
//app.use(jwt());

// api routes
app.use("/members", require("./member/member.controller"));
app.use("/data", require("./data/data.controller"));

// global error handler
app.use(errorHandler);

// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
const server = app.listen(port, function () {
  console.log("Server listening on port " + port);
});

const dailyExpReset = schedule.scheduleJob("0 0 * * *", function () {
  Member.updateMany({}, { $set: { dailyExp: 0 } });
});

const weeklyExpReset = schedule.scheduleJob("0 0 * * 0", function () {
  Member.updateMany({}, { $set: { weeklyExp: 0 } });
});

const mothlyExpReset = schedule.scheduleJob("0 0 1 * *", function () {
  Member.updateMany({}, { $set: { monthlyExp: 0 } });
});
