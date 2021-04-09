const config = require("config.json");
const mongoose = require("mongoose");
var connectWithRetry = function () {
  return mongoose.connect(
    process.env.MONGODB_URI || config.connectionString,
    { useCreateIndex: true, useNewUrlParser: true },
    function (err) {
      if (err) {
        console.error(
          "Failed to connect to mongo on startup - retrying in 5 sec",
          err
        );
        setTimeout(connectWithRetry, 5000);
      } else {
        mongoose.Promise = global.Promise;
      }
    }
  );
};

connectWithRetry();

//mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
//mongoose.Promise = global.Promise;

module.exports = {
  Member: require("../member/member.model"),
  Data: require("../data/data.model"),
};
