const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  userID: { type: String, unique: true, required: true },
  dataLog: [
    {
      eventType: { type: String, required: true },
      data: { type: Object, required: true },
      timestamp: { type: Date, defaul: Date.now },
    },
  ],
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Data", schema);
