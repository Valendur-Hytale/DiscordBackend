const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const Prime = db.Prime;

module.exports = {
  addTeam,
  updateTeam,
  getAll,
  delete: _delete,
};

async function getAll() {
  return await Prime.find().select();
}


async function addTeam(params) {
  let prime = new Prime({ teamID: params.teamID, serializedTeam: params.serializedTeam });
  await prime.save();
}

async function updateTeam(params) {
  let prime = await Prime.findOne({ teamID: params.teamID });
  Object.assign(prime, params);
  await prime.save();
}


async function _delete(id) {
  await Prime.findByIdAndRemove(id);
}
