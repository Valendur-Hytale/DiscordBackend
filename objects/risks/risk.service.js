const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Risk = db.Risk;

module.exports = {
    getAllByUser,
    create,
    delete: _delete
};


async function getAllByUser(userID) {
    return await Risk.find({user: userID}).select('-user');
}

async function create(riskParam, userID) {
    // validate
    if (await Risk.findOne({ name: riskParam.name, user: userID })) {
        throw 'The name "' + riskParam.name + '" is already taken';
    }

    const risk = new Risk(riskParam);
	
	risk.user = userID;
    await risk.save();
}

async function update(id, userParam) {
    const user = await Risk.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id, userID) {
    await Risk.deleteOne({id: id, userID: userID});
}