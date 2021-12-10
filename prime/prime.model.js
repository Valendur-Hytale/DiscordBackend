const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  teamID: { type: String, unique: true, required: true },
  serializedTeam: { type: String, required: true},
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Prime", schema);
