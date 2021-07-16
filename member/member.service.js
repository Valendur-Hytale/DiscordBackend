const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const Member = db.Member;

module.exports = {
  authenticate,
  addExp,
  setBirthday,
  getAll,
  getAllPublic,
  getById,
  create,
  update,
  delete: _delete,
};

async function authenticate({ membername, password }) {}

async function getAll() {
  return await Member.find()
    .sort({ currentExp: -1 })
    .select(
      "-_id -rank -messages -id -expForCurrentLevel -expForNextLevel -levelUp"
    ); //.select('-hash');
}

async function getAllPublic() {
  return await Member.find()
    .sort({ currentExp: -1 })
    .select(
      "-_id -rank -messages -id -expForCurrentLevel -expForNextLevel -levelUp -__v -firstLogin -userID -birthday"
    ); //.select('-hash');
}

async function getById(id) {
  //var member;
  var i = 1;
  var members = await Member.find().sort({ currentExp: -1 });
  for (let member of members) {
    //console.log("member: " + JSON.stringify(member));
    if (member.userID === id) {
      member.expForCurrentLevel = getLevelXPNeeded(member.currentLevel);
      member.expForNextLevel = getLevelXPNeeded(member.currentLevel + 1);
      member.rank = i;
      return member;
    }
    i += 1;
  }
  /*var member = await Member.findOne({userID : id});*/

  return null;
}

async function addExp(params) {
  let member = await Member.findOne({ userID: params.userID });
  if (!member) {
    member = new Member({ userID: params.userID });
  } else {
    Object.assign(member, params);
  }

  if (params.message == true) {
    member.messages += 1;
  }

  const currentLvl = member.currentLevel;
  //console.log("current level: " + currentLvl);
  member.currentExp += params.exp;
  member.dailyExp += params.exp;
  member.weeklyExp += params.exp;
  member.monthlyExp += params.exp;
  //member.addExp(params.exp);

  member = levelUp(member);
  /*console.log(
    "current level after lvl up: " +
      currentLvl +
      "new level: " +
      member.currentLevel
  );*/
  member.save();

  if (member.currentLevel > currentLvl) {
    //console.log("level up true");
    member["levelUp"] = true;
  }

  //console.log("Returning: " + JSON.stringify(member));
  return member;
}

async function setBirthday(params) {
  console.log("Birthday");
  let member = await Member.findOne({ userID: params.userID });
  if (!member) {
    member = new Member({ userID: params.userID });
  } 
  member.birthday = new Date(2021, params.month, params.day, 4);
  member.save();
}

function getLevelXPNeeded(desired_level) {
  return (
    (5 / 6) *
    desired_level *
    (2 * desired_level * desired_level + 27 * desired_level + 91)
  );
}

function levelUp(member) {
  var expForDesiredLvl = getLevelXPNeeded(member.currentLevel + 1);
  if (member.currentExp >= expForDesiredLvl) {
    member.currentLevel += 1;
  }
  return member;
}

async function create(memberParam) {
  //console.log("should create a member now");
  // validate
  if (await Member.findOne({ membername: memberParam.membername })) {
    throw 'Membername "' + memberParam.membername + '" is already taken';
  }

  const member = new Member(memberParam);

  // hash password
  if (memberParam.password) {
    member.hash = bcrypt.hashSync(memberParam.password, 10);
  }

  // save member
  await member.save();
}

async function update(id, memberParam) {
  const member = await Member.findById(id);

  // validate
  if (!member) throw "Member not found";
  if (
    member.membername !== memberParam.membername &&
    (await Member.findOne({ membername: memberParam.membername }))
  ) {
    throw 'Membername "' + memberParam.membername + '" is already taken';
  }

  // hash password if it was entered
  if (memberParam.password) {
    memberParam.hash = bcrypt.hashSync(memberParam.password, 10);
  }

  // copy memberParam properties to member
  Object.assign(member, memberParam);

  await member.save();
}

async function _delete(id) {
  await Member.findByIdAndRemove(id);
}
