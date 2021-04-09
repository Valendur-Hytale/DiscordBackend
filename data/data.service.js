const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const Data = db.Data;

module.exports = {
  addData,
  getAll,
  getById,
};

async function getAll() {
  return await Data.find()
    .sort({ currentExp: -1 })
    .select(
      "-_id -rank -messages -id -expForCurrentLevel -expForNextLevel -levelUp"
    ); //.select('-hash');
}

async function getById(id) {
  //var data;
  var i = 1;
  var datas = await Data.find().sort({ currentExp: -1 });
  for (let data of datas) {
    console.log("data: " + JSON.stringify(data));
    if (data.userID === id) {
      data.expForCurrentLevel = getLevelXPNeeded(data.currentLevel);
      data.expForNextLevel = getLevelXPNeeded(data.currentLevel + 1);
      data.rank = i;
      return data;
    }
    i += 1;
  }
  /*var data = await Data.findOne({userID : id});*/

  return null;
}

async function addData(params) {
  console.log("add data" + params.userID);
  //const idHash = bcrypt.hashSync(params.userID, 10);

  let data = await Data.findOne({ userID: params.userID });
  if (!data) {
    data = new Data({ userID: params.userID });
    data.dataLog = [];
  }
  data.dataLog.push(params.dataLog);
  data.save();
  return data;
}

function getLevelXPNeeded(desired_level) {
  return (
    (5 / 6) *
    desired_level *
    (2 * desired_level * desired_level + 27 * desired_level + 91)
  );
}

function levelUp(data) {
  var expForDesiredLvl = getLevelXPNeeded(data.currentLevel + 1);
  if (data.currentExp >= expForDesiredLvl) {
    data.currentLevel += 1;
  }
  return data;
}

async function create(dataParam) {
  console.log("should create a data now");
  // validate
  if (await Data.findOne({ dataname: dataParam.dataname })) {
    throw 'Dataname "' + dataParam.dataname + '" is already taken';
  }

  const data = new Data(dataParam);

  // hash password
  if (dataParam.password) {
    data.hash = bcrypt.hashSync(dataParam.password, 10);
  }

  // save data
  await data.save();
}

async function update(id, dataParam) {
  const data = await Data.findById(id);

  // validate
  if (!data) throw "Data not found";
  if (
    data.dataname !== dataParam.dataname &&
    (await Data.findOne({ dataname: dataParam.dataname }))
  ) {
    throw 'Dataname "' + dataParam.dataname + '" is already taken';
  }

  // hash password if it was entered
  if (dataParam.password) {
    dataParam.hash = bcrypt.hashSync(dataParam.password, 10);
  }

  // copy dataParam properties to data
  Object.assign(data, dataParam);

  await data.save();
}

async function _delete(id) {
  await Data.findByIdAndRemove(id);
}
