const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  userID: { type: String, unique: true, required: true },
  currentExp: { type: Number, default: 0 },
  currentLevel: { type: Number, default: 0 },
  dailyExp: { type: Number, default: 0 },
  weeklyExp: { type: Number, default: 0 },
  monthlyExp: { type: Number, default: 0 },
  birthday: { type: Date, default: null },
  firstLogin: { type: Date, default: Date.now },
  profileImage: { type: String },
  profileName: { type: String },
  messages: { type: Number, default: 0 },
  levelUp: { type: Boolean, default: false },
  expForCurrentLevel: { type: Number, default: 0 },
  expForNextLevel: { type: Number, default: 0 },
  rank: { type: Number, default: -1 },
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Member", schema);
